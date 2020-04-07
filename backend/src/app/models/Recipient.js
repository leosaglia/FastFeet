import Sequelize, { Model } from 'sequelize';

class Recipient extends Model {
    static init(sequelize) {
        super.init(
            {
                cpf: Sequelize.STRING,
                name: Sequelize.STRING,
                address_street: Sequelize.STRING,
                address_number: Sequelize.STRING,
                address_complement: Sequelize.STRING,
                uf: Sequelize.STRING,
                address_city: Sequelize.STRING,
                address_zipcode: Sequelize.INTEGER
            },
            {
                sequelize
            }
        );
        return this;
    }
}

export default Recipient;
