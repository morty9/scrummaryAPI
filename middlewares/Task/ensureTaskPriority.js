module.exports = (req, res, next) => {
  if (!req.body || !req.body.priority) {
    return res.status(400).send({code:400, type: 'priority', title:'Priorité', message:'Veuillez compléter le champ manquant'});
  }
  return next();
}
