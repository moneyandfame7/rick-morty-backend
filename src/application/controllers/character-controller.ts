import { NextFunction, Request, Response } from 'express';
import CharacterService from '../services/character-service.js';
import { BadRequestError, InternalError, NotFoundError } from '../api-error.js';
import _ from 'lodash';

interface BasicFilters {
  id: number;
  name: string;
}

interface CharactersFilters {
  status: string;
  species: string;
  type: string;
  gender: string;
}

interface EpisodeFilters {
  episode: string;
  characters: Array<string> | string;
}

type PossibleOptions = BasicFilters & CharactersFilters & EpisodeFilters;
const filterData = (options: PossibleOptions, model: string) => {
  const basic = {
    id: options.id,
    name: options.name,
  };
  switch (model) {
    case 'Character':
      return {
        where: _.omitBy(
          {
            ...basic,
            status: options.status,
            species: options.species,
            type: options.type,
            gender: options.gender,
          },
          _.isNil
        ),
      };
    case 'Episode':
      return {
        where: _.omitBy({
          ...basic,
          episode: options.episode,
        }),
      };
  }
};

class CharacterController {
  async create(req: Request, res: Response) {
    const body = req.body;
    if (body) {
      const character = await CharacterService.create(body);
      if (character) return res.send(character);
      throw new InternalError('Oops! Error while creating character');
    }
    throw new BadRequestError('Data cannot be empty.');
  }

  async all(req: Request, res: Response) {
    const filters = filterData(req.query as any, 'Character');
    console.log(filters);

    const characters = await CharacterService.findAll(filters);
    if (characters) {
      return res.send(characters);
    }
    throw new NotFoundError('Characters not found');
  }

  async find(req: Request, res: Response, next: NextFunction) {
    const id = Number(req.params.id);
    if (!id) {
      throw new BadRequestError('Invalid ID.');
    }
    const character = await CharacterService.findById(id);
    if (character) {
      return res.send(character);
    }
    throw new NotFoundError(`Character with ID ${id} not found`);
  }
}

export default new CharacterController();
