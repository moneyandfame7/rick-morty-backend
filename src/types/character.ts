import { BelongsToManyAddAssociationMixin, InferAttributes, InferCreationAttributes, Model } from 'sequelize';
import { Episode } from './episode.js';
import { ResourceBases } from './bases.js';
import { BelongsToManyAddAssociationsMixin, BelongsToManySetAssociationsMixin } from 'sequelize/types/index.js';
// TODO : локації + оріджин + episodes
export interface Character
  extends Model<InferAttributes<Character>, InferCreationAttributes<Character>>,
    ResourceBases {
  status: 'Alive' | 'Dead' | 'unknown';
  species: string;
  type: string;
  gender: 'Male' | 'Female' | 'Genderless' | 'unknown';
  // location:string
  // origin: string;
  // Episodes: NonAttribute<Episode[]>;
  image: string;

  // add one
  addEpisode: BelongsToManyAddAssociationMixin<Episode, number>;
  // add many
  addEpisodes: BelongsToManyAddAssociationsMixin<Character, number>;
  // set many
  setEpisodes: BelongsToManySetAssociationsMixin<Episode, number>;
}
