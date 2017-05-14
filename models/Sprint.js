const Sequelize = require('sequelize');

module.exports = (api) => {
  return api.sequelize.define('Sprint', {
    id: {
      type: Sequelize.INTEGER,
      autoIncremen: true,
      primaryKey: true
    },
    beginningDate: Sequelize.DATE,
    endDate: Sequelize.DATE,
    id_listTasks: Sequelize.STRING
  }, {
    timestamps: true,
    tableName: 'sprint'
  });
}
