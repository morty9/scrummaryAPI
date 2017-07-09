module.exports = (api) => {
	return (req, res, next) => {
		console.log(req.body.priority);
		if (!req.body || req.body.priority == null) {
			res.status(400).send({code:400, type: 'priority', title:'Priorité', message:'Veuillez compléter le champ de priorité'});
		}
		next();
	}
}
