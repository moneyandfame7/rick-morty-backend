'use strict';
import { DataTypes } from 'sequelize';
import { EpisodeCharacter } from '../../types/episode-character.js';
import { DataBaseInstance } from '../database.js';

const Character = DataBaseInstance.model('');
const EpisodeCharacter = DataBaseInstance.db.define<EpisodeCharacter>(
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