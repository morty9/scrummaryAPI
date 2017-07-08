module.exports = (api) => {
	return (req, res, next) => {
		if (!req.body || !req.body.color) {
			res.status(400).send({code:400, type: 'color', title:'Couleur', message:'Veuillez compléter le champ de couleur'});
		}
		next();
	}
}
