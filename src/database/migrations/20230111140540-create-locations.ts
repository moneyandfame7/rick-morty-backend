import { DataTypes, QueryInterface } from 'sequelize';
import { Location as LocationType } from '../../types/models/location.js';

module.exports = {
  up: async (queryInterface: QueryInterface): Promise<void> =>
    await queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.createTable<LocationType>(
        'Locations',
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
        },
        { transaction }
      );
    }),

  down: async (queryInterface: QueryInterface): Promise<void> =>
    await queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.dropTable('Locations', { transaction, cascade: true });
    }),
};
