module.exports = (api) => {
	return (req, res, next) => {
		if (!req.body || !req.body.businessValue) {
			res.status(400).send({code:400, type: 'businessValue', title:'Valeur Business', message:'Veuillez compléter le champ de valeur du business'});
		}
		next();
	}
}
