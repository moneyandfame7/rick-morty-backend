'use strict';
import Character from '../models/character.js';
import { fetchData } from '../../utils/fetch-data.js';
import { getIdFromUrl } from '../../utils/getId.js';
export default {
    up: async (queryInterface) => await queryInterface.sequelize.transaction(async (transaction) => {
        try {
            const characterObj = [];
            const responseCharacter = await fetchData('https://rickandmortyapi.com/api/character');
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
            console.log('>> Characters was filled successfully!');
        }
        catch (error) {
            console.log('>> Error while filled characters', error);
        }
    }),
    down: async (queryInterface) => queryInterface.sequelize.transaction(async (transaction) => {
        try {
            await queryInterface.bulkDelete('Characters', {});
        }
        catch (e) {
            console.log(e);
        }
    }),
};
