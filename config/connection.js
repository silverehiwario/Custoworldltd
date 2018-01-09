// // first we need to require the sequelize package
// var Sequelize = require('sequelize');
//
// var env;
// if (process.env.JAWSDB_URL)
//     env = "production";
// else {
//     env = 'development';
// }
//
// var config = require('./config')[env];
//
// // now we will set up our connection variable (sequelize) based on whether use_env_variable exists in our config
// var sequelize;
// if (config.use_env_variable) {
// 	// jawsDB production option
// 	sequelize = new Sequelize(process.env[config.use_env_variable]);
// } else {
// 	// local mysqlDB development option
// 	sequelize = new Sequelize(config.database, config.username, config.password, {
// 		host: config.host,
// 		dialect: config.dialect
// 	});
// }
//
// // finally export the connection to the model
// module.exports = sequelize;
