module.exports = (api) => {
	return (req, res, next) => {
		if (!req.body || !req.body.beginningDate) {
			res.status(400).send({code:400, type: 'beginningDate', title:'Date de début', message:'Veuillez compléter le champ de date de début'});
		}
		next();
	}
}
