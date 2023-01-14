import { DataTypes } from 'sequelize';
module.exports = {
    up: async (queryInterface) => await queryInterface.sequelize.transaction(async (transaction) => {
        await queryInterface.createTable('Episodes', {
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
            episode: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            air_date: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            created_at: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: new Date(),
            },
        });
        console.log('>> Table «Episodes» was created successfully <<');
    }),
    down: async (queryInterface) => await queryInterface.sequelize.transaction(async (transaction) => {
        await queryInterface.dropTable('Episodes', { cascade: true });
        console.log('>> Table «Episodes» was dropped successfully <<');
    }),
};
