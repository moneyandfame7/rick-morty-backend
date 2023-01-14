'use strict';
import Episode from '../models/episode.js';
import { fetchData } from '../../utils/fetch-data.js';
export default {
    up: async (queryInterface) => await queryInterface.sequelize.transaction(async (transaction) => {
        try {
            const episodesObj = [];
            const responseEpisode = await fetchData('https://rickandmortyapi.com/api/episode');
            responseEpisode.map((episode) => {
                episodesObj.push({
                    // characters: episode.characters,
                    // id: episode.id,
                    name: episode.name,
                    air_date: episode.air_date,
                    episode: episode.episode,
                    created_at: new Date(),
                    url: episode.url,
                });
            });
            await Episode.bulkCreate(episodesObj);
            console.log(' >> Episodes was filled successfully! ');
        }
        catch (error) {
            console.log('>> Error while filled episodes', error);
        }
    }),
    down: async (queryInterface) => queryInterface.sequelize.transaction(async (transaction) => {
        try {
            await queryInterface.bulkDelete('Episodes', {});
        }
        catch (e) {
            console.log(e);
        }
    }),
};
