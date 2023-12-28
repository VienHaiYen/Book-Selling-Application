const router = require("express").Router();
const { inventoryController } = require("../controllers");

router.get(
  "/inventory/availableQuantity",
  inventoryController.getAvailableQuantity
);
module.exports = router;
