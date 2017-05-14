const Sequelize = require('sequelize');

module.exports = (api) => {
  return api.sequelize.define('Project', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    title: Sequelize.STRING,
    wording: Sequelize.STRING,
    id_members: Sequelize.INTEGER,
    id_sprint: Sequelize.INTEGER
  }, {
    timestamps: true,
    tableName: 'project'
  });
}
