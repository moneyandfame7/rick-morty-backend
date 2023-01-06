'use strict';
import { DataTypes } from 'sequelize';
import { Episode } from '../../types/episode.js';
import db from './index.js';
import EpisodeCharacter from './episodecharacter.js';
import Character from './character.js';

const Episode = db.define<Episode>(
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
