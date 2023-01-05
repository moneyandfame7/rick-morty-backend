'use strict';
import { DataTypes, QueryInterface } from 'sequelize';
import { EpisodeCharacter as EpisodeCharacterType } from '../../types/episode-character.js';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface: QueryInterface): Promise<void> =>
    await queryInterface.sequelize.transaction(async (transaction) => {
      return await queryInterface.createTable<EpisodeCharacterType>(
        'EpisodeCharacter',
        {
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
        },
        {
          transaction,
        }
      );
    }),

  down: async (queryInterface: QueryInterface): Promise<void> =>
    await queryInterface.sequelize.transaction(async (transaction) => {
      return await queryInterface.dropTable('EpisodeCharacter', {
        transaction,
      });
    }),
};
