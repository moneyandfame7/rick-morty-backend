import { NextFunction, Request, Response } from 'express';
import EpisodeService from '../services/episode-service.js';
import { BadRequestError, InternalError, NotFoundError } from '../api-error.js';

interface IPossibleQueryParams {
  location: string;
  name: string;
  type: string;
  gender: string;
  status: string;
  species: string;
}

const getFiltersFromQuery = (query: IPossibleQueryParams) => {
  //перетворюєш query на конфіг який можна передати в секвалайз ібаний для фільтрації даних

  return {};
};

class EpisodeController {
  async create(req: Request, res: Response) {
    const body = req.body;
    if (body) {
      const episode = await EpisodeService.create(body);
      if (episode) return res.send(episode);
      throw new InternalError('Oops! Error while creating episode.');
    }
    throw new BadRequestError('Data cannot be empty');
  }

  async all(req: Request, res: Response) {
    const episodes = await EpisodeService.findAll();
    if (episodes) {
      return res.send(episodes);
    }
    throw new NotFoundError('Episodes not found');
  }

  async find(req: Request, res: Response) {
    const id = Number(req.params.id);
    if (!id) {
      throw new BadRequestError('Invalid ID.');
    }
    const episode = await EpisodeService.findById(id);
    if (episode) {
      return res.send(episode);
    }
    throw new NotFoundError(`Episode with ID ${id} not found`);
  }

  async byCharacter(req: Request, res: Response, next: NextFunction) {
    const id = Number(req.query.id);
    if (!id) {
      throw new BadRequestError('Invalid ID.');
    }
    const episodes = await EpisodeService.findAllByCharacterId(id);
    if (episodes) {
      return res.send(episodes);
    }
    throw new NotFoundError('No episodes with this character id is not found');
  }

  async addCharacter(req: Request, res: Response, next: NextFunction) {
    const characterId = Number(req.query.character_id);
    const episodeId = Number(req.query.episode_id);
    if (!(characterId && episodeId)) {
      throw new BadRequestError('Invalid character or episode ID.');
    }
    return await EpisodeService.addCharacter(episodeId, characterId);
  }
}

export default new EpisodeController();
