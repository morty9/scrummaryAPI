module.exports = (req, res, next) => {
  if (!req.body || !req.body.difficulty) {
    return res.status(400).send('missing.fields : ${req.body.difficulty}');
  }

  return next();
}
