module.exports = (req, res, next) => {
	if (!req.body || !req.body.email) {
		return res.status(400).send('missing.fields : ${req.body.email}');
	}

	return next();
}
