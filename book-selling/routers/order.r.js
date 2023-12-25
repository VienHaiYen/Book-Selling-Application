const router = require("express").Router();
const { orderController } = require("../controllers");
const { inventoryController } = require("../controllers");

router.get("/orders/:id", orderController.getOrderById);
router.post(
  "/orders",
  inventoryController.checkAvailableList,
  orderController.makeNewOrder
);
module.exports = router;
