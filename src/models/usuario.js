const sequelize = require('sequelize');
const database = require('../db.js');
const Agenda = require('./agenda.js');

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
            allowNull: false,
        },
        endereco:
        {
            type: sequelize.STRING,
            allowNull: false,
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
        role:
        {
            type: sequelize.STRING,
            allowNull: false,
            defaultValue: "usuario", 
        }
    },
    {
        sequelize: database, modelName: 'usuarios'
    }
)

Agenda.belongsTo(Usuario, {
    constraints: true,
    foreignKey: 'idUsuario'
})

Usuario.hasMany(Agenda, {
    constraints: true,
    foreignKey: 'idUsuario'
})

module.exports = Usuario;