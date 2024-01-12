const router = require("express").Router();
const { orderController } = require("../controllers");
const { inventoryController } = require("../controllers");
const { verifyUser } = require("../middlewares/verifyUser");
router.get("/orders/detail/:id", orderController.getOrderById);
router.post(
  "/orders",
  verifyUser(),
  inventoryController.checkAvailableList,
  orderController.makeNewOrder
);
router.get("/orders/user/:id", orderController.listOrdersByUserId);
router.get("/orders/list", orderController.listOrders);
module.exports = router;
