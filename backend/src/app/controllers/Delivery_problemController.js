import * as Yup from 'yup';
import Delivery_problem from '../models/Delivery_problem';
import Package from '../models/Package';
import Recipient from '../models/Recipient';
import Deliveryman from '../models/Deliveryman';
import Mail from '../../lib/Mail';

class Delivery_problemController {
    async store(req, res) {
        const schema = Yup.object().shape({
            description: Yup.string().required()
        });
        const { id } = req.params;
        const { description } = req.body;

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Validation fails' });
        }

        const order = await Package.findByPk(id);

        if (!order) {
            return res.status(400).json({ error: 'Order not found' });
        }

        if (order.start_date === null) {
            return res.status(400).json({
                error: 'The package has not yet been picked up for delivery'
            });
        }

        const deliveryProblem = await Delivery_problem.create({
            delivery_id: id,
            description
        });

        return res.json(deliveryProblem);
    }

    async index(req, res) {
        const { id: delivery_id } = req.params;
        const deliveryProblems = await Delivery_problem.findAll({
            where: { delivery_id },
            include: [
                {
                    model: Package,
                    as: 'encomenda',
                    attributes: [
                        'id',
                        'recipient_id',
                        'product',
                        'start_date',
                        'end_date',
                        'signature_id',
                        'canceled_at'
                    ]
                }
            ],
            attributes: ['id', 'description', 'delivery_id']
        });

        if (!deliveryProblems) {
            return res
                .status(400)
                .json({ error: 'There is no problem with this delivery' });
        }

        return res.json(deliveryProblems);
    }

    async delete(req, res) {
        const { id } = req.params;

        const deliveryProblem = await Delivery_problem.findByPk(id);

        if (!deliveryProblem) {
            return res.status(400).json({ error: 'Problem does not found' });
        }

        const order = await Package.findByPk(deliveryProblem.delivery_id, {
            attributes: [
                'id',
                'product',
                'recipient_id',
                'deliveryman_id',
                'start_date',
                'end_date',
                'canceled_at'
            ],
            include: [
                {
                    model: Deliveryman,
                    as: 'entregador',
                    attributes: ['id', 'name', 'email']
                },
                {
                    model: Recipient,
                    as: 'destinatario',
                    attributes: [
                        'id',
                        'name',
                        'address_street',
                        'address_number',
                        'address_complement',
                        'uf',
                        'address_zipcode'
                    ]
                }
            ]
        });

        if (order.canceled_at !== null) {
            return res
                .status(400)
                .json({ error: 'The order has already been canceled' });
        }

        order.canceled_at = new Date();

        await order.save();

        await Mail.sendMail({
            to: `${order.entregador.name} <${order.entregador.email}>`,
            subject: 'Cancelamento de entrega',
            template: 'cancellationPackage',
            context: {
                id: order.id,
                deliveryman: order.entregador.name,
                product: order.product,
                address_street: order.destinatario.address_street,
                address_number: order.destinatario.address_number,
                address_complement: order.destinatario.address_complement || '',
                uf: order.destinatario.uf,
                address_zipcode: order.destinatario.address_zipcode
            }
        });

        return res.json({ success: 'The order has been canceled' });
    }
}

export default new Delivery_problemController();
