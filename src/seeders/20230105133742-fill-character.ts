'use strict';

import { QueryInterface } from 'sequelize';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface: QueryInterface) =>
    await queryInterface.bulkInsert(
      'Characters',
      [
        {
          name: 'John Doe',
          isBetaMember: false,
        },
      ],
      {}
    ),

  // down: async (queryInterface: QueryInterface) => {
  //   await queryInterface.bulkDelete('Characters', null, {});
  // },
};
