const sequelize = require('sequelize');
const database = require('../db.js');

class Instituicao extends sequelize.Model { }


Instituicao.init(
    {
        id_instituicoes:
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
        cnpj:
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
        sequelize: database, modelName: 'instituicoes'
    }
)

module.exports = Instituicao;