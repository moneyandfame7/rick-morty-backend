import { CreationAttributes } from 'sequelize';
import Episode from '../../database/models/episode.js';
import Character from '../../database/models/character.js';

// TODO: зробити замість Characters інше слово для асоціації ( as )
class CharacterService {
  create = (character: CreationAttributes<Character>) => {
    return Character.create(character)
      .then((character) => {
        console.log('>> Created Character: ' + JSON.stringify(character, null, 4));
        return character;
      })
      .catch((err) => {
        console.log('>> Error while creating Character: ', err);
        throw new Error(err);
      });
  };

  findAll = () => {
    return Character.findAll({
      include: [
        {
          model: Episode,
          as: 'episodes',
          attributes: ['url'],
          through: {
            attributes: [],
          },
        },
      ],
    })
      .then((characters) => {
        return characters;
      })
      .catch((err) => {
        console.log('>> Error while retrieving Characters: ', err);
        throw new Error(err);
      });
  };

  findById = (id: number) => {
    return Character.findByPk(id, {
      include: [
        {
          model: Episode,
          as: 'episodes',
          attributes: ['url'],
          through: {
            attributes: [],
          },
        },
      ],
    })
      .then((character) => {
        return character;
      })
      .catch((err) => {
        console.log('>> Error while finding Character: ', err);
        throw new Error(err);
      });
  };

  addEpisode = (characterid: number, episodeId: number) => {};
}

export default new CharacterService();
