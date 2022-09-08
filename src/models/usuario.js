const sequelize = require('sequelize');
const database = require('../db');
const shema = "";

class Usuario extends sequelize.Model { }


Usuario.init(
    {
        id_usuario:
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
        },
        email:
        {
            type: sequelize.STRING,
            allowNull: false,
        },
        senha:
        {
            type: sequelize.STRING,
            allowNull: false,
        },
    },
    {
        sequelize: database, modelName: 'usuarios', shema
    }
)

module.exports = Usuario;