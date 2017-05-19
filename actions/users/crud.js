//const sha1 = require('sha1');

module.exports = (api) => {
  const User = api.models.User;

  //*//
  //Create new User
  //*//
  function create(req, res, next) {
    User
    .build(req.body)
    .save()
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
    .findByName(req.params.nickname, req.params.fullname)
    .then((user) => {
      if (!user) {
        res.status(404).send('user.not.found');
      }
      res.status(200).send('user.found');
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


/*module.exports = (api) => {
  const User = api.models.User;

  function create(req, res, next) {
    let user = new User(req.body);
    user.password = sha1(user.password);

    User.findOne({
      email: user.email,
    }, (err, found) => {
      if (err) {
        return res.status(500).send(err);
      }

      if (found) {
        return res.status(401).send('email.already.exists');
      }

      user.save((err, data) => {
        if (err) {
          return res.status(500).send(err);
        }

        return res.send(data);
      });

    });

  }

  function findOne(req, res, next) {
    User.findById(req.params.id, (err, data) => {
      if (err) {
        return res.status(500).send(err);
      }

      if (!data) {
        return res.status(204).send(data);
      }

      return res.send(data);
    });

  }

  function findAll(req, res, next) {
      User.find((err, data) => {
        if (err) {
          return res.status(500).send(err);
        }

        if(!data || data.length == 0) {
          return res.status(204).send(data);
        }

        return res.send(data);

      });
  }

  function update(req, res, next) {
    User.findByIdAndUpdate(req.params.id, req.body, (err, data) => {
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
    User.findByIdAndRemove(req.params.id, (err, data) => {
      if (err) {
        return res.status(500).send(err);
      }

      if (!data) {
        return res.status(204).send();
      }

      return res.send(data);
    });
  }

  function getUsers(req, res, next) {
    User.findByName(req.params.username, req.params.pseudo, (err, data) {
      if (err) {
        return res.status(500).send(err);
      }

      if (!data) {
        return res.status(204).send();
      }

      return res.send(data);
    });
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
*/
