module.exports = (req, res, next) => {
  if (!req.body || !req.body.difficulty) {
    return res.status(400).send({code:400, type: 'difficulty', title:'Difficulty', message:'Veuillez compléter le champ manquant'});
  }
  return next();
}
