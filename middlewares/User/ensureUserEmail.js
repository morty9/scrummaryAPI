module.exports = (api) => {
	return (req, res, next) => {
		if (!req.body || !req.body.email) {
			return res.status(400).send({code:400, type: 'email', title:'Email', message:'Veuillez compléter le champ manquant'});
		}
		next();
	}
}
