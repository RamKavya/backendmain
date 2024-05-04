const Sequlize = require('sequelize');
require('dotenv').config();




un = process.env.DB_USERNAME;
pwd = process.env.DB_PASSWORD;

unn = process.env.DB_USERNAMEE;//local
pwdd = process.env.DB_PASSWORDD;


// const sequelize = new Sequlize("db_aa5e01_ragu", un, pwd, {
//      host: 'mysql9001.site4now.net',
//    // host: 'localhost',
//     dialect: "mysql",
//     logging: false,
//     timezone: '+05:30',
//     dialectOptions: {
//         useUTC: false //for reading from database
//     },

// }) 
// module.exports = sequelize

const sequelize = new Sequlize("db_aa8549_new001", un, pwd, {
     host: 'mysql8010.site4now.net',
   // host: 'localhost',
    dialect: "mysql",
    logging: false,
    timezone: '+05:30',
    dialectOptions: {
        useUTC: false //for reading from database
    },

}) 
module.exports = sequelize
