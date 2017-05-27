//const sha1 = require('sha1');

module.exports = (api) => {
  const User = api.models.User;

  //*//
  //Create new User
  //*//
  function create(req, res, next) {
    User
    .create(req.body)
    .then((user) => {
      if (!user) {
        res.status(409).send('user.already.exist');
      }
      res.status(201).send(user);
    }).catch((err) => {
      res.status(500).send(err);
    });
  }

  //*//
  //Update User
  //*//
  function update(req, res, next) {
    let userId = req.params.id ? req.params.id : req.id_user;

    User
    .update(req.body, {
      where: {
        id : userId
      }
    })
    .then((updated) => {
      if (!updated) {
        res.status(409).send('modification.error');
      }
      res.status(200).send('modification.success');
    })
    .catch((err) => {
      res.status(500).send(err);
    })
  }

  //*//
  //Find one user by id
  //*//
  function findOne(req, res, next) {
    User
    .findById(req.params.id)
    .then((user) => {
      if (!user) {
        res.status(404).send('user.not.found');
      }
      res.status(200).send(user);
    })
    .catch((err) => {
      res.status(500).send(err);
    })
  }

  //*//
  //Find all users
  //*//
  function findAll(req, res, next) {
    User
    .findAll()
    .then((users) => {
      if (users.lenght === 0) {
        res.status(204).send(users);
      }
      res.status(200).send(users);
    }).catch((err) => {
      res.status(500).send(err);
    });
  }

  //*//
  //Remove user
  //*//
  function remove(req, res, next) {
    let userId = req.params.id ? req.params.id : req.id_user;

    User
    .destroy({
      where : { id : userId }
    })
    .then((data) => {
      if (!data) {
        res.status(404).send('user.not.found');
      }
      res.status(200).send('user.removed');
    })
    .catch((err) => {
      res.status(500).send(err);
    })
  }

  //*//
  //Find user by name
  //*//
  function getUsers(req, res, next) {
    User
    .findOne({
      where : {$or: [
        {nickname : req.params.name},
        {fullname : req.params.name}
      ]}
    })
    .then((user) => {
      if (!user) {
        res.status(404).send('user.not.found');
      }
      res.status(200).send(user);
    })
    .catch((err) => {
      res.status(500).send(err);
    })
  }

  return {
    create,
    findOne,
    findAll,
    update,
    remove,
    getUsers
  };

}
