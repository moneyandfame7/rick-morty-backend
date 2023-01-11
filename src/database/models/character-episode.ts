'use strict';
import { DataTypes } from 'sequelize';
import { CharacterEpisode as CharacterEpisodeType } from '../../types/models/character-episode.js';
import db from './index.js';

const CharacterEpisode = db.define<CharacterEpisodeType>(
  'CharacterEpisode',
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
    tableName: 'CharacterEpisodes',
  }
);

export default CharacterEpisode;
