import { CreationAttributes } from 'sequelize/types/index.js';
import { Episode as EpisodeType } from '../../types/episode.js';
import Episode from '../../database/models/episode.js';
import Character from '../../database/models/character.js';
import sequelize, { Sequelize } from 'sequelize';
import EpisodeCharacter from '../../database/models/episodecharacter.js';

class EpisodeService {
  create = async (episode: CreationAttributes<EpisodeType>) => {
    try {
      const episode_1 = await Episode.create(episode);
      console.log('>> Created Episode: ' + JSON.stringify(episode_1, null, 2));
      return episode_1;
    } catch (err) {
      console.log('>> Error while creating Episode: ', err);
      if (err instanceof Error) throw new Error(err.message);
    }
  };

  findAllByCharacterId = async (id: number) => {
    try {
      const episodes = await Episode.findAll({
        include: {
          model: Character,
          as: 'characters',
          where: {
            id: id,
          },
          attributes: [],
        },
      });
      return episodes;
    } catch (err) {
      console.log('>> Error while retrieving Episodes: ', err);
      if (err instanceof Error) throw new Error(err.message);
    }
  };

  findAll = async () => {
    try {
      const episodes = await Episode.findAll({
        attributes: {
          include: [[sequelize.col('characters.url'), 'pavepepe']],
        },
        include: [
          {
            model: Character,
            as: 'characters',
            attributes: ['url'],

            // якщо убрати це, то можна побачити проміжну таблицю
            through: {
              attributes: [],
            },
          },
        ],
        nest: true,
      });
      return episodes;
    } catch (err) {
      console.log('>> Error while retrieving Episodes: ', err);
      if (err instanceof Error) throw new Error(err.message);
    }
  };

  findById = async (id: number) => {
    try {
      const episode = await Episode.findByPk(id, {
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
      return episode;
    } catch (err) {
      console.log('>> Error while finding Episode: ', err);
      if (err instanceof Error) throw new Error(err.message);
    }
  };

  addCharacter = async (episodeId: number, characterId: number) => {
    return Episode.findByPk(episodeId)
      .then((episode) => {
        if (!episode) {
          console.log('Episode not found!');
          return null;
        }
        return Character.findByPk(characterId).then((character) => {
          if (!character) {
            console.log('Character not found!');
            return null;
          }

          episode.addCharacter(character).then(() => {
            console.log(`>> added Character id=${character.id} to Episode id=${episode.id}`);
            return episode;
          });
        });
      })
      .catch((err) => {
        console.log('>> Error while adding Character to Episode: ', err);
        if (err instanceof Error) throw new Error(err.message);
      });
  };
}

export default new EpisodeService();
