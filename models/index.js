const Sequelize = require('sequelize');
const http = require('http');
const fs = require('fs');


module.exports = (api) => {
	console.log('initializing models...');

	api.sequelize =  new Sequelize(api.settings.db.sql.url);

	api.models = {
		User: require('./User')(api),
		Task: require('./Task')(api),
		Sprint: require('./Sprint')(api),
		Project: require('./Project')(api),
		Category: require('./Category')(api),
		Stat: require('./Stat')(api),
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
