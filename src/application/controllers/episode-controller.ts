import { Request, Response } from 'express';
import EpisodeService from '../services/episode-service.js';

class EpisodeController {
  async create(req: Request, res: Response) {
    const body = req.body;
    if (body) {
      await EpisodeService.create(body)
        .then((episode) => {
          res.status(200).send(episode);
        })
        .catch((e) => {
          res.status(400).send({ err: { ...e } });
        });
    }
  }

  async all(req: Request, res: Response) {
    await EpisodeService.findAll()
      .then((episodes) => {
        res.status(200).send(episodes);
      })
      .catch((e) => {
        res.status(400).send({ err: { ...e } });
      });
  }

  async find(req: Request, res: Response) {
    const id = Number(req.params.id);
    if (id) {
      await EpisodeService.findById(id)
        .then((episode) => {
          res.status(200).send(episode);
        })
        .catch((e) => {
          res.status(400).send({ err: { ...e } });
        });
    }
  }
}

export default new EpisodeController();
