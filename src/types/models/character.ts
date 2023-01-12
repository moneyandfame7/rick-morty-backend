import {
  BelongsToManyAddAssociationMixin,
  ForeignKey,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from 'sequelize';
import { Episode } from './episode.js';
import { ResourceBases } from './bases.js';
import { BelongsToManyAddAssociationsMixin, BelongsToManySetAssociationsMixin, NonAttribute } from 'sequelize';
import { Location } from './location.js';

export interface Character
  extends Model<InferAttributes<Character>, InferCreationAttributes<Character>>,
    ResourceBases {
  status: string;
  species: string;
  type: string;
  gender: string;
  image: string;

  // id location
  LocationId: ForeignKey<Location['id']>;
  // id origin
  OriginId: ForeignKey<Location['id']>;
  episodes: NonAttribute<Episode[]> | NonAttribute<string[]>;

  // add one
  addEpisode: BelongsToManyAddAssociationMixin<Episode, number>;
  // add many
  addEpisodes: BelongsToManyAddAssociationsMixin<Character, number>;
  // set many
  setEpisodes: BelongsToManySetAssociationsMixin<Episode, number>;
}
