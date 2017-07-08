module.exports = (api) => {
	return (req, res, next) => {
		if (!req.body || !req.body.description) {
			res.status(400).send({code:400, type: 'description', title:'Description', message:'Veuillez compléter le champ de description'});
		}
		next();
	}
}
