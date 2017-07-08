const Sequelize = require('sequelize');

module.exports = (api) => {
  return api.sequelize.define('Stat', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    id_Project : Sequelize.INTEGER,
    id_listTasks: Sequelize.ARRAY(Sequelize.INTEGER),
    sprintDuration: Sequelize.INTEGER,
    beginningDateProject: Sequelize.DATE
  }, {
    timestamps: true,
    tableName: 'stats'
  });
};
