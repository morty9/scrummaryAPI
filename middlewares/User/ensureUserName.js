module.exports = (api) => {
	return (req, res, next) => {
		if (!req.body || !req.body.fullname) {
			res.status(400).send({code:400, type: 'fullname', title:'Nom complet', message:'Veuillez compléter le champ manquant'});
		}
		next();
	}
}
