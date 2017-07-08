const router = require('express').Router();

module.exports = (api) => {

	router.get('/:id',
		api.actions.projects.findOne);

	router.get('/',
		api.actions.projects.findAll);

	router.get('/name/:name',
		api.actions.projects.findByName);

	router.post('/',
		api.middlewares.bodyParser.json(),
		api.actions.projects.create);

	router.put('/:id',
		api.middlewares.bodyParser.json(),
		api.middlewares.ensureAuthenticated,
		api.actions.projects.update);

	router.delete('/:id',
		api.middlewares.ensureAuthenticated,
		api.actions.projects.remove);

	return router;

}
