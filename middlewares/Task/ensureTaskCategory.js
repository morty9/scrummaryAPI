module.exports = (req, res, next) => {
  if (!req.body || !req.body.id_category) {
    return res.status(400).send({code:400, type: 'category', title:'Catégorie', message:'Veuillez compléter le champ manquant'});
  }
  return next();
}
