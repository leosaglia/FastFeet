import Sequelize, { Model } from 'sequelize';

class Delivery_problem extends Model {
    static init(sequelize) {
        super.init(
            {
                description: Sequelize.STRING
            },
            {
                sequelize
            }
        );
        return this;
    }

    static associate(models) {
        this.belongsTo(models.Package, {
            foreignKey: 'delivery_id',
            as: 'encomenda'
        });
    }
}

export default Delivery_problem;
