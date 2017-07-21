const sha1 = require('sha1');

module.exports = (api) => {
  const User = api.models.User;
  const Project = api.models.Project;
  const Token = api.models.Token;

  //*//
  //Create new User
  //*//
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
      res.status(200).send('successful.modification');
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
      if (users.length === 0) {
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
    let userId = req.params.id_user;
    let projectId;
    let newMembers = [];

    /*Project
    .findAll()
    .then((projects) => {
      if (!projects) {
        res.status(404).send('project.not.found');
      }

      for (let i = 0; i < projects.length ; i++) {
        projectId = projects[i].id;
        newMembers = removeUserInProject(projects[i], userId);
        console.log("new members", newMembers);
      }

      Project
      .update({id_members : newMembers}, {where : {id : projectId}})
      .then((updated) => {
        if (!updated) {
          res.status(404).send('error.with.update');
        }*/

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

      /*})
      .catch((err) => {
        res.status(500).send(err);
      })

    })
    .catch((err) => {
      res.status(500).send(err);
    })*/
  }

  /*
  * Return -> ARRAY
  * Delete user to remove in id_members array
  */
  function removeUserInProject(projects, userId, isCreator) {
    let newMembers = [];

    for (let i = 0; i < projects.id_members.length ; i++) {
      if (projects.id_members[i] == userId) {
        for (let j = 0; j < projects.id_members.length ; j++) {
          if (projects.id_members[j] != userId) {
            newMembers.push(projects.id_members[j]);
          }
        }
      }
    }

    return newMembers;
  }

  //*//
  //Find user by name
  //*//
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
