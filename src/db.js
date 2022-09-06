//const Sequelize = require('sequelize');
//const sequelize = new Sequelize('postgres://postgres@localhost:5432/crud', {dialect: 'postgres'});

const sequelize = require('sequelize');
const db = new  sequelize('postgres','postgres','teste',
{
    dialect:'postgres', host:'20.20.0.2',port:5432
});

db.sync();

module.exports = db;