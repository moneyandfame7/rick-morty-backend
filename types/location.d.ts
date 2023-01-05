import { InferAttributes, InferCreationAttributes, Model } from 'sequelize';
// import { Character } from './character.js';
import { ResourceBases } from './bases.js';

// TODO: розібратись зі звʼязками з Character
export interface Location extends Model<InferAttributes<Location>, InferCreationAttributes<Location>>, ResourceBases {
  type: string;
  dimension: string;
  // residents: // тут повинні бути посилання на персонажів
}
