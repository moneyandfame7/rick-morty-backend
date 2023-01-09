import sequelize, { CreationAttributes } from 'sequelize';
import { Episode as EpisodeType } from '../../types/models/episode.js';
import Episode from '../../database/models/episode.js';
import Character from '../../database/models/character.js';
import { InternalError } from '../api-error.js';

class EpisodeService {
  async create(episode: CreationAttributes<EpisodeType>) {
    return await Episode.create(episode);
  }

  async findAllByCharacterId(id: number) {
    return await Episode.findAll({
      include: {
        model: Character,
        as: 'characters',
        where: {
          id: id,
        },
        attributes: [],
      },
    });
  }

  async findAll() {
    return await Episode.findAll({
      include: [
        {
          model: Character,
          as: 'characters',
          attributes: ['url'],
          through: {
            attributes: [],
          },
        },
      ],
      nest: true,
    });
  }

  async findById(id: number) {
    return await Episode.findByPk(id, {
      include: [
        {
          model: Character,
          as: 'characters',
          attributes: ['url'],
          through: {
            attributes: [],
          },
        },
      ],
    });
  }

  async addCharacter(episodeId: number, characterId: number) {
    const episode = await Episode.findByPk(episodeId);
    const character = await Character.findByPk(characterId);
    if (episode && character) {
      await episode.addCharacter(character);
    }
    throw new InternalError('Episode or character not found.');
  }
}

export default new EpisodeService();
