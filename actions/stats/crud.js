module.exports = (api) => {
  const Stat = api.models.Stat;
  const User = api.models.User;
  const Project = api.models.Project;
  const Task = api.models.Task;
  const Sprint = api.models.Sprint;

  //*//
  //Create a new diagram
  //*//
  function create(req, res, next) {
    let stats = Stat.build(req.body);
    stats
    .save()
    .then((stat) => {
      if (!stat) {
        res.status(409).send('diagram.already.exists');
      }
      res.status(201).send(stat);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
  }
  //*///
  //Update a diagram
  //*//
  function update(req, res, next) {
    let statId = req.params.id ? req.params.id : req.id_stat;
    Stat
    .update(req.body, {
      where: {
        id: statId
      }
    })
    .then((updated) => {
      res.status(200).send('successful.modification');
    })
    .catch((err) => {
      res.status(500).send(err);
    })
  }

  //*//
  //Find one diagram by id
  //*//
  function findOne(req, res, next) {
    Stat
    .findById(req.params.id)
    .then((stat) => {
      if (!stat) {
        res.status(404).send('diagram.not.found');
      }
      res.status(200).send(stat);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
  }

  //*//
  //Find all diagrams
  //*//
  function findAll(req, res, next) {
    Stat
    .findAll()
    .then((stats) => {
      if (stats.lenght === 0) {
        res.status(204).send(stats);
      }
      res.status(200).send(stats);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
  }

  //*//
  //Remove diagram
  //*//
  function remove(req, res, next) {
    let statId = req.params.id ? req.params.id : req.id_stat;
    Stat
    .destroy({
      where : { id : statId }
    })
    .then((removed) => {
      if (!removed) {
        res.status(404).send('diagram.not.found');
      }
      res.status(201).send('diagram.removed');
    })
    .catch((err) => {
      res.status(500).send(err);
    })
  }

  return {
    create,
    update,
    findOne,
    findAll,
    remove
  }
}
