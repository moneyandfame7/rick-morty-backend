'use strict';
import { DataTypes } from 'sequelize';
import { EpisodeCharacter as EpisodeCharacterType } from '../../types/models/episode-character.js';
import db from './index.js';

const EpisodeCharacter = db.define<EpisodeCharacterType>(
  'EpisodeCharacter',
  {
    CharacterId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Characters',
        key: 'id',
      },
    },
    EpisodeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Episodes',
        key: 'id',
      },
    },
  },
  {
    timestamps: true,
  }
);

export default EpisodeCharacter;
