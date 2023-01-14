import { CreationAttributes } from 'sequelize';
import { Episode as EpisodeType } from '../../types/models/episode.js';
import Episode from '../../database/models/episode.js';
import Character from '../../database/models/character.js';
import { InternalError } from '../api-error.js';
import { WhereOptions } from 'sequelize';

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
        attributes: ['id'],
      },
    });
  }

  async findAll(options?: WhereOptions) {
    return await Episode.findAndCountAll({
      distinct: true, // рахує кількість без вкладених моделей
      include: [
        {
          model: Character,
          as: 'characters',
          attributes: ['name'],
          through: {
            attributes: [],
          },
        },
      ],
    });
  }

  async findById(id: number) {
    return await Episode.findByPk(id, {
      include: [
        {
          model: Character,
          as: 'characters',
          attributes: ['name'],
          through: {
            attributes: [],
          },
        },
      ],
    });
  }

  async addCharacter(episodeId: number | undefined, characterId: number | undefined) {
    return Episode.findByPk(episodeId)
      .then((episode) => {
        if (!episode) {
          console.log('**Episode not found!**');
          return null;
        }
        return Character.findByPk(characterId).then((character) => {
          if (!character) {
            console.log('**Character not found!**');
            return null;
          }

          episode.addCharacter(character);
          console.log(`>> added Character id=${character.id} to Episode id=${episode.id}`);
          return episode;
        });
      })
      .catch((err) => {
        console.log('>> Error while adding Character to Episode: ', err);
      });
  }

  async removeCharacter(episodeId: number, characterId: number) {
    return Episode.findByPk(episodeId)
      .then((episode) => {
        if (!episode) {
          console.log('**Episode not found!**');
          return null;
        }
        return Character.findByPk(characterId).then((character) => {
          if (!character) {
            console.log('**Character not found!**');
            return null;
          }

          episode.removeCharacter(character);
          console.log(`>> removed Character id=${character.id} from Episode id=${episode.id}`);
          return episode;
        });
      })
      .catch((err) => {
        console.log('>> Error while adding Character to Episode: ', err);
      });
  }
}

export default new EpisodeService();
