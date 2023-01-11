import { DataTypes, QueryInterface } from 'sequelize';
import { Character as CharacterType } from '../../types/models/character.js';
import { Episode as EpisodeType } from '../../types/models/episode.js';
import { Location as LocationType } from '../../types/models/location.js';
import { CharacterEpisode as CharacterEpisodeType } from '../../types/models/character-episode.js';

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
      await queryInterface.createTable<LocationType>('Locations', {
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
        type: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        dimension: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        created_at: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: new Date(),
        },
      });
      await queryInterface.createTable<CharacterEpisodeType>('CharacterEpisodes', {
        CharacterId: { type: DataTypes.INTEGER, allowNull: false, references: { key: 'id', model: 'Characters' } },
        EpisodeId: { type: DataTypes.INTEGER, allowNull: false, references: { key: 'id', model: 'Episodes' } },
        createdAt: { type: DataTypes.DATE, allowNull: false, defaultValue: new Date() },
        updatedAt: { type: DataTypes.DATE, allowNull: false, defaultValue: new Date() },
      });
    }),

  down: async (queryInterface: QueryInterface): Promise<void> =>
    await queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.dropTable('CharacterEpisodes');
      await queryInterface.dropTable('Characters');
      await queryInterface.dropTable('Episodes');
      await queryInterface.dropTable('Locations');
    }),
};
