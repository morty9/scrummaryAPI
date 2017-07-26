module.exports = (api) => {
    const Token = api.models.Token;


    /**
    * \fn login(req, res, next)
    * \brief logout the user
    * \details Check if the user exist and destroy his token in the database
    *
    * \param req, res, next
    * \return the result
    */
    return function logout(req, res, next) {
        let tokId = req.params.id;
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
