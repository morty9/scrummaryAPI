const Sequelize = require('sequelize');
const http = require('http');
const fs = require('fs');
//TO FIX AUTH

module.exports = (api) => {
	console.log('initializing models...');
	// api.sequelize = new Sequelize (
	// 	api.settings.db.sql.database,
	// 	api.settings.db.sql.user,
	// 	api.settings.db.sql.password, {
	// 		host: api.settings.db.sql.host,
	// 		port : api.settings.db.sql.port,
	// 		dialect: api.settings.db.sql.dialect
	// 	}
	// );

	api.sequelize =  new Sequelize(api.settings.db.sql.url);

	api.models = {
		User: require('./User')(api),
		Task: require('./Task')(api),
		Sprint: require('./Sprint')(api),
		Project: require('./Project')(api),
		Token: require('./Token')(api)
	};

	api.sequelize
	.authenticate()
	.then(() => {
		console.log('Connection has been established successfully.');
	})
	.catch(err => {
		console.error('Unable to connect to the database:', err);
	});
}
