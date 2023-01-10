import { BelongsToManyAddAssociationMixin, InferAttributes, InferCreationAttributes, Model } from 'sequelize';
import { Episode } from './episode.js';
import { ResourceBases } from './bases.js';
import {
  BelongsToManyAddAssociationsMixin,
  BelongsToManySetAssociationsMixin,
  NonAttribute,
} from 'sequelize/types/index.js';
// TODO : локації + оріджин + episodes
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

  episodes: NonAttribute<Episode[]>;

  // add one
  addEpisode: BelongsToManyAddAssociationMixin<Episode, number>;
  // add many
  addEpisodes: BelongsToManyAddAssociationsMixin<Character, number>;
  // set many
  setEpisodes: BelongsToManySetAssociationsMixin<Episode, number>;
}
