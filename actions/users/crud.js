const sha1 = require('sha1');

module.exports = (api) => {
  const User = api.models.User;
  const Project = api.models.Project;
  const Token = api.models.Token;

  /**
  * \fn create(req, res, next)
  * \brief Create new User
  * \details Create new User in the database
  *
  * \param req, res, next
  */
  function create(req, res, next) {
    let user = User.build(req.body);
    // user.password = sha1(user.password);
    user
    .save()
    .then((user) => {
      return res.status(201).send(user);
    })
    .catch((err) => {
      if (err.errors[0].path == 'email') {
        return res.status(409).send({code: 409, type:'email', title: 'Email incorrect', message: 'Veuillez modifier le champ \"email\" car celui-ci existe déjà.'});
      } else if (err.errors[0].path == 'nickname') {
        return res.status(409).send({code: 409, type:'nickname', title: 'Nom d\'utilisateur incorrect', message: 'Veuillez modifier le champ \"nom d\'utilisateur\" car celui-ci existe déjà.'});
      }
    });
  }

  /**
  * \fn update(req, res, next)
  * \brief Update a User
  * \details Update a User in the database
  *
  * \param req, res, next
  */
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
      res.status(200).send('successful.modification');
    })
    .catch((err) => {
      res.status(500).send(err);
    })
  }

  /**
  * \fn findOne(req, res, next)
  * \brief Find one user by id
  * \details Find one user by id in the database
  *
  * \param req, res, next
  */
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

  /**
  * \fn findAll(req, res, next)
  * \brief Find all users
  * \details Find all users in the database
  *
  * \param req, res, next
  */
  function findAll(req, res, next) {
    User
    .findAll()
    .then((users) => {
      if (users.length === 0) {
        res.status(204).send(users);
      }
      res.status(200).send(users);
    }).catch((err) => {
      res.status(500).send(err);
    });
  }

  /**
  * \fn remove(req, res, next)
  * \brief Remove a user
  * \details Remove a user in the database
  *
  * \param req, res, next
  */
  function remove(req, res, next) {
    let userId = req.params.id_user;

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

  /**
  * \fn findByName(req, res, next)
  * \brief Find a user by name
  * \details Find a user by name in the database
  *
  * \param req, res, next
  */
  function findByName(req, res, next) {
    User
    .findOne({
      where : {$or: [
        {nickname : req.params.nickname},
        {fullname : req.params.fullname}
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
    findByName,
    update,
    remove
  };

}
