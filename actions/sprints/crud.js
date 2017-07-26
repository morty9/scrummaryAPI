module.exports = (api) => {

  const User = api.models.User;
  const Sprint = api.models.Sprint;
  const Project = api.models.Project;
  const Task = api.models.Task;

  /**
  * \fn create(req, res, next)
  * \brief Create a new sprint
  * \details Create a new sprint in the database
  *
  * \param req, res, next
  */
  function create(req, res, next) {
    let sprint = Sprint.build(req.body);
    sprint.id_creator = req.user;
    sprint
    .save()
    .then((sprint) => {
      if (!sprint) {
        res.status(409).send("sprint.already.exist");
      }
      res.status(201).send(sprint);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
  }

  /**
  * \fn update(req, res, next)
  * \brief Update a sprint
  * \details Update a sprint in the database
  *
  * \param req, res, next
  */
  function update(req, res, next) {
    let userExist = true;

    if (req.body.id_members) {
      let count = 0;

      while (count < req.body.id_members.length) {
          User
          .findById(req.body.id_members[count])
          .then((user) => {
            if (!user) {
              res.status(404).send('user.not.found');
              userExist = false;
            }
          })
          .catch((err) => {
            res.status(500).send(err);
          });
          count+=1;
      }
    }

    if (userExist) {
      Sprint
      .update(req.body, {
        where : { id : req.params.id }
      })
      .then((isUpdated) => {
        if (!isUpdated) {
          res.status(404).send('sprint.not.found');
        }
        res.status(201).send('sprint.updated');
      })
      .catch((err) => {
        res.status(500).send(err);
      })
    }
  }

  /**
  * \fn findOne(req, res, next)
  * \brief Find sprint by id
  * \details Find sprint by id in the database
  *
  * \param req, res, next
  */
  function findOne(req, res, next) {
    Sprint
    .findById(req.params.id)
    .then((sprint) => {
      if (!sprint) {
        res.status(404).send('sprint.not.found');
      }
      res.status(200).send(sprint);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
  }

  /**
  * \fn findAll(req, res, next)
  * \brief Find all sprints
  * \details Find all sprints in the database
  *
  * \param req, res, next
  */
  function findAll(req, res, next) {
    Sprint
    .findAll()
    .then((sprints) => {
      if (sprints.lenght === 0) {
        res.status(204).send(sprints);
      }
      res.status(200).send(sprints);
    })
    .catch((err) => {
      res.status(500).send(err);
    })
  }

  /**
  * \fn remove(req, res, next)
  * \brief Remove sprint
  * \details Remove sprint in the database
  *
  * \param req, res, next
  */
  function remove(req, res, next) {
    let sprintId = req.params.id_sprint
    let projectId = req.params.id_project;

    Sprint
    .findById(sprintId)
    .then((sprint) => {
      if (!sprint) {
        res.status(404).send('sprint.not.found');
      }

      if (sprint.id_listTasks != null) {
          removeTasksFromSprint(sprint.id_listTasks);
      }

      Project
      .findById(projectId)
      .then((project) => {
        if (!project) {
          res.status(404).send('project.not.found');
        }

        removeSprintIdFromProject(project.id, project.id_sprint, sprintId);

        Sprint
        .destroy({
          where : { id : sprintId }
        })
        .then((removed) => {
          if (!removed) {
            res.status(404).send({code: 404, type:'empty', title: 'Sprint inexistant', message: 'Ce sprint n\'existe pas'});
          }

          res.status(201).send('sprint.removed');

        })
        .catch((err) => {
          res.status(500).send(err);
        });

      })
      .catch((err) => {
        res.status(500).send(err);
      })

    })
    .catch((err) => {
      res.status(500).send(err);
    });
  }

  /**
  * \fn removeTasksFromSprint(id_listTasks)
  * \brief Remove tasks from a sprint
  * \details Remove tasks from a sprint
  *
  * \param id_listTasks the list of id's tasks
  */
  function removeTasksFromSprint(id_listTasks) {
    for (let i = 0; i < id_listTasks.length ; i++) {
      let taskId = id_listTasks[i];
      Task.destroy({where : {id : id_listTasks[i]}});
    }
  }

  /**
  * \fn removeSprintIdFromProject(id_project, id_listSprints, id_sprint)
  * \brief Remove sprint from a project with tasks of the sprint
  * \details Remove sprint from a project with tasks of the sprint
  *
  * \param id_project id of the project
  * \param id_listSprints list of id's sprints
  * \param id_sprint id of the sprint
  */
  function removeSprintIdFromProject(id_project, id_listSprints, id_sprint) {
    let newArray = [];
    for (let i = 0; i < id_listSprints.length; i++) {
      if (id_listSprints[i] != id_sprint) {
        newArray.push(id_listSprints[i]);
      }
    }
    Project.update({id_sprint : newArray}, {where : {id : id_project}});
  }

  return {
    create,
    findOne,
    findAll,
    update,
    remove
  }
}
