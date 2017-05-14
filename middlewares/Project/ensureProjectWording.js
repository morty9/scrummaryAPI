module.exports = (req, res, next) => {
  if (!req.body || !req.body.wording) {
    return res.status(400).send('missing.fields : ${req.body.wording}');
  }

  return next();
}
