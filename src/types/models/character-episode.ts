import { InferAttributes, InferCreationAttributes, Model } from 'sequelize';
import { CreationOptional } from 'sequelize';

export interface CharacterEpisode
  extends Model<InferAttributes<CharacterEpisode>, InferCreationAttributes<CharacterEpisode>> {
  CharacterId: CreationOptional<number>;

  EpisodeId: CreationOptional<number>;

  createdAt?: CreationOptional<Date>;

  updatedAt?: CreationOptional<Date>;
}
