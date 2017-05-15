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
    id_creato : Sequelize.INTEGER,
    id_listTasks: Sequelize.STRING,
    id_members :  Sequelize.ARRAY(Sequelize.INTEGER)
  }, {
    timestamps: true,
    tableName: 'sprint'
  });
}
