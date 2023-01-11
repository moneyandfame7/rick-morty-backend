import {
  BelongsToManyAddAssociationMixin,
  ForeignKey,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from 'sequelize';
import { Episode } from './episode.js';
import { ResourceBases } from './bases.js';
import {
  BelongsToManyAddAssociationsMixin,
  BelongsToManySetAssociationsMixin,
  NonAttribute,
} from 'sequelize/types/index.js';
import { Location } from './location.js';

export interface Character
  extends Model<InferAttributes<Character>, InferCreationAttributes<Character>>,
    ResourceBases {
  status: string;
  species: string;
  type: string;
  gender: string;
  // location:string
  // origin: string;
  // Episodes: NonAttribute<Episode[]>;
  image: string;
  LocationId: ForeignKey<Location['id']>;
  OriginId: ForeignKey<Location['id']>;
  episodes: NonAttribute<Episode[]>;

  // add one
  addEpisode: BelongsToManyAddAssociationMixin<Episode, number>;
  // add many
  addEpisodes: BelongsToManyAddAssociationsMixin<Character, number>;
  // set many
  setEpisodes: BelongsToManySetAssociationsMixin<Episode, number>;
}
