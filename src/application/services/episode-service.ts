import { CreationAttributes } from 'sequelize/types/index.js';
import { Episode as EpisodeType } from '../../types/episode.js';
import Episode from '../../database/models/episode.js';
import Character from '../../database/models/character.js';

class EpisodeService {
  create = (episode: CreationAttributes<EpisodeType>) => {
    return Episode.create(episode)
      .then((episode) => {
        console.log('>> Created Episode: ' + JSON.stringify(episode, null, 2));
        return episode;
      })
      .catch((err) => {
        console.log('>> Error while creating Episode: ', err);
        throw new Error(err);
      });
  };

  findAll = () => {
    return Episode.findAll({
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
    })
      .then((episodes) => {
        return episodes;
      })
      .catch((err) => {
        console.log('>> Error while retrieving Episodes: ', err);
        throw new Error(err);
      });
  };

  findById = (id: number) => {
    return Episode.findByPk(id, {
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
    })
      .then((episode) => {
        return episode;
      })
      .catch((err) => {
        console.log('>> Error while finding Episode: ', err);
        throw new Error(err);
      });
  };

  addCharacter = (episodeId: number, characterId: number) => {
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
        throw new Error(err);
      });
  };
}

export default new EpisodeService();
