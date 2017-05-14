module.exports = (api) => {
	console.log('initializing middlewares...');

	api.middlewares = {
		bodyParser: require('body-parser'),
		logger: require('./logger'),
		ensureUserName: require('./ensureUserName'),
		ensureUserPseudo: require('./ensureUserPseudo'),
		ensureUserEmail: require('./ensureUserEmail'),
		ensureUserPassword: require('./ensureUserPassword')
	}
};