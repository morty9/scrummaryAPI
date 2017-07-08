module.exports = (req, res, next) => {
	if (!req.body || !req.body.password) {
		return res.status(400).send({code:400, type: 'password', title:'Mot de passe', message:'Veuillez compléter le champ manquant'});
	}

	return next();
}
