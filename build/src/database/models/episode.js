'use strict';
import { DataTypes } from 'sequelize';
import db from './index.js';
const Episode = db.define('Episode', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    episode: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    air_date: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: new Date(),
    },
}, {
    timestamps: false,
    tableName: 'Episodes',
    modelName: 'Episode',
});
export default Episode;
