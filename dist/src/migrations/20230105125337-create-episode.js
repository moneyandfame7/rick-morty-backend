'use strict';
import { DataTypes } from 'sequelize';
module.exports = {
    up: async (queryInterface) => await queryInterface.sequelize.transaction(async (transaction) => {
        return await queryInterface.createTable('Episodes', {
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                autoIncrement: false,
            },
            name: {
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
            created_at: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: new Date(),
            },
        }, {
            transaction,
        });
    }),
    down: async (queryInterface) => await queryInterface.sequelize.transaction(async (transaction) => {
        return await queryInterface.dropTable('Episodes', {
            transaction,
        });
    }),
};
