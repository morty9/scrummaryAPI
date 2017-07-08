module.exports = (req, res, next) => {
  if (!req.body || !req.body.duration) {
    return res.status(400).send({code:400, type: 'duration', title:'Duration', message:'Veuillez compléter le champ manquant'});
  }
  return next();
}
