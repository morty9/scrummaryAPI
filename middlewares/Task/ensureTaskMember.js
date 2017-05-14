module.exports = (req, res, next) => {
  if (!req.body || !req.body.members) {
    return res.status(400).send('missing.fields : ${req.body.members}');
  }

  return next();
}
