//const Sequelize = require('sequelize');
//const sequelize = new Sequelize('postgres://postgres@localhost:5432/crud', {dialect: 'postgres'});

const sequelize = require('sequelize');
const db = new  sequelize(process.env.DATABASE_URL, { 
    dialect:'postgres', 
    dialectOptions: {
      ssl: 'true'
  } 
});
db.sync();
module.exports = db;