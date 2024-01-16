const { userController } = require("../controllers");
const { verifyUser } = require("../middlewares/verifyUser");
const { User } = require("../models");

const router = require("express").Router();

router.get("/amount", verifyUser(User.roles.admin), userController.getAmount);
router.get("/balance", verifyUser(), userController.getBalance);
router.post("/deposit", verifyUser(), userController.deposit);
router.get("/:userId", verifyUser(), userController.getUser);
router.put("/:userId", verifyUser(), userController.updateUser);
router.delete("/:userId", verifyUser(), userController.deleteUser);
router.get("/", verifyUser(User.roles.admin), userController.getUserList);
router.get("/payment/history", verifyUser(), userController.listPaymentHistory);
router.get("/payment/total", verifyUser(), userController.getTotalPayment);

module.exports = router;
