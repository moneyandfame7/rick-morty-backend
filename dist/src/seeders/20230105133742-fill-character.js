'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    up: async (queryInterface) => await queryInterface.bulkInsert('Characters', [
        {
            name: 'John Doe',
            isBetaMember: false,
        },
    ], {}),
    // down: async (queryInterface: QueryInterface) => {
    //   await queryInterface.bulkDelete('Characters', null, {});
    // },
};
export {};
