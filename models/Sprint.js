const Sequelize = require('sequelize');

module.exports = (api) => {
  return api.sequelize.define('Sprint', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    title: Sequelize.STRING,
    beginningDate: Sequelize.DATE,
    endDate: Sequelize.DATE,
    id_creator : Sequelize.INTEGER,
    id_listTasks: Sequelize.ARRAY(Sequelize.INTEGER),
    id_members :  Sequelize.ARRAY(Sequelize.INTEGER)
  }, {
    timestamps: true,
    tableName: 'sprints'
  });
}
