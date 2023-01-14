import { DataTypes } from 'sequelize';
module.exports = {
    up: async (queryInterface) => await queryInterface.sequelize.transaction(async (transaction) => {
        await queryInterface.createTable('Characters', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER,
                unique: true,
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
            gender: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            image: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            created_at: {
                type: DataTypes.STRING,
                allowNull: false,
                defaultValue: new Date(),
            },
            LocationId: {
                type: DataTypes.INTEGER,
                allowNull: true,
                references: {
                    model: 'Locations',
                    key: 'id',
                },
            },
            OriginId: {
                type: DataTypes.INTEGER,
                allowNull: true,
                references: {
                    model: 'Locations',
                    key: 'id',
                },
            },
        });
        console.log('>> Table «Characters» was created successfully <<');
    }),
    down: async (queryInterface) => await queryInterface.sequelize.transaction(async (transaction) => {
        await queryInterface.dropTable('Characters', { cascade: true });
        console.log('>> Table «Characters» was dropped successfully <<');
    }),
};
