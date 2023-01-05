import { v4 as uuidv4 } from 'uuid';
class EpisodeController {
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
export default new EpisodeController();
//# sourceMappingURL=EpisodeController.js.map