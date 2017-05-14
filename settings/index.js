module.exports = (api) => {
	console.log('initializing settings');
	api.settings = require('./settings.json');
}