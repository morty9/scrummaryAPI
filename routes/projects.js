const router = require('express').Router();

module.exports = (api) => {

	router.get('/:id',
		api.actions.projects.findOne);

	router.get('/',
		api.actions.projects.findAll);

	router.post('/',
		api.middlewares.bodyParser.json(),
		//api.middlewares.ensureUserPseudo,
		//api.middlewares.ensureUserName,
		//api.middlewares.ensureUserEmail,
		//api.middlewares.ensureUserPassword,
		api.actions.projects.create);

	router.put('/:id',
		api.middlewares.bodyParser.json(),
		api.actions.projects.update);

	router.delete('/:id',
		api.actions.projects.remove);

	return router;

}
