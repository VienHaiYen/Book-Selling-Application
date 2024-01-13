const router = require("express").Router();
const { inventoryController } = require("../controllers");

router.get(
  "/availableQuantity/:itemId",
  inventoryController.getAvailableQuantity
);
module.exports = router;
