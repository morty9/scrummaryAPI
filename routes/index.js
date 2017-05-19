module.exports = (api) => {
	console.log('initializing routes...');
	api.use(api.middlewares.logger);
	api.use('/users', require('./users')(api));
}
