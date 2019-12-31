const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("node-complete", "root", "SQL8000quero", {
  dialect: "mysql",
  host: "localhost"
});

module.exports = sequelize;
