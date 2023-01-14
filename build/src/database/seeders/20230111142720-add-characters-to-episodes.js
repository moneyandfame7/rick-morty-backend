'use strict';
import Episode from '../models/episode.js';
import EpisodeService from '../../application/services/episode-service.js';
import { fetchData } from '../../utils/fetch-data.js';
import { getIdFromUrl } from '../../utils/getId.js';
export default {
    up: async (queryInterface) => await queryInterface.sequelize.transaction(async (transaction) => {
        try {
            const responseEpisode = await fetchData('https://rickandmortyapi.com/api/episode');
            const _episodes = await Episode.findAll();
            for (let i = 0; i < responseEpisode.length; i++) {
                for (let j = 0; j < responseEpisode[i].characters.length; j++) {
                    const characterId = getIdFromUrl(responseEpisode[i].characters[j]);
                    await EpisodeService.addCharacter(_episodes[i].id, characterId);
                }
            }
            console.log('>> Associations was created successfully!');
        }
        catch (error) {
            console.log('>> Error while added characters to episode', error);
        }
    }),
    down: async (queryInterface) => queryInterface.sequelize.transaction(async (transaction) => {
        try {
            await queryInterface.bulkDelete('CharacterEpisodes', {});
        }
        catch (e) {
            console.log(e);
        }
    }),
};
