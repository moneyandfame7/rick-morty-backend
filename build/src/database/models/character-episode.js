'use strict';
import { DataTypes } from 'sequelize';
import db from './index.js';
const CharacterEpisode = db.define('CharacterEpisode', {
    CharacterId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Characters',
            key: 'id',
        },
    },
    EpisodeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Episodes',
            key: 'id',
        },
    },
}, {
    timestamps: true,
    tableName: 'CharacterEpisodes',
});
export default CharacterEpisode;
