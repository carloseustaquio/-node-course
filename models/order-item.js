const Sequelize = require("sequelize");

const sequelize = require("../util/database");

// Classe que faz relação entre id dos carrinhos, produtos e quantidade.

const OrderItem = sequelize.define("orderItem", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  quantity: Sequelize.INTEGER
});

module.exports = OrderItem;
