import sequelize, { WhereOptions } from 'sequelize';
import Episode from '../../database/models/episode.js';
import { Character as CharacterType } from '../../types/models/character.js';
import Character from '../../database/models/character.js';
import { MakeNullishOptional } from 'sequelize/types/utils.js';

class CharacterService {
  async create(character: MakeNullishOptional<CharacterType['_creationAttributes']>) {
    return await Character.create(character);
  }

  async findAll(options?: WhereOptions) {
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
      });
    // return await Character.findAll({
    //   // attributes: {
    //   //   include: [[sequelize.col('episodes.url'), 'first_seen_in']],
    //   // },
    //   ...options,
    //   // подивиться міксини, мб там щось є
    //   include: [
    //     {
    //       model: Episode,
    //       as: 'episodes',
    //       attributes: ['url'],
    //       through: {
    //         attributes: [],
    //       },
    //     },
    //   ],
    //   // сортування з кінця DESC
    //   // з початку ASC
    //   order: [['id', 'ASC']],
    // });
  }

  async findById(id: number) {
    return await Character.findByPk(id, {
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
    });
  }
}

export default new CharacterService();
