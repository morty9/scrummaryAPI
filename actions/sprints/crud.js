module.exports = (api) => {

  const User = api.models.User;
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

  return {
    create,
    findOne,
    findAll,
    update,
    remove
  }
}
