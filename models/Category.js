const Sequelize = require('sequelize');

module.exports = (api) => {
  return api.sequelize.define('Category', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    title: Sequelize.STRING
  }, {
    timestamps: true,
    tableName: 'categories'
  });
}
