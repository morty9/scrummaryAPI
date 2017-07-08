const Sequelize = require('sequelize');

module.exports = (api) => {
    return api.sequelize.define('Token', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        id_user: Sequelize.INTEGER
    }, {
        timestamps: true,
        tableName: 'token'
    });
};
