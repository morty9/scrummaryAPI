//const SHA512 = require("crypto-js/sha512");
const sha1 = require("sha1");
//const Hex = require("crypto-js/enc-hex");
const jwt = require('jsonwebtoken');

module.exports = (api) => {
    const User = api.models.User;
    const Token = api.models.Token;

    /**
    * \fn login(req, res, next)
    * \brief log the user
    * \details Check if the user exist and generate a token in the database
    * for the current user
    *
    * \param req, res, next
    * \return the result
    */
    return function login(req, res, next) {
        let userId = 0;
        User.findOne({
            where: {
                email: req.body.email,
                //password: sha1(req.body.password)
                password: req.body.password
            }
        })
        .then((user) => {
            if(user) {
                let token = Token.build({
                    id_user: user.id
                });
                userId = user.id;
                return token.save();
            } else {
                return res.status(401).send({code: 401, type:'invalid.credentials', title: 'Identifiants incorrect', message: 'Vos identifiants sont incorrect ou inexistant'});
            }
        }).then((token) => {
            jwt.sign({
                    exp: Math.floor(Date.now() / 1000) + (60 * 60) * 3, // 3 hours.
                    tokenId: token.id.toString() // using the ID of the token has identifier.
                },
                api.settings.security.salt,
                {},
                (error, encryptedToken) => {
                    if (error) {
                        return res.status(500).send(error);
                    }

                    return res.status(200).send({
                        "token": encryptedToken,
                        "creationDate": Date.now(),
                        "userId": userId,
                        "tokenId": token.id
                    });
                }
            );
        }).catch((error) => {
            return res.status(500).send(error);
        });
    };
};
