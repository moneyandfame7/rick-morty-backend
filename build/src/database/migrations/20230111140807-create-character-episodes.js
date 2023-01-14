import { DataTypes } from 'sequelize';
module.exports = {
    up: async (queryInterface) => await queryInterface.sequelize.transaction(async (transaction) => {
        await queryInterface.createTable('CharacterEpisodes', {
            CharacterId: { type: DataTypes.INTEGER, allowNull: false, references: { key: 'id', model: 'Characters' } },
            EpisodeId: { type: DataTypes.INTEGER, allowNull: false, references: { key: 'id', model: 'Episodes' } },
            createdAt: { type: DataTypes.DATE, allowNull: false, defaultValue: new Date() },
            updatedAt: { type: DataTypes.DATE, allowNull: false, defaultValue: new Date() },
        });
        console.log('>> Table «CharacterEpisodes» was created successfully <<');
    }),
    down: async (queryInterface) => await queryInterface.sequelize.transaction(async (transaction) => {
        await queryInterface.dropTable('CharacterEpisodes', { cascade: true });
        console.log('>> Table «CharacterEpisodes» was dropped successfully <<');
    }),
};
