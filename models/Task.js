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
		category: Sequelize.INTEGER,
		businessValue: Sequelize.FLOAT,
		duration: Sequelize.INTEGER,
		status: Sequelize.STRING,
		id_creator: Sequelize.INTEGER,
		taskDone: Sequelize.STRING,
		id_members: Sequelize.ARRAY(Sequelize.INTEGER)
	}, {
		timestamps: true,
		tableName: 'tasks'
	});
};
