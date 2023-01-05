import { InferAttributes, InferCreationAttributes, Model } from 'sequelize';
// import { Character } from './character.js';
import { ResourceBases } from './bases.js';

export interface Episode extends Model<InferAttributes<Episode>, InferCreationAttributes<Episode>>, ResourceBases {
  episode: string;
  // тут мають бути посилання на персонажів
  // Characters: NonAttribute<Character[]>;
}
