module.exports = (api) => {
	return (req, res, next) => {
		if (!req.body || !req.body.password) {
			res.status(400).send({code:400, type: 'password', title:'Mot de passe', message:'Veuillez compléter le champ manquant'});
		}
		next();
	}
}
