import { InferAttributes, InferCreationAttributes, Model, NonAttribute } from 'sequelize';
import { Episode } from './episode.js';
import { ResourceBases } from './bases.js';

export interface Character
  extends Model<InferAttributes<Character>, InferCreationAttributes<Character>>,
    ResourceBases {
  status: 'Alive' | 'Dead' | 'unknown';
  species: string;
  type: string;
  gender: 'Male' | 'Female' | 'Genderless' | 'unknown';
  // location:string
  // origin: string;
  Episodes: NonAttribute<Episode[]>;
  image: string;
}
