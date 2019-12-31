const Sequelize = require("sequelize");

const sequelize = require("../util/database");

// Classe que faz relação entre id dos carrinhos, produtos e quantidade.

const CartItem = sequelize.define("cartItem", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  quantity: Sequelize.INTEGER
});

module.exports = CartItem;
