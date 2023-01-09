import { Request, Response } from 'express';
import CharacterService from '../services/character-service.js';

class CharacterController {
  async create(req: Request, res: Response) {
    const body = req.body;
    if (body) {
      await CharacterService.create(body)
        .then((character) => {
          res.status(200).send(character);
        })
        .catch((e) => {
          res.status(400).send({ err: { ...e } });
          res.redirect('/error');
        });
    }
  }

  async all(req: Request, res: Response) {
    await CharacterService.findAll()
      .then((characters) => {
        res.status(200).send(characters);
      })
      .catch((e) => {
        res.status(400).send({ err: { ...e } });
      });
  }

  async find(req: Request, res: Response) {
    const id = Number(req.params.id);
    if (id) {
      await CharacterService.findById(id)
        .then((character) => {
          res.status(200).send(character);
        })
        .catch((e) => {
          res.status(400).send({ err: { ...e } });
        });
    }
  }
}

export default new CharacterController();
