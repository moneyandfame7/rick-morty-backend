import Character from '../../database/models/character.js';
import Location from '../../database/models/location.js';
class LocationService {
    async create(episode) {
        return await Location.create(episode);
    }
    async findAllByCharacterId(id) {
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
    async findAll(options) {
        return await Location.findAndCountAll({
            ...options,
            distinct: true,
            include: [
                {
                    model: Character,
                    as: 'residents',
                    attributes: ['name'],
                },
            ],
        });
    }
    async findById(id) {
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
