module.exports = (api) => {
	return (req, res, next) => {
		if (!req.body || !req.body.difficulty) {
			res.status(400).send({code:400, type: 'difficulty', title:'Difficulté', message:'Veuillez compléter le champ de difficulté'});
		}
		next();
	}
}
