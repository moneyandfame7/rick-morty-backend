import { NextFunction, Request, Response } from 'express';
import EpisodeService from '../services/episode-service.js';

class EpisodeController {
  async create(req: Request, res: Response) {
    const body = req.body;
    if (!body) {
      return res.status(404).send({ error: 'Data for creating not found.' });
    }
    try {
      const episode = await EpisodeService.create(body);
      return res.status(200).send(episode);
    } catch (e) {
      return res.status(500).send({ error: e });
    }
  }

  async all(req: Request, res: Response) {
    try {
      const episodes = await EpisodeService.findAll();
      if (!episodes) {
        return res.status(404).send('Episodes not found.');
      }
      return res.status(200).send(episodes);
    } catch (e) {
      return res.status(500).send({ err: e });
    }
  }

  async find(req: Request, res: Response) {
    const id = Number(req.params.id);
    if (!id) {
      return res.status(404).send({ err: 'Invalid episode id' });
    }
    try {
      const episode = await EpisodeService.findById(id);
      if (episode) {
        return res.status(200).send(episode);
      }
      return res.status(404).send({ error: 'No episodes found with this ID.' });
    } catch (e) {
      res.status(404).send({ error: e });
    }
  }

  async byCharacter(req: Request, res: Response, next: NextFunction) {
    const id = Number(req.query.id);
    if (!id) {
      return res.status(404).send({ err: 'Invalid member id' });
    }
    try {
      const episodes = await EpisodeService.findAllByCharacterId(id);
      res.status(200).send(episodes);
    } catch (e: any) {
      res.status(400).send({ err: { ...e } });
    }
  }

  byName(req: Request, res: Response) {
    console.log(req.params, 'from by name');
    const name = req.params.name;
    res.status(200).send(name);
  }
}

export default new EpisodeController();
