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

interface ICharacterObj {
  name: string;
  created_at: Date;
  status: string;
  species: string;
  type: string;
  OriginId: number | undefined;
  LocationId: number | undefined;
  gender: string;
  image: string;
  url: string;
}

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
        const _locations = await Location.bulkCreate(locationsObj);
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
        const _episodes = await Episode.bulkCreate(episodesObj);

        const characterObj: ICharacterObj[] = [];
        const responseCharacter = await fetchData<ICharacter>('https://rickandmortyapi.com/api/character');
        responseCharacter.map((character) => {
          characterObj.push({
            name: character.name,
            gender: character.gender,
            status: character.status,
            image: character.image,
            species: character.species,
            OriginId: getIdFromUrl(character.origin.url),
            LocationId: getIdFromUrl(character.location.url),
            type: character.type,
            created_at: new Date(),
            url: character.url,
          });
        });

        await Character.bulkCreate(characterObj);

        for (let i = 0; i < responseEpisode.length; i++) {
          for (let j = 0; j < responseEpisode[i].characters.length; j++) {
            const characterId = getIdFromUrl(responseEpisode[i].characters[j]);
            await EpisodeService.addCharacter(_episodes[i].id, characterId);
          }
        }
      } catch (error) {
        console.log('>> Error while filled characters', error);
      }
    }),

  down: async (queryInterface: QueryInterface): Promise<void> =>
    queryInterface.sequelize.transaction(async (transaction) => {
      try {
        await queryInterface.bulkDelete('CharacterEpisodes', {}, { transaction });
        await queryInterface.bulkDelete('Locations', {}, { transaction });
        await queryInterface.bulkDelete('Episodes', {}, { transaction });
        await queryInterface.bulkDelete('Characters', {}, { transaction });
      } catch (e) {
        console.log(e);
      }
    }),
};
