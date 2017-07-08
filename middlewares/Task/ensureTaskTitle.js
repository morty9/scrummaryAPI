module.exports = (api) => {
	return (req, res, next) => {
		if (!req.body || !req.body.title) {
			res.status(400).send({code:400, type: 'title', title:'Titre', message:'Veuillez compléter le champ de titre'});
		}
		next();
	}
}
