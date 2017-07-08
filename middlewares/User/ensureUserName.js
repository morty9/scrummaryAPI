module.exports = (req, res, next) => {
	if (!req.body || !req.body.fullname) {
		return res.status(400).send({code:400, type: 'fullname', title:'Nom complet', message:'Veuillez compléter le champ manquant'});
	}

	return next();
}
