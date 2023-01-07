'use strict';

import { QueryInterface } from 'sequelize';
import { CreationAttributes } from 'sequelize/types/index.js';
import { Episode as EpisodeType } from '../../types/episode.js';
import Episode from '../models/episode.js';
import { fetchData } from '../../utils/fetch-data.js';
import { IEpisode } from '../../types/response.js';

export default {
  up: async (queryInterface: QueryInterface): Promise<void> =>
    await queryInterface.sequelize.transaction(async (transaction) => {
      try {
        let episodesObj: any = [];
        const responseEpisode = await fetchData<IEpisode>('https://rickandmortyapi.com/api/episode');

        responseEpisode.map((episode) => {
          episodesObj.push({
            characters: episode.characters,
            id: episode.id,
            name: episode.name,
            air_date: episode.air_date,
            episode: episode.episode,
            created_at: new Date(),
            url: `${process.env.BASE_URL}/episodes/${episode.id}`,
          });
        });

        const episodes: EpisodeType[] = await Episode.bulkCreate<EpisodeType>(episodesObj, { transaction });

        episodes.map((episode) => {
          episode.addCharacter;
        });
        // потім запіхнути episodes к characters
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
