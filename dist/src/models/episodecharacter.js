'use strict';
import { DataTypes } from 'sequelize';
import db from './index.js';
import Character from '../models/character.js';
import Episode from './episode.js';
const EpisodeCharacter = db.define('Character', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    character_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Character.tableName,
            key: 'id',
        },
    },
    episode_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Episode.tableName,
            key: 'id',
        },
    },
}, {});
export default EpisodeCharacter;
//# sourceMappingURL=episodecharacter.js.map