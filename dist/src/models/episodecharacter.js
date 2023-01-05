'use strict';
import { DataTypes } from 'sequelize';
import db from './index.js';
const EpisodeCharacter = db.define('EpisodeCharacter', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    character_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Character',
            key: 'id',
        },
    },
    episode_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Episode',
            key: 'id',
        },
    },
}, {
    tableName: 'EpisodeCharacters',
});
export default EpisodeCharacter;
//# sourceMappingURL=episodecharacter.js.map