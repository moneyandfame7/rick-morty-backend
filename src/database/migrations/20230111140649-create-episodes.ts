import { DataTypes, QueryInterface } from 'sequelize';
import { Episode as EpisodeType } from '../../types/models/episode.js';

module.exports = {
  up: async (queryInterface: QueryInterface): Promise<void> =>
    await queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.createTable<EpisodeType>(
        'Episodes',
        {
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
        },
        { transaction }
      );
      console.log('>> Table «Episodes» was created successfully <<');
    }),

  down: async (queryInterface: QueryInterface): Promise<void> =>
    await queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.dropTable('Episodes', { transaction, cascade: true });
      console.log('>> Table «Episodes» was dropped successfully <<');
    }),
};
