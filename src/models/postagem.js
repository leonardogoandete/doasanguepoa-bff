const sequelize = require('sequelize');
const database = require('../db.js');
const Instituicao = require('./instituicoes');

class Postagem extends sequelize.Model { }


Postagem.init(
    {
        id:
        {
            type: sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        mensagem:
        {
            type: sequelize.TEXT,
            allowNull: false,
        },
    },
    {
        sequelize: database, modelName: 'postagens'
    }
)
Postagem.belongsTo(Instituicao, {
    constraints: true,
    foreignKey: 'idInstituicao'
})

Instituicao.hasMany(Postagem, {
    foreignKey: 'idInstituicao'
})


module.exports = Postagem;