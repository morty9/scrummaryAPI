module.exports = (api) => {
	return (req, res, next) => {
		if (!req.body || !req.body.status) {
			res.status(400).send({code:400, type: 'status', title:'Statut', message:'Veuillez compléter le champ de statut'});
		}
		next();
	}
}
