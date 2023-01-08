'use strict';
import { DataTypes } from 'sequelize';
import { Episode } from '../../types/episode.js';
import { DataBaseInstance } from '../database.js';

const Episode = DataBaseInstance.db.define<Episode>(
  'Episode',
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
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
  },
  {
    timestamps: false,
  }
);

export default Episode;
