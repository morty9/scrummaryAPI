module.exports = (api) => {
	return (req, res, next) => {
		if (!req.body || !req.body.nickname) {
			res.status(400).send({code:400, type: 'nickname', title:'Nom d\'utilisateur', message:'Veuillez compléter le champ manquant'});
		}
		next();
	}
}
