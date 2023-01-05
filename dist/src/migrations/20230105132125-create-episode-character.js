'use strict';
import { DataTypes } from 'sequelize';
import EpisodeCharacter from '../models/episodecharacter.js';
import Character from '../models/character.js';
import Episode from '../models/episode.js';
module.exports = {
    up: async (queryInterface) => await queryInterface.sequelize.transaction(async (transaction) => {
        return await queryInterface.createTable(EpisodeCharacter.tableName, {
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                autoIncrement: false,
            },
            character_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: Character.tableName,
                    key: 'id',
                },
            },
            episode_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: Episode.tableName,
                    key: 'id',
                },
            },
        }, {
            transaction,
        });
    }),
    down: async (queryInterface) => await queryInterface.sequelize.transaction(async (transaction) => {
        return await queryInterface.dropTable(EpisodeCharacter.tableName, {
            transaction,
        });
    }),
};
//# sourceMappingURL=20230105132125-create-episode-character.js.map