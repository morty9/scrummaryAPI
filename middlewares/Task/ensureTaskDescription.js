module.exports = (req, res, next) => {
  if (!req.body || !req.body.description) {
    return res.status(400).send('missing.fields : ${req.body.category}');
  }

  return next();
}
