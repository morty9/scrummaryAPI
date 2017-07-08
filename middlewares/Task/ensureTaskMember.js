module.exports = (req, res, next) => {
  if (!req.body || !req.body.members) {
    return res.status(400).send({code:400, type: 'members', title:'Members', message:'Veuillez compléter le champ manquant'});
  }
  return next();
}
