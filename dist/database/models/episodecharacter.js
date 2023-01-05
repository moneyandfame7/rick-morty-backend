'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class EpisodeCharacter extends Model {
        static associate(models) {
        }
    }
    EpisodeCharacter.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        episode_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        character_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    }, {
        sequelize,
        modelName: 'EpisodeCharacter',
        tableName: 'episode_characters',
        timestamps: false,
        underscored: true,
    });
    return EpisodeCharacter;
};
export {};
//# sourceMappingURL=episodecharacter.js.map