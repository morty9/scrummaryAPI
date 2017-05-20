const router = require('express').Router();

module.exports = (api) => {

  router.get('/:id',
    api.actions.tasks.findOne);

  router.get('/',
		api.actions.tasks.findAll);

	router.post('/',
		api.middlewares.bodyParser.json(),
		//api.middlewares.ensureUserPseudo,
		//api.middlewares.ensureUserName,
		//api.middlewares.ensureUserEmail,
		//api.middlewares.ensureUserPassword,
  	api.actions.tasks.create);

  router.put('/:id',
  	api.middlewares.bodyParser.json(),
  	api.actions.tasks.update);

  router.put('/name/:id/',
    api.middlewares.bodyParser.json(),
    api.actions.tasks.assignMembers);

  router.delete('/:id',
  	api.actions.tasks.remove);

  return router;
}
