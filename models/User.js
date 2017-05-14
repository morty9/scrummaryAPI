const Sequelize = require('sequelize');

module.exports = (api) => {
	return api.sequelize.define('User', {
		id: {
			type: Sequelize.INTEGER,
			autoIncrement: true,
			primaryKey: true
		},
		nickname: Sequelize.STRING,
		fullname: Sequelize.STRING,
		email: Sequelize.STRING,
		password: Sequelize.STRING,
		id_role: Sequelize.INTEGER,
		id_task: Sequelize.INTEGER
	}, {
		timestamps: true,
		tableName: 'user'
	});
};
