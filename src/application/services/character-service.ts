import sequelize, { CreationAttributes, WhereOptions } from 'sequelize';
import Episode from '../../database/models/episode.js';
import Character from '../../database/models/character.js';

class CharacterService {
  async create(character: CreationAttributes<Character>) {
    return await Character.create(character);
  }

  async findAll(options?: WhereOptions) {
    return await Character.findAll({
      attributes: {
        include: [[sequelize.col('episodes.url'), 'first_seen_in']],
      },
      ...options,
      // todo добавлять строку уже к усществующей таблице возможно но тогда єто хуйня будет ккаято
      // подивиться міксини, мб там щось є
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
      // сортування з кінця DESC
      // з початку ASC
      order: [['id', 'ASC']],
    });
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
