import { CreationAttributes, WhereOptions } from 'sequelize';
import { Location as LocationType } from '../../types/models/location';
import Character from '../../database/models/character';
import Location from '../../database/models/location';

class LocationService {
  async create(episode: CreationAttributes<LocationType>) {
    return await Location.create(episode);
  }

  async findAllByCharacterId(id: number) {
    return await Location.findAll({
      include: {
        model: Character,
        as: 'residents',
        where: {
          id: id,
        },
        attributes: ['name'],
      },
    });
  }

  //   order: [['id', 'ASC']],

  async findAll(options?: WhereOptions) {
    return await Location.findAndCountAll({
      ...options,
      distinct: true, // рахує кількість без вкладених моделей
      include: [
        {
          model: Character,
          as: 'residents',
          attributes: ['name'],
        },
      ],
    });
  }

  async findById(id: number) {
    return await Location.findByPk(id, {
      include: [
        {
          model: Character,
          as: 'residents',
          attributes: ['name'],
        },
      ],
    });
  }
}

export default new LocationService();
