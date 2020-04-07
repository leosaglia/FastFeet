import * as Yup from 'yup';
import { Op } from 'sequelize';
import Recipient from '../models/Recipient';

class RecipientController {
    async store(req, res) {
        const schema = Yup.object().shape({
            cpf: Yup.string()
                .min(11)
                .max(11)
                .required(),
            name: Yup.string().required(),
            address_street: Yup.string().required(),
            address_number: Yup.string().required(),
            address_complement: Yup.string(),
            uf: Yup.string().required(),
            address_city: Yup.string().required(),
            address_zipcode: Yup.number().required()
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Validation fails' });
        }

        const { cpf } = req.body;

        const recipientExists = await Recipient.findOne({ where: { cpf } });

        if (recipientExists) {
            return res.status(400).json({ error: 'CPF already registered' });
        }

        const recipient = await Recipient.create(req.body);

        return res.json(recipient);
    }

    async update(req, res) {
        const schema = Yup.object().shape({
            cpf: Yup.string()
                .min(11)
                .max(11),
            name: Yup.string(),
            address_street: Yup.string(),
            address_number: Yup.string(),
            address_complement: Yup.string(),
            uf: Yup.string(),
            address_city: Yup.string(),
            address_zipcode: Yup.number()
        });

        const { id } = req.params;
        const { cpf } = req.body;

        let recipient = await Recipient.findByPk(id);

        if (!recipient) {
            return res.status(400).json({ error: 'Recipient not found' });
        }

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Validation fails' });
        }

        if (cpf && recipient.cpf !== cpf) {
            const recipientExists = await Recipient.findOne({ where: { cpf } });
            if (recipientExists) {
                return res
                    .status(400)
                    .json({ error: 'CPF already registered' });
            }
        }

        recipient = await recipient.update(req.body);

        return res.json(recipient);
    }

    async index(req, res) {
        const { name } = req.query;

        const response = await Recipient.findAll({
            where: {
                name: {
                    [Op.iLike]: `%${name || ''}%`
                }
            }
        });
        return res.json(response);
    }
}

export default new RecipientController();
