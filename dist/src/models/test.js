import { DataTypes, Model, Sequelize, } from 'sequelize';
const sequelize = new Sequelize('jdbc:postgresql://localhost:5432/test');
class User extends Model {
    get fullName() {
        return this.name;
    }
}
class Project extends Model {
}
class Address extends Model {
}
Project.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: new DataTypes.STRING(128),
        allowNull: false,
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
}, {
    sequelize,
    tableName: 'projects',
});
User.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: new DataTypes.STRING(128),
        allowNull: false,
    },
    preferredName: {
        type: new DataTypes.STRING(128),
        allowNull: true,
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
}, {
    tableName: 'users',
    sequelize,
});
Address.init({
    address: {
        type: new DataTypes.STRING(128),
        allowNull: false,
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
}, {
    tableName: 'address',
    sequelize,
});
const Note = sequelize.define('Note', {
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    title: {
        type: new DataTypes.STRING(64),
        defaultValue: 'Unnamed Note',
    },
    content: {
        type: new DataTypes.STRING(4096),
        allowNull: false,
    },
}, {
    tableName: 'notes',
});
User.hasMany(Project, {
    sourceKey: 'id',
    foreignKey: 'ownerId',
    as: 'projects',
});
Address.belongsTo(User, { targetKey: 'id' });
User.hasOne(Address, { sourceKey: 'id' });
async function doStuffWithUser() {
    const newUser = await User.create({
        name: 'Johnny',
        preferredName: 'John',
    });
    console.log(newUser.id, newUser.name, newUser.preferredName);
    const project = await newUser.createProject({
        name: 'first!',
    });
    const ourUser = await User.findByPk(1, {
        include: [User.associations.projects],
        rejectOnEmpty: true,
    });
    console.log(ourUser.projects[0].name);
}
(async () => {
    await sequelize.sync();
    await doStuffWithUser();
})();
//# sourceMappingURL=test.js.map