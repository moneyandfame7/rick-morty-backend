'use strict';
import { DataTypes } from 'sequelize';
import Character from './character.js';
import db from './index.js';
import EpisodeCharacter from './episodecharacter.js';
const Episode = db.define('Episode', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    episode: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    url: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: new Date(),
    },
}, {
    tableName: 'Episode',
    modelName: 'Episode',
});
Episode.belongsToMany(Character, { through: EpisodeCharacter });
export default Episode;
//# sourceMappingURL=episode.js.map