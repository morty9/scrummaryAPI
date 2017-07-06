module.exports = (api) => {

  const Task = api.models.Task;
  const User = api.models.User;

  //*//
  //Create a new task
  //*//
  function create(req, res, next) {
    let task = Task.build(req.body);
    task.id_creator = req.id_user;
    task
    .save()
    .then((task) => {
      if (!task) {
        res.status(409).send('task.already.exist');
      }
      res.status(201).send(task);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
  }

  //*//
  //Update a task
  //*//
  function update(req, res, next) {
    let userExist = true;
    if (req.body.id_members) {
      let count = 0;
      while (count < req.body.id_members) {
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
      Task
      .update(req.body, {
        where : { id : req.params.id }
      })
      .then((isUpdated) => {
        if (!isUpdated) {
          res.status(404).send('task.not.found');
        }
        res.status(201).send('task.updated');
      })
      .catch((err) => {
        res.status(500).send(err);
      })
    }
  }

  //*//
  //Find task by id
  //*//
  function findOne(req, res, next) {
    Task
    .findById(req.params.id)
    .then((task) => {
      if (!task) {
        res.status(404).send('task.not.found');
      }
      res.status(200).send(task);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
  }

  //*//
  //Find all tasks
  //*//
  function findAll(req, res, next) {
    Task
    .findAll()
    .then((tasks) => {
      if (tasks.lenght === 0) {
        res.status(204).send(tasks);
      }
      res.status(200).send(tasks);
    })
    .catch((err) => {
      res.status(500).send(err);
    })
  }

  //*//
  //Remove task
  //*//
  function remove(req, res, next) {
    let taskId = req.params.id ? req.params.id : req.id_task;
    Task
    .destroy({
      where : { id : taskId }
    })
    .then((removed) => {
      if (!removed) {
        res.status(404).send('task.not.found');
      }
      res.status(201).send('task.removed');
    })
    .catch((err) => {
      res.status(500).send(err);
    });
  }

  //*//
  //Assign members to a task
  //*//
  function assignMembers(res, res, next) {
    Task
    .findByIdAndUpdate(req.params.name, {
      id_members: req.body.name
    }, (err, task) => {
      if (err) {
        return res.status(500).send(err);
      }
      res.send(task);
    });
  }

  return {
    create,
    findOne,
    findAll,
    update,
    remove,
    assignMembers
  }

}
