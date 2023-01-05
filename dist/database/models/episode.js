'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Episode extends Model {
        static associate(models) {
            this.belongsToMany(models.Character, {
                through: models.EpisodeCharacter,
            });
        }
    }
    Episode.init({
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        air_date: {
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
        createdAt: {
            allowNull: false,
            type: DataTypes.DATE,
            defaultValue: new Date(),
        },
        updatedAt: {
            allowNull: false,
            type: DataTypes.DATE,
            defaultValue: new Date(),
        },
    }, {
        sequelize,
        modelName: 'Episode',
        tableName: 'episodes',
        timestamps: false,
        underscored: true,
    });
    return Episode;
};
export {};
//# sourceMappingURL=episode.js.map