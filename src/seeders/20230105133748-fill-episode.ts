'use strict';

import { QueryInterface } from 'sequelize';
import { CreationAttributes } from 'sequelize/types/index.js';
import { Episode as EpisodeType } from '../../types/episode.js';
import Episode from '../models/episode.js';

/** @type {import('sequelize-cli').Migration} */
export default {
  up: async (queryInterface: QueryInterface): Promise<void> =>
    await queryInterface.sequelize.transaction(async (transaction) => {
      try {
        const episodesObj: CreationAttributes<EpisodeType>[] = [
          {
            name: 'Rick Potion #9',
            air_date: 'January 27, 2014',
            episode: 'S01E06',
            url: 'https://rickandmortyapi.com/api/episode/6',
            created_at: new Date(),
          },
          {
            name: 'Anatomy Park',
            air_date: 'December 16, 2013',
            episode: 'S01E03',
            url: 'https://rickandmortyapi.com/api/episode/3',
            created_at: new Date(),
          },
          {
            name: 'Close Rick-counters of the Rick Kind',
            air_date: 'April 7, 2014',
            episode: 'S01E10',
            url: 'https://rickandmortyapi.com/api/episode/10',
            created_at: new Date(),
          },
          {
            id: 15,
            name: 'Total Rickall',
            air_date: 'August 16, 2015',
            episode: 'S02E04',
            url: 'https://rickandmortyapi.com/api/episode/15',
            created_at: new Date(),
          },
        ];

        const episodes: EpisodeType[] = await Episode.bulkCreate<EpisodeType>(episodesObj, { transaction });
      } catch (e) {
        console.log(e);
      }
    }),

  down: async (queryInterface: QueryInterface): Promise<void> =>
    queryInterface.sequelize.transaction(async (transaction) => {
      try {
        await queryInterface.bulkDelete('Episodes', {}, {});
      } catch (e) {
        console.log(e);
      }
    }),
};
