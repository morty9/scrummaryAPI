const sha1 = require('sha1');

module.exports = (api) => {
  const User = api.models.User;
  const Project = api.models.Project;

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
    let userId = req.params.id_userToDelete;
    let newCreator = req.params.id_newCreator;
    let newMembers = [];

    Project
    .findAll()
    .then((project) => {
      if (!project) {
        res.status(404).send('project.not.found');
      }

      for (let i = 0; i < project.length ; i++) {
        // if (project[i].id_creator == userId) {
        //   console.log(project[i].id_creator);
        //   //Project.update({id_creator : newCreator}, {where : {id : project[i].id}});
        // }

        //console.log(project[i].id_members);
        for (let j = 0; j <= project[i].id_members ; j++) {
          console.log("is in");
          console.log(project[i].id_members[j]);
          // if (project[i].id_members[j] != userId) {
          //   newMembers.push(project[i].id_members[j]);
          // }
          //console.log(newMembers);
        }
        //Project.update({id_members : newMembers}, {where : {id : project[i].id}});
      }

      /*User
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
      })*/

    })
    .catch((err) => {
      res.status(500).send(err);
    })
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
