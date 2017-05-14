const Sequelize = require('sequelize');

module.exports = (api) => {
	return api.sequelize.define('Task', {
		id: {
			type: Sequelize.INTEGER,
			autoIncrement: true,
			primaryKey: true
		},
		title: Sequelize.STRING,
		description: Sequelize.STRING,
		difficulty: Sequelize.INTEGER,
		priority: Sequelize.INTEGER,
		id_category: Sequelize.STRING,
		color: Sequelize.STRING,
		businessValue: Sequelize.FLOAT,
		duration: Sequelize.DATETIME,
		id_creator : Sequelize.INTEGER,
		id_members: Sequelize.INTEGER
	}, {
		timestamps: true,
		tableName: 'tasks'
	});
};
