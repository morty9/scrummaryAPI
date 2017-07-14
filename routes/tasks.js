const router = require('express').Router();

module.exports = (api) => {

  router.get('/:id',
    api.actions.tasks.findOne);

  router.get('/',
		api.actions.tasks.findAll);

	router.post('/',
		api.middlewares.bodyParser.json(),
    //api.middlewares.ensureAuthenticated,
    api.middlewares.ensureTaskTitle,
		api.middlewares.ensureTaskDescription,
    api.middlewares.ensureTaskDifficulty,
    api.middlewares.ensureTaskDuration,
		api.middlewares.ensureTaskPriority,
		api.middlewares.ensureTaskMember,
    api.middlewares.ensureTaskCategory,
  	api.actions.tasks.create);

  router.put('/:id',
  	api.middlewares.bodyParser.json(),
    //api.middlewares.ensureAuthenticated,
  	api.actions.tasks.update);

  //router.put('/name/:id/',
  //  api.middlewares.bodyParser.json(),
  //  api.actions.tasks.assignMembers);

  router.delete('/:id',
    api.middlewares.ensureAuthenticated,
  	api.actions.tasks.remove);

  return router;
}
