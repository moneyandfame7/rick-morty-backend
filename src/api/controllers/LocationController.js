const { v4: uuidv4 } = require('uuid');

class LocationController {
  async create(req, res) {
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
}

module.exports = new LocationController();
