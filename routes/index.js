module.exports = (api) => {
	console.log('initializing routes...');
	api.use(api.middlewares.logger);
	api.use('/scrummary/users', require('./users')(api));
	api.use('/scrummary/projects', require('./projects')(api));
	api.use('/scrummary/sprints', require('./sprints')(api));
	api.use('/scrummary/tasks', require('./tasks')(api));
	api.use('/scrummary/stats', require('./stats')(api));
	api.use('/scrummary/categories', require('./categories')(api));
	api.use('/scrummary/auth', require('./auth')(api));
}
