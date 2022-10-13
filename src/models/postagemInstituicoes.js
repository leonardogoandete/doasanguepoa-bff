const sequelize = require('sequelize');
const database = require('../db.js');

class postagemInstituicao extends sequelize.Model { }


postagemInstituicao.init(
    {
        id:
        {
            type: sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        instituicaoId:
        {
            type: sequelize.INTEGER,
            allowNull: true,
            references: {
                Model: 'Instituicao',
                key: 'id'
            }
        },
        postagemId:
        {
            type: sequelize.INTEGER,
            allowNull: false,
            references: {
                Model: 'Postagem',
                key: 'id'
            }
        },
    },
    {
        sequelize: database, modelName: 'postagemInstituicoes'
    }
)

module.exports = postagemInstituicao;