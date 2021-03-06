import Sequelize from 'sequelize';
import dbConfig from '../config/database';

import User from '../app/models/User';
import Recipient from '../app/models/Recipient';
import File from '../app/models/File';
import Deliveryman from '../app/models/Deliveryman';
import Package from '../app/models/Package';
import Delivery_problem from '../app/models/Delivery_problem';

const models = [User, Recipient, File, Deliveryman, Package, Delivery_problem];

class Database {
    constructor() {
        this.init();
    }

    init() {
        this.connection = new Sequelize(dbConfig);

        models
            .map(model => model.init(this.connection))
            .map(
                model =>
                    model.associate && model.associate(this.connection.models)
            );
    }
}

export default new Database();
