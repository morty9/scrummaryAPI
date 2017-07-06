module.exports = (api) => {
	console.log('initializing middlewares...');

	api.middlewares = {
		bodyParser: require('body-parser'),
		logger: require('./logger'),
		ensureUserName: require('./User/ensureUserName'),
		ensureUserPseudo: require('./User/ensureUserPseudo'),
		ensureUserEmail: require('./User/ensureUserEmail'),
		ensureUserPassword: require('./User/ensureUserPassword'),
<<<<<<< HEAD
		ensureAuthenticated: require('./Auth/ensureAuthenticated')
=======
		ensureProjectName: require('./Project/ensureProjectName')
>>>>>>> af868ea5d5697399165320f5ec44c9f52e61010c
	}
};
