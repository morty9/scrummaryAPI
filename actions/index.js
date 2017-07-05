module.exports = (api) => {
	console.log('initializing actions...');

	api.actions = {
		users: require('./users/crud')(api),
		projects: require('./projects/crud')(api),
		sprints: require('./sprints/crud')(api),
		tasks: require('./tasks/crud')(api),
		stats: require('./stats/crud')(api),
		categories: require('./categories/crud')(api),
		auth: require('./auth')(api)
	};
}
