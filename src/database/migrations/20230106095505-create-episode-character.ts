import { DataTypes, QueryInterface } from 'sequelize';
import EpisodeCharacter from '../models/episodecharacter.js';
import { EpisodeCharacter as EpisodeCharacterType } from '../../types/models/episode-character.js';
import Episode from '../models/episode.js';
import Character from '../models/character.js';

module.exports = {
  up: async (queryInterface: QueryInterface): Promise<void> =>
    await queryInterface.sequelize.transaction(async (transaction) => {
      return await queryInterface.createTable<EpisodeCharacterType>(
        EpisodeCharacter.tableName,
        {
          EpisodeId: {
            type: DataTypes.INTEGER,
            references: {
              model: Episode.tableName,
              key: 'id',
            },
          },
          CharacterId: {
            type: DataTypes.INTEGER,
            references: {
              model: Character.tableName,
              key: 'id',
            },
          },
          createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
          },
          updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
          },
        },
        { transaction }
      );
    }),

  down: async (queryInterface: QueryInterface): Promise<void> =>
    await queryInterface.sequelize.transaction(async (transaction) => {
      return await queryInterface.dropTable(EpisodeCharacter.tableName, {
        transaction,
      });
    }),
};
