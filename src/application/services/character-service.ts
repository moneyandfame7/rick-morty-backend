import { WhereOptions } from 'sequelize';
import Episode from '../../database/models/episode.js';
import { Character as CharacterType } from '../../types/models/character.js';
import Character from '../../database/models/character.js';
import { MakeNullishOptional } from 'sequelize/types/utils.js';
import Location from '../../database/models/location.js';

class CharacterService {
  async create(character: MakeNullishOptional<CharacterType['_creationAttributes']>) {
    return await Character.create(character);
  }

  async findAll(options?: WhereOptions) {
    return Character.findAll({
      ...options,
      include: [
        {
          model: Episode,
          as: 'episodes',
          attributes: ['name'],
          through: {
            attributes: [],
          },
        },
        {
          model: Location,
          as: 'origin',
        },
        {
          model: Location,
          as: 'location',
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
      attributes: {
        exclude: ['OriginId', 'LocationId'],
      },
      include: [
        {
          model: Episode,
          as: 'episodes',
          attributes: ['name'],
          through: {
            attributes: [],
          },
        },
      ],
    });
  }

  async findAllByEpisode(id: number) {
    return await Character.findAll({
      include: {
        model: Episode,
        as: 'episodes',
        where: {
          id: id,
        },
        attributes: ['id'],
      },
    });
  }
}

export default new CharacterService();
