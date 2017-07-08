module.exports = (req, res, next) => {
  if (!req.body || !req.body.description) {
    return res.status(400).send({code:400, type: 'description', title:'Description', message:'Veuillez compléter le champ manquant'});
  }
  return next();
}
