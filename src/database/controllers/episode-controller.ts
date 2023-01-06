import { CreationAttributes } from 'sequelize/types/index.js';
import { Episode as EpisodeType } from 'episode.js';
import Episode from '../models/episode.js';
import Character from '../models/character.js';

class EpisodeDbController {
  create = (episode: CreationAttributes<EpisodeType>) => {
    return Episode.create(episode)
      .then((episode) => {
        console.log('>> Created Episode: ' + JSON.stringify(episode, null, 2));
        return episode;
      })
      .catch((err) => {
        console.log('>> Error while creating Episode: ', err);
      });
  };

  findAll = () => {
    return Episode.findAll({
      include: [
        {
          model: Character,
          as: 'characters',
          attributes: ['name', 'url'],
          // якщо убрати це, то можна побачити проміжну таблицю
          through: {
            attributes: [],
          },
        },
      ],
    })
      .then((episodes) => {
        return episodes;
      })
      .catch((err) => {
        console.log('>> Error while retrieving Episodes: ', err);
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
            attributes: ['url'],
          },
        },
      ],
    })
      .then((episode) => {
        return episode;
      })
      .catch((err) => {
        console.log('>> Error while finding Episode: ', err);
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

          episode.addCharacter(character);
          console.log(`>> added Character id=${character.id} to Episode id=${episode.id}`);
          return episode;
        });
      })
      .catch((err) => {
        console.log('>> Error while adding Character to Episode: ', err);
      });
  };
}

const episodeDbController = new EpisodeDbController();
export default episodeDbController;
