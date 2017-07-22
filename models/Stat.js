const Sequelize = require('sequelize');

module.exports = (api) => {
  return api.sequelize.define('Stat', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    id_project : Sequelize.INTEGER
  }, {
    timestamps: true,
    tableName: 'stats'
  });
};
