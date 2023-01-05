import { CreationOptional, ForeignKey, InferAttributes, InferCreationAttributes, Model } from 'sequelize';
import { Episode } from './episode.js';
import { ResourceBases } from './bases.js';
import { Character } from './character.js';

export interface EpisodeCharacter
  extends Model<InferAttributes<EpisodeCharacter>, InferCreationAttributes<EpisodeCharacter>> {
  id: CreationOptional<number>;
  character_id: ForeignKey<Character['id']>;
  episode_id: ForeignKey<Episode['id']>;
}
