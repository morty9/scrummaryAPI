module.exports = (req, res, next) => {
  if (!req.body || !req.body.title) {
    return res.status(400).send('missing.fields : ${req.body.title}');
  }

  return next();
}
