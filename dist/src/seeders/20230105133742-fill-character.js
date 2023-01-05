'use strict';
module.exports = {
    up: async (queryInterface) => await queryInterface.bulkInsert('Characters', [
        {
            name: 'John Doe',
            isBetaMember: false,
        },
    ], {}),
};
export {};
//# sourceMappingURL=20230105133742-fill-character.js.map