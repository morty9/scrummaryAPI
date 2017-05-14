module.exports = (api) => {
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
}
