import {
  BelongsToManyAddAssociationsMixin,
  BelongsToManyRemoveAssociationMixin,
  InferAttributes,
  InferCreationAttributes,
  Model,
  NonAttribute,
} from 'sequelize';
import { ResourceBases } from './bases.js';
import { BelongsToManyAddAssociationMixin, BelongsToManySetAssociationsMixin } from 'sequelize/types/index.js';
import { Character } from './character.js';

export interface Episode extends Model<InferAttributes<Episode>, InferCreationAttributes<Episode>>, ResourceBases {
  episode: string;
  air_date: string;

  characters: NonAttribute<Character[]>;
  // add one
  addCharacter: BelongsToManyAddAssociationMixin<Character, number>;
  // add many
  addCharacters: BelongsToManyAddAssociationsMixin<Character, number>;
  //set many
  setCharacters: BelongsToManySetAssociationsMixin<Character, number>;
  // remove one
  removeCharacter: BelongsToManyRemoveAssociationMixin<Character, number>;
}
