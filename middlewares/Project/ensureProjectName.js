module.exports = (api) => {
	return (req, res, next) => {
    if (!req.body || !req.body.title) {
  		return res.status(400).send({code:400, type: 'title', title:'Nom du projet', message:'Veuillez compléter le champ manquant'});
  	}
		next();
	}
}
