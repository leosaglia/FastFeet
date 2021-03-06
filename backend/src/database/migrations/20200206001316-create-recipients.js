module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('recipients', {
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true
            },
            cpf: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true
            },
            name: {
                type: Sequelize.STRING,
                allowNull: false
            },
            address_street: {
                type: Sequelize.STRING,
                allowNull: false
            },
            address_number: {
                type: Sequelize.STRING,
                allowNull: false
            },
            address_complement: {
                type: Sequelize.STRING,
                allowNull: true
            },
            uf: {
                type: Sequelize.STRING,
                allowNull: false
            },
            address_city: {
                type: Sequelize.STRING,
                allowNull: false
            },
            address_zipcode: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            created_at: {
                type: Sequelize.DATE,
                allowNull: false
            },
            updated_at: {
                type: Sequelize.DATE,
                allowNull: false
            }
        });
    },

    down: queryInterface => {
        return queryInterface.dropTable('recipients');
    }
};
