import { DataTypes, QueryInterface } from 'sequelize';
import { Character as CharacterType } from '../../types/models/character.js';
import { Episode as EpisodeType } from '../../types/models/episode.js';
import { EpisodeCharacter as EpisodeCharacterType } from '../../types/models/episode-character.js';

module.exports = {
  up: async (queryInterface: QueryInterface): Promise<void> =>
    await queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.createTable<CharacterType>('Characters', {
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
        url: {
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
      });
      await queryInterface.createTable<EpisodeType>('Episodes', {
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
        url: {
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
      await queryInterface.createTable<EpisodeCharacterType>('EpisodeCharacters', {
        CharacterId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            key: 'id',
            model: 'Characters',
          },
        },
        EpisodeId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            key: 'id',
            model: 'Episodes',
          },
        },
        createdAt: { type: DataTypes.DATE, allowNull: false, defaultValue: new Date() },
        updatedAt: { type: DataTypes.DATE, allowNull: false, defaultValue: new Date() },
      });
    }),

  down: async (queryInterface: QueryInterface): Promise<void> =>
    await queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.dropTable('EpisodeCharacters');
      await queryInterface.dropTable('Characters');
      await queryInterface.dropTable('Episodes');
    }),
};
