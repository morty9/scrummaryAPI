const router = require('express').Router();

module.exports = (api) => {

	router.get('/:id',
		api.actions.categories.findOne);

	router.get('/',
		api.actions.categories.findAll);

	router.post('/',
		api.middlewares.bodyParser.json(),
		api.actions.categories.create);

	router.put('/:id',
		api.middlewares.bodyParser.json(),
		api.actions.categories.update);

	router.delete('/:id',
		api.actions.categories.remove);

	return router;

}
