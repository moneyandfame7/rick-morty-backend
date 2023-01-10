import { Request, Response } from 'express';
import CharacterService from '../services/character-service.js';
import { BadRequestError, InternalError, NotFoundError } from '../api-error.js';
import filterData from '../../utils/generate-options.js';

class CharacterController {
  public async create(req: Request, res: Response) {
    const body = req.body;
    if (body) {
      const character = await CharacterService.create(body);
      if (character) return res.send(character);
      throw new InternalError('Oops! Error while creating character');
    }
    throw new BadRequestError('Data cannot be empty.');
  }

  public async findById(req: Request, res: Response) {
    const id = Number(req.params.id);
    console.log(id);
    if (!id) {
      throw new BadRequestError('Invalid ID.');
    }
    const data = await CharacterService.findById(id);
    if (!data) {
      throw new NotFoundError(`Character with ID ${id} not found`);
    }
    return res.send(data);
  }

  public async findAll(req: Request, res: Response) {
    const options = filterData(req.query as any, 'Character');
    console.log(options);

    const data = await CharacterService.findAll(options);

    if (data) {
      res.send(data);
    } else {
      throw new NotFoundError('Characters not found');
    }
  }
}

export default new CharacterController();
