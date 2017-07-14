module.exports = (api) => {
	console.log('initializing middlewares...');

	api.middlewares = {
		bodyParser: require('body-parser'),
		logger: require('./logger'),
		ensureUserName: require('./User/ensureUserName')(api),
		ensureUserPseudo: require('./User/ensureUserPseudo')(api),
		ensureUserEmail: require('./User/ensureUserEmail')(api),
		ensureUserPassword: require('./User/ensureUserPassword')(api),
		ensureAuthenticated: require('./Auth/ensureAuthenticated')(api),
		ensureProjectName: require('./Project/ensureProjectName')(api),
		ensureTaskCategory: require('./Task/ensureTaskCategory')(api),
		ensureTaskDifficulty: require('./Task/ensureTaskDifficulty')(api),
		ensureTaskDuration: require('./Task/ensureTaskDuration')(api),
		ensureTaskMember: require('./Task/ensureTaskMember')(api),
		ensureTaskPriority: require('./Task/ensureTaskPriority')(api),
		ensureTaskTitle: require('./Task/ensureTaskTitle')(api),
		ensureTaskDescription: require('./Task/ensureTaskDescription')(api)
	}
};
