module.exports = (api) => {
    const Token = api.models.Token;

    /// Logout (Get)
    /// Remove the current token for logged in user
    return function logout(req, res, next) {
        let tokId = req.params.id;
        console.log("TOKID: ", tokId);
        Token.destroy(
            { where: { id: tokId }
        }).then((destroyedRowsCount) => {
            if(destroyedRowsCount > 0){
                res.status(201).send("Succesfully logged out");
            } else {
                res.status(404).send("Not logged in");
            }
        }).catch((error) => {
            res.status(500).send(error.message);
        });
    };
};

/*  function remove(req, res, next) {
    let projectId = req.params.id ? req.params.id : req.id_project;
    Project
    .destroy({
      where : { id : projectId }
    })
    .then((removed) => {
      if (!removed) {
        res.status(404).send('project.not.found');
      }
      res.status(201).send('project.removed');
    })
    .catch((err) => {
      res.status(500).send(err);
    });
  }*/
