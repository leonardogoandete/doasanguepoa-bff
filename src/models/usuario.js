const sequelize = require('sequelize');
const database = require('../db.js');

class Usuario extends sequelize.Model { }


Usuario.init(
    {
        id:
        {
            type: sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        nome:
        {
            type: sequelize.STRING,
            allowNull: true,
        },
        cpf:
        {
            type: sequelize.STRING,
            allowNull: false,
            unique: true,
        },
        email:
        {
            type: sequelize.STRING,
            allowNull: false,
            isEmail: true,
            unique: true,
        },
        senha:
        {
            type: sequelize.STRING,
            allowNull: false,
        },
    },
    {
        sequelize: database, modelName: 'usuarios'
    }
)

module.exports = Usuario;