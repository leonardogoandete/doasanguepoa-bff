const sequelize = require('sequelize');
const database = require('../db.js');

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
            type: sequelize.STRING,
            allowNull: false,
        },
    },
    {
        sequelize: database, modelName: 'postagem'
    }
)

module.exports = Postagem;