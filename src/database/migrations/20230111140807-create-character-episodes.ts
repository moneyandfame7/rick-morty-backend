import { DataTypes, QueryInterface } from 'sequelize';
import { CharacterEpisode as CharacterEpisodeType } from '../../types/models/character-episode.js';

module.exports = {
  up: async (queryInterface: QueryInterface): Promise<void> =>
    await queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.createTable<CharacterEpisodeType>(
        'CharacterEpisodes',
        {
          CharacterId: { type: DataTypes.INTEGER, allowNull: false, references: { key: 'id', model: 'Characters' } },
          EpisodeId: { type: DataTypes.INTEGER, allowNull: false, references: { key: 'id', model: 'Episodes' } },
          createdAt: { type: DataTypes.DATE, allowNull: false, defaultValue: new Date() },
          updatedAt: { type: DataTypes.DATE, allowNull: false, defaultValue: new Date() },
        },
        { transaction }
      );

      console.log('>> Table «CharacterEpisodes» was created successfully <<');
    }),

  down: async (queryInterface: QueryInterface): Promise<void> =>
    await queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.dropTable('CharacterEpisodes', { transaction, cascade: true });
      console.log('>> Table «CharacterEpisodes» was dropped successfully <<');
    }),
};
