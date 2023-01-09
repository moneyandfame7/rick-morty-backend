import { NextFunction, Request, Response } from 'express';
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

  async byCharacter(req: Request, res: Response, next: NextFunction) {
    console.log(req.query);
    const id = Number(req.query.id);
    if (!id) {
      res.status(404).send({ err: 'Invalid member id' });
    } else {
      try {
        const episodes = await EpisodeService.findAllByCharacterId(id);
        res.status(200).send(episodes);
      } catch (e: any) {
        res.status(400).send({ err: { ...e } });
      }
    }
  }

  byName(req: Request, res: Response) {
    console.log(req.params, 'from by name');
    const name = req.params.name;
    res.status(200).send(name);
  }
}

export default new EpisodeController();
