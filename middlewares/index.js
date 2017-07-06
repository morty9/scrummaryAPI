module.exports = (api) => {
	console.log('initializing middlewares...');

	api.middlewares = {
		bodyParser: require('body-parser'),
		logger: require('./logger'),
		ensureUserName: require('./User/ensureUserName'),
		ensureUserPseudo: require('./User/ensureUserPseudo'),
		ensureUserEmail: require('./User/ensureUserEmail'),
		ensureUserPassword: require('./User/ensureUserPassword'),
		ensureProjectName: require('./Project/ensureProjectName')
	}
};
