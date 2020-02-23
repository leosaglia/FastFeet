import Package from '../models/Package';
import Deliveryman from '../models/Deliveryman';
import Recipient from '../models/Recipient';
import Mail from '../../lib/Mail';

class PackageController {
    async store(req, res) {
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
}

export default new PackageController();
