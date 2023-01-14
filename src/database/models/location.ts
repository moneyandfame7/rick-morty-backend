'use strict';
import { DataTypes } from 'sequelize';
import { Location as LocationType } from '../../types/models/location.js';
import db from './index.js';

const Location = db.define<LocationType>(
  'Location',
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
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
  {
    timestamps: false,
    tableName: 'Locations',
    modelName: 'Location',
  }
);

export default Location;
