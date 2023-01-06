'use strict';
import { DataTypes } from 'sequelize';
import db from './index.js';
import { Character } from 'character.js';
import Episode from './episode.js';
import EpisodeCharacter from './episodecharacter.js';

const Character = db.define<Character>(
  'Character',
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    species: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: new Date(),
    },
  },
  { timestamps: false }
);

/*
!якщо використовуємо додаткові поля в проміжній таблиці,
! ( наприклад created_at ) потрібно передати всю модель,
! а не просто Model.tableName
*/
Character.belongsToMany(Episode, {
  through: EpisodeCharacter,
  as: 'episodes',
});

Episode.belongsToMany(Character, {
  through: EpisodeCharacter,
  as: 'characters',
});

export default Character;
