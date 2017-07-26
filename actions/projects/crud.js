module.exports = (api) => {

  const User = api.models.User;
  const Project = api.models.Project;
  const Sprint = api.models.Sprint;
  const Task = api.models.Task;

  //*//
  //Create a new project
  //*//
  function create(req, res, next) {
    let project = Project.build(req.body);
    project.id_creator = req.user;
    project
    .save()
    .then((project) => {
      res.status(201).send(project);
    })
    .catch((err) => {
      //res.status(500).send(err);
      res.status(409).send({code: 409, type:'title', title: 'Nom du projet', message: 'Veuillez modifier le champ \"nom du projet\" car celui-ci existe déjà.'});
    });
  }

  //*//
  //Update project
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
      Project
      .update(req.body, {
        where : { id : req.params.id }
      })
      .then((isUpdated) => {
        if (!isUpdated) {
          res.status(404).send('project.not.found');
        }
        res.status(201).send({status : 'updated'});
      })
      .catch((err) => {
        res.status(500).send(err);
      })
    }
  }

  //*//
  //Find project by id
  //*//
  function findOne(req, res, next) {
    Project
    .findById(req.params.id)
    .then((project) => {
      if (!project) {
        res.status(404).send('project.not.found');
      }
      res.status(200).send(project);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
  }

  //*//
  //Find all project
  //*//
  function findAll(req, res, next) {
    Project
    .findAll()
    .then((projects) => {
      if (projects.lenght === 0) {
        res.status(204).send(projects);
      }
      res.status(200).send(projects);
    })
    .catch((err) => {
      res.status(500).send(err);
    })
  }

  //*//
  //Remove project
  //*//
  function remove(req, res, next) {
    let projectId = req.params.id;

    Project
    .findOne({
      where :
        { id : projectId }
    })
    .then((project) => {
      if (!project) {
        res.status(404).send('user.not.found');
      }

      if (project.id_sprint != null) {
        removeSprintsFromProject(project.id_sprint, project.id);
      }

      Project
      .destroy({
        where : { id : projectId }
      })
      .then((removed) => {
        if (!removed) {
          res.status(404).send('project.not.found');
        }
        res.status(201).send('project.removed');
      })
      .catch((err) => {
        res.status(500).send(err);
      });
    })
    .catch((err) => {
      res.status(500).send(err);
    })

  }

  function removeSprintsFromProject(id_listSprints, id_project) {
    for (let i = 0; i < id_listSprints.length; i++) {
      let sprintId = id_listSprints[i];

      Sprint
      .findById(sprintId)
      .then((sprint) => {
        if (!sprint) {
          res.status(404).send('sprint.not.found');
        }

        for (let i = 0; i < sprint.id_listTasks.length ; i++) {
          Task.destroy({where : {id : sprint.id_listTasks[i]}});
        }

        Sprint.destroy({where : {id : sprintId}});

      })
      .catch((err) => {
        res.status(500).send(err);
      });
    }
  }

  //**//
  //Get project by name
  //*//
  function findByName(req, res, next) {
    Project
    .findOne({
      where :
        { title : req.params.name }
    })
    .then((project) => {
      if (!project) {
        res.status(404).send('project.not.found');
      }
      res.status(200).send(user);
    })
    .catch((err) => {
      res.status(500).send(err);
    })
  }

  return {
    create,
    findOne,
    findAll,
    update,
    remove,
    findByName
  }

}
