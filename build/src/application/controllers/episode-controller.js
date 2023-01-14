import EpisodeService from '../services/episode-service.js';
import { BadRequestError, InternalError, NotFoundError } from '../api-error.js';
class EpisodeController {
    async create(req, res) {
        const body = req.body;
        if (body) {
            const episode = await EpisodeService.create(body);
            if (episode)
                return res.send(episode);
            throw new InternalError('Oops! Error while creating episode.');
        }
        throw new BadRequestError('Data cannot be empty');
    }
    async findById(req, res) {
        const id = Number(req.params.id);
        const episode = await EpisodeService.findById(id);
        if (episode) {
            return res.send(episode);
        }
        throw new NotFoundError(`Episode with ID ${id} not found`);
    }
    async findAll(req, res) {
        const episodes = await EpisodeService.findAll();
        if (episodes) {
            return res.send(episodes);
        }
        throw new NotFoundError('Episodes not found');
    }
    async findByCharacter(req, res) {
        const id = Number(req.query.id);
        if (!id) {
            throw new BadRequestError('Invalid character id.');
        }
        const episodes = await EpisodeService.findAllByCharacterId(id);
        if (episodes) {
            return res.send(episodes);
        }
        throw new NotFoundError('No episodes with this character id is not found');
    }
}
export default new EpisodeController();
