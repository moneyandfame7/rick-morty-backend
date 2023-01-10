'use strict';
import { QueryInterface } from 'sequelize';
import { fetchData } from '../../utils/fetch-data.js';
import { ICharacter, IEpisode } from '../../types/response.js';
import Character from '../models/character.js';
import Episode from '../models/episode.js';
import { getIdFromUrl } from '../../utils/getId.js';
import EpisodeService from '../../application/services/episode-service.js';

export default {
  up: async (queryInterface: QueryInterface): Promise<void> =>
    await queryInterface.sequelize.transaction(async (transaction) => {
      try {
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
          gender: string;
          image: string;
          url: string;
        }

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
        await queryInterface.bulkDelete('EpisodeCharacters', {}, { transaction });
        await queryInterface.bulkDelete('Episodes', {}, { transaction });
        await queryInterface.bulkDelete('Characters', {}, { transaction });
      } catch (e) {
        console.log(e);
      }
    }),
};
