module.exports = (api) => {
	console.log('initializing actions...');

	api.actions = {
		users: require('./users/crud')(api),
		tasks: require('./tasks/crud')(api),
		auth: require('./auth')(api)
	};
}
