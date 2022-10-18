const sequelize = require('sequelize');
const database = require('../db.js');
const Agenda = require('./agenda.js');

class Instituicao extends sequelize.Model { }


Instituicao.init(
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
        cnpj:
        {
            type: sequelize.STRING,
            allowNull: false,
        },
        endereco:
        {
            type: sequelize.STRING,
            allowNull: false,
        },
        telefone:
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

Agenda.belongsTo(Instituicao, {
    constraints: true,
    foreignKey: 'idInstituicao',
})

Instituicao.hasMany(Agenda, {
    constraints: true,
    foreignKey: 'idInstituicao',
})

module.exports = Instituicao;