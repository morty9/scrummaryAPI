module.exports = (api) => {

  const User = api.models.User;
  const Project = api.models.Project;

  //*//
  //Create a new project
  //*//
  function create(req, res, next) {
    const userId = req.userId;
    let project = Project.build(req.body);
    project.id_creator = 1;
    project.id_creator = userId;
    console.log(req.body);
    project
    .save()
    .then((project) => {
      console.log("AFTER",project);
      if (!project) {
        res.status(409).send('project.already.exist');
      }
      res.status(201).send(project);
    })
    .catch((err) => {
      res.status(500).send(err);
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
        console.log('is in while');
        //console.log(req.boby.id_members[count]);
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
        res.status(201).send('project.updated');
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
    let projectId = req.params.id ? req.params.id : req.id_project;
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
    .then((user) => {
      if (!user) {
        res.status(404).send('user.not.found');
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
