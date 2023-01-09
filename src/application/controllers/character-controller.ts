import { NextFunction, Request, Response } from 'express';
import CharacterService from '../services/character-service.js';
import ApiError from '../handlers/error.js';
import error from '../handlers/error.js';

class CharacterController {
  async create(req: Request, res: Response) {
    const body = req.body;
    try {
      if (body) {
        const character = await CharacterService.create(body);
        res.status(200).send(character);
      }
      return res.status(500).send({ error: 'Body could not be undefined' });
    } catch (e) {
      res.status(500).send({ error: 'Error creating character.' });
    }
  }

  async all(req: Request, res: Response) {
    try {
      const characters = await CharacterService.findAll();
      return res.status(200).send(characters);
    } catch (e) {
      res.status(500).send({ error: 'Error find characters.' });
    }
  }

  async find(req: Request, res: Response, next: NextFunction) {
    const id = Number(req.params.id);
    if (!id) {
      return res.status(404).send({ error: 'Invalid character id.' });
    }
    try {
      const character = await CharacterService.findById(id);
      if (character) {
        return res.status(200).send(character);
      }
      return res.status(500).send({ error: 'No character found with this ID.' });
    } catch (e: any) {
      return res.status(500).send({ error: 'Error find character' });
    }
  }
}

export default new CharacterController();
