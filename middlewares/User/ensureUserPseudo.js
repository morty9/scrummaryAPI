module.exports = (req, res, next) => {
	if (!req.body || !req.body.nickname) {
		return res.status(400).send('missing.fields : ${req.body.pseudo}');
	}

	return next();
}
