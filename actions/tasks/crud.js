module.exports = (api) => {

  const Task = api.models.Task;
  const User = api.models.User;
  const Sprint = api.models.Sprint;

  //*//
  //Create a new task
  //*//
  function create(req, res, next) {
    let task = Task.build(req.body);
    task.id_creator = req.user;
    task
    .save()
    .then((task) => {
      res.status(201).send(task);
    })
    .catch((err) => {
      res.status(409).send({code: 409, type:'title', title: 'Titre existant', message: 'Veuillez modifier le champ \"titre\" car celui-ci existe déjà.'});
    });
  }

  //*//
  //Update a task
  //*//
  function update(req, res, next) {
    /*let userExist = true;
    if (req.body.id_members) {
      let count = 0;
      while (count < req.body.id_members) {
          User
          .findById(req.body.id_members[count])
          .then((user) => {
            if (!user) {
              res.status(404).send({code: 404, type:'empty', title: 'Utilisateur inexistant', message: 'Cet utilisateur n\'existe pas'});
              userExist = false;
            }
          })
          .catch((err) => {
            res.status(500).send(err);
          });
          count+=1;
      }
    }*/

    //if (userExist) {
      Task
      .update(req.body, {
        where : { id : req.params.id }
      })
      .then((isUpdated) => {
        if (!isUpdated) {
          res.status(404).send({code: 404, type:'empty', title: 'Tâche inexistante', message: 'Cette tâche n\'existe pas'});
        }
        res.status(201).send({code: 201, type:'success', title: 'Tâche modifiée', message: 'Cette tâche a été modifié avec succès'});
      })
      .catch((err) => {
        res.status(500).send(err);
      })
    //}
  }

  //*//
  //Find task by id
  //*//
  function findOne(req, res, next) {
    Task
    .findById(req.params.id)
    .then((task) => {
      if (!task) {
        res.status(404).send({code: 404, type:'empty', title: 'Tâche inexistante', message: 'Cette tâche n\'existe pas'});
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
    let taskId = req.params.id_task;
    let sprintId = req.params.id_sprint;

    Sprint
    .findById(sprintId)
    .then((sprint) => {
      if (!sprint) {
        res.status(404).send('sprint.not.found');
      }
      removeTaskIdFromSprint(sprintId, sprint.id_listTasks, taskId);

      Task
      .destroy({
        where : { id : taskId }
      })
      .then((removed) => {
        if (!removed) {
          res.status(404).send({code: 404, type:'empty', title: 'Tâche inexistante', message: 'Cette tâche n\'existe pas'});
        }
        res.status(201).send('task.removed');
      })
      .catch((err) => {
        res.status(500).send(err);
      });
    })
    .catch((err) => {
      res.status(500).send(err);
    })
  }

  function removeTaskIdFromSprint(id_sprint, id_listTasks, id_task) {
    let newArray = [];
    for (let i = 0; i < id_listTasks.length; i++) {
      if (id_listTasks[i] != id_task) {
        newArray.push(id_listTasks[i]);
      }
    }
    Sprint.update({id_listTasks : newArray}, {where : {id : id_sprint}});
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
