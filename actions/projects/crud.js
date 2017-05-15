module.exports = (api) => {

  const Project = api.models.Project;

  //*//
  //Create a new project
  //*//
  function create(req, res, next) {
    let project = Project.build(req.body);
    project.id_creator = req.id_user;
    project
    .save()
    .then((project) => {
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
    });
  }

  //*//
  //Find project by id
  //*//
  function findOne(res, res, next) {
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
  function getProjects(req, res, next) {
    //TODO
  }

  return {
    create,
    findOne,
    findAll,
    update,
    remove,
    getProjects
  }

}




/*  module.exports = (api) => {

    const Project = api.models.Project;

    function create(req, res, next) {
      let project = new Project(req.body);

      Project.findOne({
        title: project.title,
      }, (err, found) => {
        if (err) {
          return res.status(500).send(err);
        }

        if (found) {
          return res.status(401).send('project.already.exists');
        }

        project.save((err, data) => {
          if (err) {
            return res.status(500).send(err);
          }
          return res.send(data);
        });
      });
    }

    function findOne(req, res, next) {
      Project.findByName(req.params.title, (err, data) => {
        if (err){
          return res.status(500).send(err);
        }

        if (!data) {
          return res.status(204).send(data);
        }

        return res.send(data);
      });
    }

    function findAll(req, res, next) {
      Project.find((err, data) => {
        if (err) {
          return res.status(500).send(err);
        }

        if (!data) {
          return res.status(204).send(data);
        }

        return res.send(data);
      });
    }

    function update(req, res, next) {
      Project.findByIdAndUpdate(req.params.id, req.body, (err, data) => {
        if (err) {
          return res.status(500).send(err);
        }

        if (!data) {
          return res.status(204).send(data);
        }

        return res.send(data);
      });
    }

    function remove(req, res, next) {
      Project.findByIdAndRemove(req.params.id, (err, data) => {
        if (err) {
          return res.status(500).send(err);
        }

        if (!data) {
          return res.status(204).send(data);
        }

        return res.send(data);
      });
    }

    function getProjects(req, res, next) {
      Project.findByName(req.params.title, (err, data) => {
        if (err) {
          return res.status(500).send(err);
        }

        if (!data) {
          return res.status(204).send(data);
        }

        return res.send(data);
      });
    }

    return {
      create,
      findOne,
      findAll,
      update,
      remove,
      getProjects
    }

  }*/
