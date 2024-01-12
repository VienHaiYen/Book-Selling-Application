const router = require("express").Router();
const { cartController } = require("../controllers");
const { verifyUser } = require("../middlewares/verifyUser");

router.get("/", verifyUser(), cartController.getByUserId);
router.post("/item", verifyUser(), cartController.addItem);
router.put("/quantity", verifyUser(), cartController.updateQuantity);
router.delete("/item/:id", verifyUser(), cartController.removeItemById);

module.exports = router;
