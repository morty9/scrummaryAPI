const jwt = require('jsonwebtoken');

module.exports = (api) => {
    const Token = api.models.Token;

    return (req, res, next) => {

        //#1 Verify authorization header exists.
        if (!req.headers || !req.headers.authorization) {
            return res.status(401).send('authentication.required');
        }

        const encryptedToken = req.headers.authorization;

        // #2 Verify the token is valid
        jwt.verify(encryptedToken, api.settings.security.salt, null, (err, decryptedToken) => {
            if (err) {
                return res.status(401).send({code:401, type: 'invalid.token', title:'Session expirée', message:'Votre session a expirée, veuillez vous reconnecter.'});
            }
            console.log(decryptedToken);
            Token
            .findById(decryptedToken.tokenId)
            .then((token) => {
              if (!token) {
                return res.status(401).send({code:401, type: 'invalid.token', title:'Session expirée', message:'Votre session a expirée, veuillez vous reconnecter.'});
              }
              
              req.user = token.id_user;
              return next();
            })
            .catch((err) => {
              res.status(500).send(err);
            })
        });
    };
};
