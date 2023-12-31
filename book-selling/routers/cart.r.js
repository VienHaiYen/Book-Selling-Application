const router = require("express").Router();
const { cartController } = require("../controllers");
const { verifyUser } = require("../middlewares/verifyUser");

router.get("/myCart", verifyUser(), cartController.getByUserId);
router.post("/myCart/item", verifyUser(), cartController.addItem);
router.put("/myCart/quantity", verifyUser(), cartController.updateQuantity);
router.delete("/myCart/item/:id", verifyUser(), cartController.removeItemById);

module.exports = router;
