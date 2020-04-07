import * as Yup from 'yup';
import { Op } from 'sequelize';
import Deliveryman from '../models/Deliveryman';

class DeliverymanController {
    async store(req, res) {
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            email: Yup.string()
                .email()
                .required()
        });
        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Validation fails' });
        }
        const emailExists = await Deliveryman.findOne({
            where: { email: req.body.email }
        });
        if (emailExists) {
            return res.status(400).json({ error: 'E-mail already registered' });
        }

        const deliveryman = await Deliveryman.create(req.body);
        return res.json(deliveryman);
    }

    async update(req, res) {
        const schema = Yup.object().shape({
            name: Yup.string(),
            email: Yup.string().email(),
            avatar_id: Yup.number()
        });
        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Validation fails' });
        }
        const { id } = req.params;
        const { email } = req.body;
        const deliveryman = await Deliveryman.findByPk(id);
        if (email && deliveryman.email !== email) {
            const emailExists = await Deliveryman.findOne({ where: { email } });

            if (emailExists) {
                return res
                    .status(400)
                    .json({ error: 'E-mail already registered' });
            }
        }
        await deliveryman.update(req.body);
        return res.json(deliveryman);
    }

    async index(req, res) {
        const { name } = req.query;
        const deliverymen = await Deliveryman.findAll({
            where: {
                name: {
                    [Op.iLike]: `%${name || ''}%`
                }
            }
        });
        return res.json(deliverymen);
    }

    async delete(req, res) {
        const { id } = req.params;
        await Deliveryman.destroy({ where: { id } });
        return res.json({
            success: 'Deliveryman removed successfully'
        });
    }
}

export default new DeliverymanController();
