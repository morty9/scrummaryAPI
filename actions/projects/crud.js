  module.exports = (api) => {

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

  }
