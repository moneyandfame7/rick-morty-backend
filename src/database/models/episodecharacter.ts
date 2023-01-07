'use strict';
import { DataTypes } from 'sequelize';
import Database from '../database.js';
import { EpisodeCharacter } from '../../types/episode-character.js';

const db = new Database().db;
const EpisodeCharacter = db.define<EpisodeCharacter>(
  'EpisodeCharacter',
  {
    CharacterId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    EpisodeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

export default EpisodeCharacter;
