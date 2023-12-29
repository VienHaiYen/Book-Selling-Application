const router = require("express").Router();
const { cartController } = require("../controllers");

router.get("/myCart", cartController.getByUserId);
router.post("/myCart/item", cartController.addItem);
router.put("/myCart/quantity", cartController.updateQuantity);
router.delete("/myCart/item/:id", cartController.removeItemById);

module.exports = router;
