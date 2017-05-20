module.exports = (api) => {
	console.log('initializing routes...');
	api.use(api.middlewares.logger);
	api.use('/users', require('./users')(api));
	api.use('/projects', require('./projects')(api));
	api.use('/sprints', require('./sprints')(api));
	api.use('/tasks', require('./tasks')(api));
}
