import * as Yup from 'yup';
import Package from '../models/Package';
import Deliveryman from '../models/Deliveryman';
import Recipient from '../models/Recipient';
import Mail from '../../lib/Mail';

class PackageController {
    async store(req, res) {
        const schema = Yup.object().shape({
            recipient_id: Yup.number().required(),
            deliveryman_id: Yup.number().required(),
            product: Yup.string().required()
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'validation fails' });
        }

        const order = await Package.create(req.body);

        const orderData = await Package.findByPk(order.id, {
            attributes: ['id', 'product', 'recipient_id', 'deliveryman_id'],
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

        await Mail.sendMail({
            to: `${orderData.entregador.name} <${orderData.entregador.email}>`,
            subject: 'Nova mercadoria cadastrada',
            template: 'newPackage',
            context: {
                deliveryman: orderData.entregador.name,
                product: order.product,
                recipient: orderData.destinatario.name,
                address_street: orderData.destinatario.address_street,
                address_number: orderData.destinatario.address_number,
                address_complement:
                    orderData.destinatario.address_complement || '',
                uf: orderData.destinatario.uf,
                address_zipcode: orderData.destinatario.address_zipcode
            }
        });
        return res.json(orderData);
    }

    async index(req, res) {
        const packages = await Package.findAll({
            attributes: [
                'id',
                'product',
                'canceled_at',
                'start_date',
                'end_date',
                'recipient_id',
                'deliveryman_id'
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
                        'cpf',
                        'address_street',
                        'address_number',
                        'address_complement',
                        'uf',
                        'address_zipcode'
                    ]
                }
            ]
        });
        return res.json(packages);
    }

    async delete(req, res) {
        const order = await Package.findByPk(req.params.id, {
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

        if (!order) {
            return res.status(400).json({ error: 'Package does not exist' });
        }

        if (order.end_date !== null) {
            return res
                .status(401)
                .json({ error: 'You can not cancel a delivery completed' });
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

        return res.json(order);
    }

    async update(req, res) {
        const { deliveryman_id, product } = req.body;
        const schema = Yup.object().shape({
            deliveryman_id: Yup.number(),
            product: Yup.string()
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'validation fails' });
        }

        const order = await Package.findByPk(req.params.id);

        if (!order) {
            return res.status(400).json({ error: 'Package does not exist' });
        }
        if (order.canceled_at !== null || order.start_date !== null) {
            return res.status(401).json({
                error: 'It is not possible update a canceled or sent package'
            });
        }

        order.deliveryman_id = deliveryman_id;
        order.product = product;

        await order.save();

        return res.json(order);
    }
}

export default new PackageController();
