const authController = require("./auth.c.js");
const authorController = require("./author.c.js");
const bookController = require("./book.c.js");
const categoryController = require("./category.c.js");
const userController = require("./user.c.js");
const cartController = require("./cart.c.js");
const inventoryController = require("./inventory.c.js");
const orderController = require("./order.c.js");
const dashboardController = require("./dashboard.c.js");

module.exports = {
  authController,
  authorController,
  bookController,
  categoryController,
  userController,
  cartController,
  inventoryController,
  orderController,
  dashboardController,
};
