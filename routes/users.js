const router = require('express').Router();

module.exports = (api) => {

	router.get('/:id',
		api.actions.users.findOne);

	router.get('/',
		api.actions.users.findAll);

	router.get('/name/:name',
		api.actions.users.findByName);

	router.post('/',
		api.middlewares.bodyParser.json(),
		api.middlewares.ensureUserEmail,
		api.middlewares.ensureUserPassword,
		api.middlewares.ensureUserPseudo,
		api.middlewares.ensureUserName,
		api.actions.users.create);

	router.put('/:id',
		api.middlewares.bodyParser.json(),
		api.middlewares.ensureAuthenticated,
		api.actions.users.update);

	router.delete('/:id_user',
		api.middlewares.ensureAuthenticated,
		api.actions.users.remove);

	return router;

}
