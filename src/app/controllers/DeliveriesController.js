import { Op } from 'sequelize';
import * as Yup from 'yup';
import Package from '../models/Package';
import Recipient from '../models/Recipient';
import File from '../models/File';

class DeliveriesController {
    async index(req, res) {
        const orders = await Package.findAll({
            where: {
                deliveryman_id: req.params.id,
                end_date: {
                    [Op.ne]: null
                }
            },
            attributes: [
                'id',
                'product',
                'start_date',
                'end_date',
                'recipient_id',
                'signature_id'
            ],
            include: [
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
                        'address_city',
                        'address_zipcode'
                    ]
                }
            ]
        });
        return res.json(orders);
    }

    async update(req, res) {
        const { id: deliveryman_id, order: orderId } = req.params;
        const schema = Yup.object().shape({
            signature_id: Yup.number().required()
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Validation fails' });
        }

        const order = await Package.findOne({
            where: {
                id: orderId,
                deliveryman_id,
                canceled_at: null,
                end_date: null
            }
        });

        if (!order) {
            return res.status(400).json({ error: 'Package not found' });
        }

        if (order.start_date === null) {
            return res.status(400).json({
                error: 'The package has not yet been picked up for delivery'
            });
        }

        const signature = await File.findByPk(req.body.signature_id);

        if (!signature) {
            return res.status(400).json({ error: 'Invalid signature' });
        }

        order.end_date = new Date();

        order.signature_id = req.body.signature_id;

        await order.save();

        return res.json(order);
    }
}

export default new DeliveriesController();
