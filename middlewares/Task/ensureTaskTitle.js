module.exports = (req, res, next) => {
	if (!req.body || !req.body.title) {
		return res.status(400).send({code:400, type: 'title', title:'Titre', message:'Veuillez compléter le champ manquant'});
	}
	return next();
}
