import { DataTypes } from 'sequelize';
module.exports = {
    up: async (queryInterface) => await queryInterface.sequelize.transaction(async (transaction) => {
        return await queryInterface.createTable('Characters', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            status: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            species: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            type: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            origin: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            episode: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            url: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            image: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            createdAt: {
                allowNull: false,
                type: DataTypes.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: DataTypes.DATE,
            },
        }, { transaction });
    }),
    down: async (queryInterface) => await queryInterface.sequelize.transaction(async (transaction) => {
        return await queryInterface.dropTable('Characters', {
            transaction,
        });
    }),
};
//# sourceMappingURL=20230105114224-create-character.js.map