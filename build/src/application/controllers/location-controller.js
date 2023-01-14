import LocationService from '../services/location-service.js';
import { BadRequestError, InternalError, NotFoundError } from '../api-error.js';
import filterData from '../../utils/generate-options.js';
class LocationController {
    async create(req, res) {
        const body = req.body;
        if (body) {
            const location = await LocationService.create(body);
            if (location)
                return res.send(location);
            throw new InternalError('Oops! Error while creating location.');
        }
        throw new BadRequestError('Data cannot be empty');
    }
    async findAll(req, res) {
        const options = filterData(req.query, 'Location');
        console.log(req.query);
        const locations = await LocationService.findAll(options);
        if (locations) {
            return res.send(locations);
        }
        throw new NotFoundError('Locations not found');
    }
    async findById(req, res) {
        const id = Number(req.params.id);
        const location = await LocationService.findById(id);
        if (location) {
            return res.send(location);
        }
        throw new NotFoundError(`Location with ID ${id} not found`);
    }
    async findByCharacter(req, res) {
        const id = Number(req.query.id);
        if (!id) {
            throw new BadRequestError('Invalid character id.');
        }
        const locations = await LocationService.findAllByCharacterId(id);
        if (locations) {
            return res.send(locations);
        }
        throw new NotFoundError('No Locations with this character id is not found');
    }
}
export default new LocationController();
