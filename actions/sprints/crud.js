module.exports = (api) => {

  const User = api.models.User;
  const Sprint = api.models.Sprint;
  const Project = api.models.Project;
  const Task = api.models.Task;

  //*//
  //Create a new sprint
  //*//
  function create(req, res, next) {
    let sprint = Sprint.build(req.body);
    sprint.id_creator = req.id_user;
    sprint
    .save()
    .then((sprint) => {
      if (!sprint) {
        res.status(409).send('sprint.already.exist');
      }
      res.status(201).send(sprint);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
  }

  //*//
  //Update a sprint
  //*//
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

  //*//
  //Find sprint by id
  //*//
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

  //*//
  //Find all sprints
  //*//
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

  //*//
  //Remove sprint
  //*//
  function remove(req, res, next) {
    console.log('Hello');
    let sprintId = req.params.id_sprint
    let projectId = req.params.id_project;

    Sprint
    .findById(sprintId)
    .then((sprint) => {
      if (!sprint) {
        res.status(404).send('sprint.not.found');
      }
      removeTasksFromSprint(sprint.id_listTasks);

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
          console.log(removed);
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

  function removeTasksFromSprint(id_listTasks) {
    for (let i = 0; i < id_listTasks.length ; i++) {
      console.log(id_listTasks[i]);
      let taskId = id_listTasks[i];
      Task.destroy({where : {id : id_listTasks[i]}});
    }
  }

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
