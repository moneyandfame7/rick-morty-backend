'use strict';
import { QueryInterface } from 'sequelize';
import { fetchData } from '../../utils/fetch-data.js';
import { ICharacter, IEpisode, ILocation } from '../../types/response.js';
import Character from '../models/character.js';
import Episode from '../models/episode.js';
import { getIdFromUrl } from '../../utils/getId.js';
import EpisodeService from '../../application/services/episode-service.js';
import Location from '../models/location.js';

interface ILocationObj {
  name: string;
  type: string;
  dimension: string;
  created_at: Date;
}

export default {
  up: async (queryInterface: QueryInterface): Promise<void> =>
    await queryInterface.sequelize.transaction(async (transaction) => {
      try {
        const locationsObj: ILocationObj[] = [];
        const responseLocation = await fetchData<ILocation>('https://rickandmortyapi.com/api/location');
        responseLocation.map((location) => {
          locationsObj.push({
            name: location.name,
            type: location.type,
            dimension: location.dimension,
            created_at: new Date(),
          });
        });
        const _locations = await Location.bulkCreate(locationsObj, { transaction });
      } catch (error) {
        console.log('>> Error while filled locations', error);
      }
    }),

  down: async (queryInterface: QueryInterface): Promise<void> =>
    queryInterface.sequelize.transaction(async (transaction) => {
      try {
        await queryInterface.bulkDelete('Locations', {}, { transaction });
      } catch (e) {
        console.log(e);
      }
    }),
};
