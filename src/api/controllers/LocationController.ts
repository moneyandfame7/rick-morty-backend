import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';

class LocationController {
  async create(req: Request, res: Response) {
    try {
      const data = req.body;

      res.json({
        data: { ...data },
        created: new Date(),
        id: uuidv4(),
      });
    } catch (e) {
      res.json({ error: e });
    }
  }

  get(req: Request, res: Response) {
    res.send({ message: 'Emptyy-y-y-y--y-y' });
  }
}

export default new LocationController();
