const Sequelize = require('sequelize');

module.exports = (api) => {
	console.log('initializing models...');
	console.log('SETTINGS', api.settings);
	api.sequelize = new Sequelize (
		api.settings.db.sql.user,
		api.settings.db.sql.password,
		api.settings.db.sql.database, (
			api.settings.db.sql.host,
			api.settings.db.sql.dialect,
			api.settings.db.sql.pool
		)
	);
	api.sequelize.sync();
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
