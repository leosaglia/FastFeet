import Sequelize, { Model } from 'sequelize';

class User extends Model {
    // connection
    static init(sequelize) {
        super.init(
            {
                name: Sequelize.STRING,
                email: Sequelize.STRING,
                password: Sequelize.VIRTUAL,
                password_hash: Sequelize.STRING
            },
            {
                sequelize // sequelize + connection
            }
        );
        return this;
    }
}

export default User;
