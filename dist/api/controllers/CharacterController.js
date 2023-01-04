import { v4 as uuidv4 } from 'uuid';
class CharacterController {
    async create(req, res) {
        const data = req.body;
        try {
            if (!data) {
                res.json({ error: 'Not found data' });
            }
            else {
                res.json({
                    data: { ...data },
                    created: new Date(),
                    id: uuidv4(),
                });
            }
        }
        catch (e) {
            res.json({ error: e });
        }
    }
    async get(req, res) {
        try {
            res.json('Characters is empty');
        }
        catch (e) {
            res.json({ error: e });
        }
    }
}
export default new CharacterController();
//# sourceMappingURL=CharacterController.js.map