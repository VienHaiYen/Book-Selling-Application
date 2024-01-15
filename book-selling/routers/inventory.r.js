const router = require("express").Router();
const { inventoryController } = require("../controllers");

router.get(
  "/availableQuantity/:itemId",
  inventoryController.getAvailableQuantity
);
router.put("/", inventoryController.updateById);
module.exports = router;
