import { Request, Response } from 'express';
import LocationService from '../services/location-service';
import { BadRequestError, InternalError, NotFoundError } from '../api-error';
import filterData from '../../utils/generate-options';

class LocationController {
  async create(req: Request, res: Response) {
    const body = req.body;
    if (body) {
      const location = await LocationService.create(body);
      if (location) return res.send(location);
      throw new InternalError('Oops! Error while creating location.');
    }
    throw new BadRequestError('Data cannot be empty');
  }

  async findAll(req: Request, res: Response) {
    const options = filterData(req.query as any, 'Location');
    console.log(req.query);
    const locations = await LocationService.findAll(options);
    if (locations) {
      return res.send(locations);
    }
    throw new NotFoundError('Locations not found');
  }

  async findById(req: Request, res: Response) {
    const id = Number(req.params.id);

    const location = await LocationService.findById(id);
    if (location) {
      return res.send(location);
    }
    throw new NotFoundError(`Location with ID ${id} not found`);
  }

  async findByCharacter(req: Request, res: Response) {
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
