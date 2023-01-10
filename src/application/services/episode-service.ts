import { CreationAttributes } from 'sequelize';
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
        attributes: ['id'],
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
      nest: false,
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

  // async addCharacter(episodeId: number, characterId: number) {
  //   const episode = await Episode.findByPk(episodeId);
  //   const character = await Character.findByPk(characterId);
  //   if (episode && character) {
  //     await episode.addCharacter(character);
  //   }
  //   throw new InternalError('Episode or character not found.');
  // }

  // async removeCharacter(episodeId: number, characterId: number) {
  //   const episode = await Episode.findByPk(episodeId);
  //   const character = await Character.findByPk(characterId);
  //   if (episode && character) {
  //     await episode.removeCharacter(character);
  //   }
  //   throw new InternalError('Episode or character not found.');
  // }
}

export default new EpisodeService();
