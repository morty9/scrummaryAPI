module.exports = (api) => {

  const Sprint = api.models.Sprint;

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
      if (tasks.lenght === 0) {
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
    let sprintId = req.params.id ? req.params.id : req.id_sprint;
    Sprint
    .destroy({
      where : { id : sprintId }
    })
    .then((removed) => {
      if (!removed) {
        res.status(404).send('sprint.not.found');
      }
      res.status(201).send('sprint.removed');
    })
    .catch((err) => {
      res.status(500).send(err);
    });
  }

  //*//
  //Assign members to a task
  //*//
  function assignMembers(res, res, next) {
    //TODO
  }

  return {
    create,
    findOne,
    findAll,
    update,
    remove
  }


}



/*module.exports = (api) => {
  const Sprint = api.models.Sprint;

  function create(req, res, next) {
    let sprint = new Sprint(req.body);

    sprint.save((err, data) => {
      if (err) {
        return res.status(500).send(err);
      }

      return res.send(data);
    });
  }

  function findOne(req, res, next) {
    Sprint.findByName(req.params.title, (err, data) => {
      if (err) {
        return res.staus(500).send(err);
      }

      if (!data) {
        return res.status(204).send(data);
      }

      return res.send(data);
    });
  }

  function findAll(req, res, next) {
    Sprint.find((err, data) => {
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
    Sprint.findByIdAndUpdate(req.params.id, req.body, (err, data) => {
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
    Sprint.findByIdAndRemove(req.params.id, (err, data) => {
      if (err) {
        return res.status(500).send(err);
      }

      if (!data) {
        return res.status(204).send(data);
      }

      return res.send(data);
    })
  }

  function getSprints(req, res, next) {
    Sprint.findByName(req.params.title, (err, data) => {
      if (err) {
        return res.status(500).send(err);
      }

      if (!data) {
        return res.status(204).send(data);
      }

      return res.send(data);
    })
  }

  return {
    create,
    findOne,
    findAll,
    update,
    remove,
    getSprints
  }
}*/
