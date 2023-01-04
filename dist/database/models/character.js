'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Character extends Model {
        static associate(models) {
        }
    }
    Character.init({
        name: DataTypes.STRING,
        status: DataTypes.STRING,
        gender: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'Character',
        underscored: true,
    });
    return Character;
};
export {};
//# sourceMappingURL=character.js.map