const router = require("express").Router();
const { orderController } = require("../controllers");
const { inventoryController } = require("../controllers");
const { verifyUser } = require("../middlewares/verifyUser");
router.get("/detail/:id", orderController.getOrderById);
router.post(
  "/",
  verifyUser(),
  inventoryController.checkAvailableList,
  orderController.makeNewOrder
);
router.get("/user/:id", orderController.listOrdersByUserId);
router.get("/list", orderController.listOrders);
module.exports = router;
