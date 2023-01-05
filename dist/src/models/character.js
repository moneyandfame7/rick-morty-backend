'use strict';
import { DataTypes } from 'sequelize';
import db from './index.js';
import EpisodeCharacter from './episodecharacter.js';
import Episode from './episode.js';
const Character = db.define('Character', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: false,
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    species: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    gender: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    url: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    image: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: new Date(),
    },
}, {});
Character.belongsToMany(Episode, { through: EpisodeCharacter });
export default Character;
//# sourceMappingURL=character.js.map