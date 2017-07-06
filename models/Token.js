const Sequelize = require('sequelize');


module.exports = (api) => {
  return api.sequelize.define('Token', {
    id: {
      type: Sequelize.INTERGER,
      autoIncrement: true,
      primaryKey: true
    },
    userId: Sequelize.INTERGER
    }, {
      timestamps: true,
      tableName: 'auth'
    });
};
