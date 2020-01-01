const Sequelize = require("sequelize");

const sequelize = require("../util/database");

// Classe que faz relação entre id dos carrinhos, produtos e quantidade.

const Orders = sequelize.define("order", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  }
});

module.exports = Orders;
