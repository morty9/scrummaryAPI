module.exports = (req, res, next) => {
	if (!req.body || !req.body.fullname) {
		return res.status(400).send('missing.fields : ${req.body.username}');
	}

	return next();
}
