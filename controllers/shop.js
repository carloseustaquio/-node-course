const Product = require("../models/product");
const Cart = require("../models/cart");

exports.getIndex = (req, res, next) => {
  Product.findAll()
    .then(products => {
      res.render("shop/index", {
        prods: products,
        pageTitle: "All Products",
        path: "/"
      });
    })
    .catch(err => console.log(err));
};

exports.getProducts = (req, res, next) => {
  Product.findAll()
    .then(products => {
      res.render("shop/product-list", {
        prods: products,
        pageTitle: "Shop",
        path: "/products"
      });
    })
    .catch(err => console.log(err));
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findByPk(prodId)
    .then(product => {
      res.render("shop/product-detail", {
        pageTitle: product.title,
        product: product,
        path: "/products"
      });
    })
    .catch(err => console.log(err));
  // Product.findAll({ where: { id: prodId } })
  //   .then(products => {
  //     res.render("shop/product-detail", {
  //       pageTitle: products[0].title,
  //       product: products[0],
  //       path: "/products"
  //     });
  //   })
  // .catch(err => console.log(err));
};

exports.getCart = (req, res, next) => {
  console.log(req.user.cart);
  req.user
    .getCart()
    .then(cart => {
      return cart
        .getProducts()
        .then(products => {
          res.render("shop/cart", {
            pageTitle: "Your Cart",
            path: "/cart",
            products: products
          });
        })
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
};

exports.postCart = (req, res, next) => {
  // adiciona produto ao carrinho
  const prodId = req.body.productId;
  let fetchedCart; // armazena carrinho selecionado
  let newQuantity = 1; // armazena quantidade do produto a ser inserida no carrinho.
  req.user
    .getCart()
    .then(cart => {
      // salva carrinho e chama produtos do carrinho
      fetchedCart = cart;
      return cart.getProducts({ where: { id: prodId } });
    })
    .then(products => {
      // recebe array com produto selecionado
      let product;
      if (products.length > 0) {
        // se array contiver algum produto, salva em variavel product
        product = products[0];
      }
      if (product) {
        // se houver product, atualiza sua quantidade
        const oldQuantity = product.cartItem.quantity;
        newQuantity = oldQuantity + 1;
        return product;
      }
      return Product.findByPk(prodId); // se não houver product, simplesmente retorna produto (após busca-lo em tabela products, caso contrário, retornaria undefined)
    })
    .then(product => {
      // adiciona produto ao carrinho
      return fetchedCart.addProduct(product, {
        through: { quantity: newQuantity }
      });
    })
    .then(() => {
      res.redirect("/cart");
    })
    .catch(err => console.log(err));
};

exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  req.user
    .getCart()
    .then(cart => {
      return cart.getProducts({ where: { id: prodId } });
    })
    .then(products => {
      const product = products[0];
      return product.cartItem.destroy();
    })
    .then(result => {
      res.redirect("/cart");
    })
    .catch(err => {
      console.log(err);
    });
};

exports.getOrders = (req, res, next) => {
  res.render("shop/orders", {
    pageTitle: "Your Orders",
    path: "/orders"
  });
};

exports.getCheckout = (req, res, next) => {
  res.render("shop/checkout", {
    pageTitle: "Checkout",
    path: "/checkout"
  });
};
