'use strict';
import Location from '../models/location.js';
import { fetchData } from '../../utils/fetch-data.js';
export default {
    up: async (queryInterface) => await queryInterface.sequelize.transaction(async (transaction) => {
        try {
            const locationsObj = [];
            const responseLocation = await fetchData('https://rickandmortyapi.com/api/location');
            responseLocation.map((location) => {
                locationsObj.push({
                    name: location.name,
                    type: location.type,
                    dimension: location.dimension,
                    created_at: new Date(),
                });
            });
            await Location.bulkCreate(locationsObj);
            console.log(' >> Locations was filled successfully! ');
        }
        catch (error) {
            console.log('>> Error while filled locations', error);
        }
    }),
    down: async (queryInterface) => queryInterface.sequelize.transaction(async (transaction) => {
        try {
            await queryInterface.bulkDelete('Locations', {});
        }
        catch (e) {
            console.log(e);
        }
    }),
};
