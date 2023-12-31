const router = require("express").Router();
const { inventoryController } = require("../controllers");

router.get(
  "/inventory/availableQuantity/:idItem",
  inventoryController.getAvailableQuantity
);
module.exports = router;
