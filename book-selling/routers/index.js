const authRouter = require("./auth.r");
const authorRouter = require("./author.r");
const bookRouter = require("./book.r");
const categoryRouter = require("./category.r");
const userRouter = require("./user.r");
const cartRouter = require("./cart.r");
const inventoryRouter = require("./inventory.r");
const orderRouter = require("./order.r");
const dashboardRouter = require("./dashboard.r");

module.exports = {
  authRouter,
  authorRouter,
  bookRouter,
  categoryRouter,
  userRouter,
  cartRouter,
  inventoryRouter,
  orderRouter,
  dashboardRouter,
};
