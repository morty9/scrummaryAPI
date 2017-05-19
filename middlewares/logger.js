const path = require('path');
const fs = require('fs');
let filePath = path.join(__dirname, '../logs/historic.log');

module.exports = (req, res, next) => {

	let date = new Date();

	fs.appendFile(filePath, `'${date} : [${req.method}] : "${req.url}"'\n`, (err) => {
		if (err) {
			throw err;
		}
		console.log(`Request ${req.method} are logged`);
		return next();
	});

}
