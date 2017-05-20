const Sequelize = require('sequelize');
const http = require('http');
const fs = require('fs');


module.exports = (api) => {
	console.log('initializing models...');
	console.log('SETTINGS', api.settings);
	// api.sequelize = new Sequelize (
	// 	api.settings.db.sql.database,
	// 	api.settings.db.sql.user,
	// 	api.settings.db.sql.password, {
	// 		host: api.settings.db.sql.host,
	// 		port : api.settings.db.sql.port,
	// 		dialect: api.settings.db.sql.dialect
	// 	}
	// );

	// api.sequelize = new Sequelize(
	// 	'scrummary',
	// 	'adminScrummary',
	// 	'admin', {
	// 		host : 'localhost',
	// 		port : 8888,
	// 		dialect : 'mysql'
	// 	}
	// )

	api.sequelize = new Sequelize('mysql://adminScrummary:admin@localhost:8080/scrummary');

	api.models = {
		User: require('./User')(api)
		//Task: require('./Task')(api),
		//Sprint: require('./Sprint')(api),
		//	Project: require('./Project')(api)
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
