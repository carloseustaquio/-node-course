const fs = require("fs");
const path = require("path");
const dirPath = require("../util/path");

const p = path.join(dirPath, "data", "cart.json");

module.exports = class Cart {
  static addProduct(id, productPrice) {
    // Fetch the previous cart

    fs.readFile(p, (err, fileContent) => {
      let cart = { products: [], totalPrice: 0 };
      if (!err) {
        cart = JSON.parse(fileContent);
      }

      // Analyze the cart => Find existing product

      const existingProductIndex = cart.products.findIndex(
        prod => prod.id === id
      );
      const existingProduct = cart.products[existingProductIndex];
      let updatedProduct;

      // Add new product / increase quantity

      // if the product already exist in the cart, update the quantity
      if (existingProduct) {
        updatedProduct = existingProduct;
        updatedProduct.qty = updatedProduct.qty + 1;
        cart.products = [...cart.products];
        cart.products[existingProductIndex] = updatedProduct;
      }

      // if the product doesn't exists in the cart, add it
      else {
        updatedProduct = { id: id, qty: 1 };
        cart.products = [...cart.products, updatedProduct];
      }
      cart.totalPrice = cart.totalPrice + +productPrice;
      fs.writeFile(p, JSON.stringify(cart), err => {
        console.log(err);
      });
    });
  }
};
