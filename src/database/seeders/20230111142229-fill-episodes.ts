'use strict';
import { QueryInterface } from 'sequelize';
import { fetchData } from '../../utils/fetch-data.js';
import { ICharacter, IEpisode, ILocation } from '../../types/response.js';
import Character from '../models/character.js';
import Episode from '../models/episode.js';
import { getIdFromUrl } from '../../utils/getId.js';
import EpisodeService from '../../application/services/episode-service.js';
import Location from '../models/location.js';

interface IEpisodeObj {
  name: string;
  air_date: string;
  episode: string;
  created_at: Date;
  url: string;
}

export default {
  up: async (queryInterface: QueryInterface): Promise<void> =>
    await queryInterface.sequelize.transaction(async (transaction) => {
      try {
        const episodesObj: IEpisodeObj[] = [];
        const responseEpisode = await fetchData<IEpisode>('https://rickandmortyapi.com/api/episode');
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
        await Episode.bulkCreate(episodesObj, { transaction });
      } catch (error) {
        console.log('>> Error while filled episodes', error);
      }
    }),

  down: async (queryInterface: QueryInterface): Promise<void> =>
    queryInterface.sequelize.transaction(async (transaction) => {
      try {
        await queryInterface.bulkDelete('Episodes', {}, { transaction });
      } catch (e) {
        console.log(e);
      }
    }),
};
