module.exports = (api) => {
	return (req, res, next) => {
		if (!req.body || !req.body.duration) {
			res.status(400).send({code:400, type: 'duration', title:'Durée', message:'Veuillez compléter le champ de durée'});
		}
		next();
	}
}
