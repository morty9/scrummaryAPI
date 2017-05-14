modele.exports = (api) => {

  const Task = api.models.Task;
  const User = api.models.User;

  //*//
  //Create a new taks
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
      res.status.(201).send(task);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
  }

  //*//
  //Update a task
  //*//
  function update(req, res, next) {
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
    destroy({
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
    //TODO
  }

}


/*modele.exports = (api) => {

  const Task = api.models.Task;
  const User = api.models.User;

  function create(req, res, next) {
    const userId = req.userId;

    let task = new Task(req.body);

    User.getUsers((err, data) => {
      if (err) {
        return res.status(500).send(err);
      }

      if(!data) {
        return res.status(204).send(data);
      }

      task.members.push(data._id.toString())
      task.save((err) => {
        if (err) {
          return res.status(500).send();
        }
        return res.send(data);
      });

    });
  }

  function findOne(req, res, next) {
    Task.findById(req.params.id, (err, data) => {
      if (err) {
        return res.status(500).send(err);
      }

      if(!data) {
        return res.status(204).send(data);
      }
      return res.send(data);
    });
  }

  function findAll(req, res, next) {
    Task.find((err, data) => {
      if (err) {
          return res.status(500).send(err);
      }

      if (!data || data.length == 0) {
        return res.status(204).send(data);
      }

      return res.send(data);

    });
  }

  function update(req, res, next) {
    Task.findByIdAndUpdate(req.params.id, req.body, (err, data) => {
      if (err) {
        return res.status(500).send(err);
      }

      if(!data) {
        return res.status(204).send(data);
      }

      return res.send(data);

    });
  }

  function remove(req, res, next) {
    Task.findByIdAndRemove(req.params.id, (err, data) => {
      if (err) {
        return res.status(500).send(err);
      }

      if (!data) {
        return res.status(204).send(data);
      }

      return res.send(data);
    });
  }

  function assign(req, res, next) {
    Task.findByIdAndUpdate(req.params.id, {
      assigned: req.body.userId
    }, (err, task) => {
      if (err) {
        return res.status(500).send(err);
      }
      res.send(task);
    });
  }

}*/
