import { DataTypes } from 'sequelize';
module.exports = {
    up: async (queryInterface) => await queryInterface.sequelize.transaction(async (transaction) => {
        await queryInterface.createTable('Locations', {
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
                unique: true,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            type: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            dimension: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            created_at: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: new Date(),
            },
        });
        console.log('>> Table «Locations» was created successfully <<');
    }),
    down: async (queryInterface) => await queryInterface.sequelize.transaction(async (transaction) => {
        await queryInterface.dropTable('Locations', { cascade: true });
        console.log('>> Table «Locations» was dropped successfully <<');
    }),
};
