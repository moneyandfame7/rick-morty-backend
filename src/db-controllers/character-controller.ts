import Character from '../models/character.js';
import { CreationAttributes } from 'sequelize/types/index.js';
import Episode from '../models/episode.js';

// TODO: зробити замість Characters інше слово для асоціації ( as )
class CharacterDbController {
  create = (character: CreationAttributes<Character>) => {
    return Character.create(character)
      .then((character) => {
        console.log('>> Created Character: ' + JSON.stringify(character, null, 4));
        return character;
      })
      .catch((err) => {
        console.log('>> Error while creating Character: ', err);
      });
  };

  findAll = () => {
    return Character.findAll({
      include: [
        {
          model: Episode,
          attributes: ['id', 'name'],
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
      });
  };

  findById = (id: number) => {
    return Character.findByPk(id, {
      include: [
        {
          model: Episode,
          attributes: ['id', 'name'],
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
      });
  };
}

const characterDbController = new CharacterDbController();

export default characterDbController;
