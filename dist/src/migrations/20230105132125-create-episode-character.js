'use strict';
import { DataTypes } from 'sequelize';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    up: async (queryInterface) => await queryInterface.sequelize.transaction(async (transaction) => {
        return await queryInterface.createTable('EpisodeCharacter', {
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                autoIncrement: false,
            },
            character_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            episode_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
        }, {
            transaction,
        });
    }),
    down: async (queryInterface) => await queryInterface.sequelize.transaction(async (transaction) => {
        return await queryInterface.dropTable('EpisodeCharacter', {
            transaction,
        });
    }),
};
