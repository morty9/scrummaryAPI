const Sequelize = require('sequelize');

module.exports = (api) => {
	console.log('initializing models...');
	api.sequelize = new Sequelize (
		api.settings.db.sql.database
	);

	api.models = {
		User: require('./User')(api),
		Task: require('./Task')(api),
		Sprint: require('./Sprint')(api),
		Project: require('./Project')(api)
	};
}
