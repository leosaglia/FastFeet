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
            text: `Olá ${orderData.entregador.name}!

            Uma nova mercadoria está disponível para retirada.

            Dados do produto:
            nome - ${order.product}
            
            Dados da Entrega:
            Destinatário: ${orderData.destinatario.name}
            Rua: ${orderData.destinatario.address_street}
            Número: ${orderData.destinatario.address_number}
            Complemento: ${orderData.destinatario.address_complement || ''}
            UF: ${orderData.destinatario.uf}
            CEP: ${orderData.destinatario.address_zipcode}
            `
        });
        return res.json(orderData);
    }
}

export default new PackageController();
