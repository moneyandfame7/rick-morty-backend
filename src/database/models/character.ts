'use strict';
import { DataTypes } from 'sequelize';
import { Character } from '../../types/models/character.js';
import Episode from './episode.js';
import EpisodeCharacter from './episodecharacter.js';
import { DataBaseInstance } from '../database.js';

const Character = DataBaseInstance.db.define<Character>(
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
  through: { model: EpisodeCharacter, unique: false },
  as: 'episodes',
});

Episode.belongsToMany(Character, {
  through: { model: EpisodeCharacter, unique: false },
  as: 'characters',
});

export default Character;
