import { Request, Response } from 'express';
import LocationService from '../services/location-service.js';
import { BadRequestError, InternalError, NotFoundError } from '../api-error.js';

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

  async all(req: Request, res: Response) {
    const locations = await LocationService.findAll();
    if (locations) {
      return res.send(locations);
    }
    throw new NotFoundError('Locations not found');
  }

  async find(req: Request, res: Response) {
    const id = Number(req.params.id);

    const location = await LocationService.findById(id);
    if (location) {
      return res.send(location);
    }
    throw new NotFoundError(`Location with ID ${id} not found`);
  }

  async byCharacter(req: Request, res: Response) {
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
