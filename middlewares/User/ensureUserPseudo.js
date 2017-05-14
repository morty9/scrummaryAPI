module.exports = (req, res, next) => {
	if (!req.body || !req.body.pseudo) {
		return res.status(400).send('missing.fields : ${req.body.pseudo}');
	}

	return next();
}
