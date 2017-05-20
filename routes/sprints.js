const router = require('express').Router();

module.exports = (api) => {

	router.get('/:id',
		api.actions.sprints.findOne);

	router.get('/',
		api.actions.sprints.findAll);

	router.post('/',
		api.middlewares.bodyParser.json(),
		//api.middlewares.ensureUserPseudo,
		//api.middlewares.ensureUserName,
		//api.middlewares.ensureUserEmail,
		//api.middlewares.ensureUserPassword,
		api.actions.sprints.create);

	router.put('/:id',
		api.middlewares.bodyParser.json(),
		api.actions.sprints.update);

	router.delete('/:id',
		api.actions.sprints.remove);

	return router;

}
