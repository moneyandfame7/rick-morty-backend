import { v4 as uuidv4 } from 'uuid';
class LocationController {
    async create(req, res) {
        try {
            const data = req.body;
            res.json({
                data: { ...data },
                created: new Date(),
                id: uuidv4(),
            });
        }
        catch (e) {
            res.json({ error: e });
        }
    }
}
export default new LocationController();
//# sourceMappingURL=LocationController.js.map