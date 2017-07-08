module.exports = (api) => {
	return (req, res, next) => {
		if (!req.body || !req.body.endDate) {
			res.status(400).send({code:400, type: 'endDate', title:'Date de fin', message:'Veuillez compléter le champ de date de fin'});
		}
		next();
	}
}
