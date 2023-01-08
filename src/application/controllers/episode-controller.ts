import { Request, Response } from 'express';
import EpisodeService from '../services/episode-service.js';

class EpisodeController {
  create(req: Request, res: Response) {
    const body = req.body;
    if (body) {
      EpisodeService.create(body)
        .then((episode) => {
          res.status(200).send(episode);
        })
        .catch((e) => {
          res.status(400).send({ err: { ...e } });
        });
    }
  }

  all(req: Request, res: Response) {
    EpisodeService.findAll()
      .then((episodes) => {
        res.status(200).send(episodes);
      })
      .catch((e) => {
        res.status(400).send({ err: { ...e } });
      });
  }

  find(req: Request, res: Response) {
    const id = Number(req.params.id);
    if (id) {
      EpisodeService.findById(id)
        .then((episode) => {
          res.status(200).send(episode);
        })
        .catch((e) => {
          res.status(400).send({ err: { ...e } });
        });
    }
  }

  byCharacter(req: Request, res: Response) {
    EpisodeService.findAllByCharacterId()
      .then((episode) => {
        res.status(200).send(episode);
      })
      .catch((e) => {
        res.status(400).send({ err: { ...e } });
      });
  }
}

export default new EpisodeController();
