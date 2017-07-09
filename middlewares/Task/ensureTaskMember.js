module.exports = (api) => {
	return (req, res, next) => {
		if (!req.body || !req.body.id_members) {
			res.status(400).send({code:400, type: 'members', title:'Membres', message:'Veuillez compléter le champ des membres'});
		}
		next();
	}
}
