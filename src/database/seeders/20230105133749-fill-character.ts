'use strict';

import { QueryInterface } from 'sequelize';
import { CreationAttributes } from 'sequelize/types/index.js';
import { Character as CharacterType } from 'character.js';
import Character from '../models/character.js';

/** @type {import('sequelize-cli').Migration} */
export default {
  up: async (queryInterface: QueryInterface): Promise<void> =>
    await queryInterface.sequelize.transaction(async (transaction) => {
      try {
        const rickCharacter = await Character.create({
          name: 'Rick Sanchez',
          status: 'Alive',
          species: 'Human',
          type: '',
          gender: 'Male',
          image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
          url: `${process.env.BASE_URL}/characters/1`,
        });

        // const charactersObj: CreationAttributes<CharacterType>[] = [
        //   {
        //     name: 'Rick Sanchez',
        //     status: 'Alive',
        //     species: 'Human',
        //     type: '',
        //     gender: 'Male',
        //     image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
        //     url: `${process.env.BASE_URL}/characters/1`,
        //   },
        //   {
        //     name: 'Jennifer',
        //     status: 'Alive',
        //     species: 'Human',
        //     type: '',
        //     gender: 'Female',
        //     image: 'https://rickandmortyapi.com/api/character/avatar/2.jpeg',
        //     url: `${process.env.BASE_URL}/characters/2`,
        //   },
        //   {
        //     name: 'Morty',
        //     status: 'Alive',
        //     species: 'Human',
        //     type: '',
        //     gender: 'Male',
        //     image: 'https://rickandmortyapi.com/api/character/avatar/3.jpeg',
        //     url: `${process.env.BASE_URL}/characters/3`,
        //   },
        // ];

        // const characters: CharacterType[] = await Character.bulkCreate<CharacterType>(charactersObj, { transaction });
      } catch (e) {
        console.log(e);
      }
    }),

  down: async (queryInterface: QueryInterface): Promise<void> =>
    queryInterface.sequelize.transaction(async (transaction) => {
      try {
        await queryInterface.bulkDelete('Characters', {}, {});
      } catch (e) {
        console.log(e);
      }
    }),
};
