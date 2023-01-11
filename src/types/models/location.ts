import { InferAttributes, InferCreationAttributes, Model, NonAttribute } from 'sequelize';
import { ResourceBases } from './bases.js';
import {
  BelongsToManyAddAssociationMixin,
  BelongsToManyAddAssociationsMixin,
  BelongsToManyRemoveAssociationMixin,
  BelongsToManyRemoveAssociationsMixin,
  BelongsToManySetAssociationsMixin,
} from 'sequelize';
import { Character } from './character.js';

export interface Location extends Model<InferAttributes<Location>, InferCreationAttributes<Location>>, ResourceBases {
  type: string;
  dimension: string;
  // персонажі
  residents: NonAttribute<Character[]>;
  // add one
  addCharacter: BelongsToManyAddAssociationMixin<Character, number>;
  // add many
  addCharacters: BelongsToManyAddAssociationsMixin<Character, number>;
  //set many
  setCharacters: BelongsToManySetAssociationsMixin<Character, number>;
  // remove one
  removeCharacter: BelongsToManyRemoveAssociationMixin<Character, number>;
  // remove many
  removeCharacters: BelongsToManyRemoveAssociationsMixin<Character, number>;
}
