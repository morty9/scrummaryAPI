module.exports = (api) => {
    const AuthToken = api.models.AuthToken;

    /// Logout (Get)
    /// Remove the current token for logged in user
    return function logout(req, res, next) {
        AuthToken.destroy(
            { where: { id: req.tokenId }
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
