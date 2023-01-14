'use strict';
import { DataTypes } from 'sequelize';
import { Character as CharacterType } from '../../types/models/character';
import db from './index';
import Episode from './episode';
import CharacterEpisode from './character-episode';
import Location from './location';

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
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    species: {
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
    OriginId: { type: DataTypes.INTEGER, allowNull: true },
    LocationId: { type: DataTypes.INTEGER, allowNull: true },

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
  through: { model: CharacterEpisode, unique: false },
  as: 'episodes',
  constraints: false,
});
Episode.belongsToMany(Character, {
  through: { model: CharacterEpisode, unique: false },
  as: 'characters',
  constraints: false,
});

Character.belongsTo(Location, {
  foreignKey: 'LocationId',
  as: 'location',
  constraints: false,
});
Character.belongsTo(Location, {
  foreignKey: 'OriginId',
  as: 'origin',
  constraints: false,
});
Location.hasMany(Character, {
  as: 'residents',
  constraints: false,
});
export default Character;
