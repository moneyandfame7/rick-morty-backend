'use strict';
import { DataTypes } from 'sequelize';
import { Character as CharacterType } from '../../types/models/character.js';
import db from './index.js';
import Episode from './episode.js';
import EpisodeCharacter from './episodecharacter.js';

const Character = db.define<CharacterType>(
  'Character',
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      unique: true,
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
    url: {
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
  {
    timestamps: false,
    tableName: 'Characters',
    modelName: 'Character',
  }
);

/*
!якщо використовуємо додаткові поля в проміжній таблиці,
! ( наприклад created_at ) потрібно передати всю модель,
! а не просто Model.tableName
*/
Character.belongsToMany(Episode, {
  through: { model: EpisodeCharacter, unique: false },
  as: 'episodes',
  constraints: false,
});
Episode.belongsToMany(Character, {
  through: { model: EpisodeCharacter, unique: false },
  as: 'characters',
  constraints: false,
});
export default Character;
