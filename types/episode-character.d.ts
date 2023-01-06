import { InferAttributes, InferCreationAttributes, Model } from 'sequelize';
import { CreationOptional } from 'sequelize/types/index.js';

export interface EpisodeCharacter
  extends Model<InferAttributes<EpisodeCharacter>, InferCreationAttributes<EpisodeCharacter>> {
  CharacterId: CreationOptional<number>;
  EpisodeId: CreationOptional<number>;
  createdAt?: CreationOptional<Date>;
  updatedAt?: CreationOptional<Date>;
}
