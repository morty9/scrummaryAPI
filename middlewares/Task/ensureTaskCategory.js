module.exports = (api) => {
	return (req, res, next) => {
		if (!req.body || req.body.id_category == null) {
			res.status(400).send({code:400, type: 'category', title:'Catégorie', message:'Veuillez compléter le champ de catégorie'});
		}
		next();
	}
}
