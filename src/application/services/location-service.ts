import { CreationAttributes, WhereOptions } from 'sequelize';
import { Location as LocationType } from '../../types/models/location.js';
import Character from '../../database/models/character.js';
import Location from '../../database/models/location.js';

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
    return await Location.findAll({
      ...options,
      include: [
        {
          model: Character,
          as: 'residents',
          attributes: ['name'],
        },
      ],
      nest: false,
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
