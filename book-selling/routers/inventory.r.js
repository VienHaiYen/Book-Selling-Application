const router = require("express").Router();
const { inventoryController } = require("../controllers");

router.get(
  "/availableQuantity/:itemId",
  inventoryController.getAvailableQuantity
);
router.put("/:itemId", inventoryController.updateById);
module.exports = router;
