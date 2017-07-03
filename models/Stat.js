const Sequelize = require('sequelize');

module.exports = (api) => {
  return api.sequelize.define('Project', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    listTasks: Sequelize.ARRAY(Sequelize.Task),
    sprintDuration: Sequelize.DATE,
    beginningDateProject: Sequelize.DATE
  }, {
    timestamps: true,
    tableName: 'stats'
  });
};
