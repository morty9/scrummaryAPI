module.exports = (req, res, next) => {
	if (!req.body || !req.body.nickname) {
		return res.status(400).send({code:400, type: 'nickname', title:'Nom d\'utilisateur', message:'Veuillez compléter le champ manquant'});
	}

	return next();
}
