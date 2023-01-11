'use strict';
import { QueryInterface } from 'sequelize';
import Character from '../models/character.js';
import { ICharacter } from '../../types/response.js';
import { fetchData } from '../../utils/fetch-data.js';
import { getIdFromUrl } from '../../utils/getId.js';

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

export default {
  up: async (queryInterface: QueryInterface): Promise<void> =>
    await queryInterface.sequelize.transaction(async (transaction) => {
      try {
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

        await Character.bulkCreate(characterObj, { transaction });
        console.log('>> Characters was filled successfully!');
      } catch (error) {
        console.log('>> Error while filled characters', error);
      }
    }),

  down: async (queryInterface: QueryInterface): Promise<void> =>
    queryInterface.sequelize.transaction(async (transaction) => {
      try {
        await queryInterface.bulkDelete('Characters', {}, { transaction });
      } catch (e) {
        console.log(e);
      }
    }),
};
