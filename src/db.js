//const Sequelize = require('sequelize');
//const sequelize = new Sequelize('postgres://postgres@localhost:5432/crud', {dialect: 'postgres'});

//const sequelize = require('sequelize');
//const db = new  sequelize(process.env.DATABASE_URL2, { dialect:'postgres' });
const db = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    protocol: 'postgres',
    dialectOptions: {
        ssl: true
    }
});

db.sync();
module.exports = db;



