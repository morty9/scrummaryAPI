const router = require('express').Router();

module.exports = (api) => {

	router.get('/:id',
		api.actions.stats.findOne);

	router.get('/',
		api.actions.stats.findAll);

	router.post('/',
		api.middlewares.bodyParser.json(),
		api.middlewares.ensureAuthenticated,
		api.actions.stats.create);

	/*router.put('/:id',
		api.middlewares.bodyParser.json(),
		api.actions.stats.update);*/

	router.delete('/:id',
		api.actions.stats.remove);

	return router;

}
