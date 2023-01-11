'use strict';
import { QueryInterface } from 'sequelize';
import Episode from '../models/episode.js';
import EpisodeService from '../../application/services/episode-service.js';
import { IEpisode } from '../../types/response.js';
import { fetchData } from '../../utils/fetch-data.js';
import { getIdFromUrl } from '../../utils/getId.js';

export default {
  up: async (queryInterface: QueryInterface): Promise<void> =>
    await queryInterface.sequelize.transaction(async (transaction) => {
      try {
        const responseEpisode = await fetchData<IEpisode>('https://rickandmortyapi.com/api/episode');
        const _episodes = await Episode.findAll({ transaction });
        for (let i = 0; i < responseEpisode.length; i++) {
          for (let j = 0; j < responseEpisode[i].characters.length; j++) {
            const characterId = getIdFromUrl(responseEpisode[i].characters[j]);
            await EpisodeService.addCharacter(_episodes[i].id, characterId);
          }
        }
        console.log('>> Associations was created successfully!');
      } catch (error) {
        console.log('>> Error while added characters to episode', error);
      }
    }),

  down: async (queryInterface: QueryInterface): Promise<void> =>
    queryInterface.sequelize.transaction(async (transaction) => {
      try {
        await queryInterface.bulkDelete('CharacterEpisodes', {}, { transaction });
      } catch (e) {
        console.log(e);
      }
    }),
};
