const sequelize = require('sequelize');
const database = require('../db.js');

class Agenda extends sequelize.Model { }

/*
CREATE TABLE agenda (
id int,
dias date,
horarios char(5)[]
);

INSERT INTO agenda (id, dias, horarios)
VALUES
(1,'2017-03-15','{ {"08:00",true,1}, {"09:00",true,2}, {"10:00",false,null}, {"17:00",false,null}}');
*/
Agenda.init(
    {
        id:
        {
            type: sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        dia:
        {
            type: sequelize.DATE,
            allowNull: false,
        },
        idInstituicao:
        {
            type: sequelize.INTEGER,
            allowNull: false
        },
        hora: 
        {
            type: sequelize.STRING,
            allowNull: false
        },
        idUsuario:
        {
            type: sequelize.INTEGER,
            allowNull: false
        },
        status:
        {
            type: sequelize.BOOLEAN,
            defaultValue: false,
            //allowNull: false
        }
    },
    {   
        sequelize: database, modelName: 'agenda'
    }
)


module.exports = Agenda;