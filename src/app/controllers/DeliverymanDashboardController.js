import { setHours, startOfDay, isAfter, isBefore } from 'date-fns';
import { Op } from 'sequelize';
import Package from '../models/Package';
import Recipient from '../models/Recipient';

class DeliverymanDashboardController {
    async index(req, res) {
        const orders = await Package.findAll({
            where: {
                deliveryman_id: req.params.id,
                canceled_at: null,
                end_date: null
            },
            attributes: ['id', 'product', 'start_date', 'recipient_id'],
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
        const { order: orderId, id: deliveryman_id } = req.params;
        const hour = startOfDay(new Date());
        const hourStart = setHours(hour, 8);
        const hourEnd = setHours(hour, 18);
        const deliveryCount = await Package.count({
            where: {
                deliveryman_id,
                start_date: {
                    [Op.between]: [hourStart, hourEnd]
                }
            }
        });
        if (deliveryCount >= 5) {
            return res
                .status(401)
                .json({ error: 'You can only withdraw 5 orders per day' });
        }

        if (isAfter(hourStart, new Date()) || isBefore(hourEnd, new Date())) {
            return res.status(401).json({
                error: 'You can only pick up orders between 8 am and 6 pm'
            });
        }

        const order = await Package.findOne({
            where: { id: orderId, deliveryman_id, start_date: null }
        });

        if (!order) {
            return res.status(400).json({
                error:
                    'Package not found. Check if the package has already been picked up or if it belongs to another deliveryman'
            });
        }

        if (order.canceled_at !== null) {
            return res
                .status(400)
                .json({ error: 'This package has been canceled' });
        }

        order.start_date = new Date();

        await order.save();

        return res.json(order);
    }
}

export default new DeliverymanDashboardController();
