module.exports = (req, res, next) => {
	if (!req.body || !req.body.password) {
		return res.status(400).send('missing.fields : ${req.body.password}');
	}

	return next();
}
