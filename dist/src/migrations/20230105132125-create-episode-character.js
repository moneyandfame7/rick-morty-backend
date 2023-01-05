'use strict';
import { DataTypes } from 'sequelize';
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
//# sourceMappingURL=20230105132125-create-episode-character.js.map