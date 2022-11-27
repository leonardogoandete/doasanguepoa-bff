const Sequelize = require('sequelize');
const db = new Sequelize(process.env.URL_BANCO, {
    dialect: 'postgres',
    protocol: 'postgres',
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    }
});

db.sync();
module.exports = db;



