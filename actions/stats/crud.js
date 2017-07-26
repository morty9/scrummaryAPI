module.exports = (api) => {
  const Stat = api.models.Stat;
  const User = api.models.User;
  const Project = api.models.Project;
  const Task = api.models.Task;
  const Sprint = api.models.Sprint;

  /**
  * \fn create(req, res, next)
  * \brief Create a new stat for graph
  * \details Create a new stat for graph in the database
  *
  * \param req, res, next
  */
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

  /**
  * \fn update(req, res, next)
  * \brief Update a new stat for graph
  * \details Update a new stat for graph in the database
  *
  * \param req, res, next
  */
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

  /**
  * \fn findOne(req, res, next)
  * \brief Find one stat by id
  * \details Find one stat by id in the database
  *
  * \param req, res, next
  */
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

  /**
  * \fn findAll(req, res, next)
  * \brief Find all stat
  * \details Find all stat in the database
  *
  * \param req, res, next
  */
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

  /**
  * \fn remove(req, res, next)
  * \brief Remove a stat
  * \details Remove a stat in the database
  *
  * \param req, res, next
  */
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
