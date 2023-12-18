const { userController } = require("../controllers");
const { verifyUser } = require("../middlewares/verifyUser");
const { User } = require("../models");


const router = require("express").Router();

router.get("/amount", verifyUser(User.roles.admin), userController.getAmount)
router.get("/:userId", verifyUser(User.roles.client), userController.getUser)
router.put("/:userId", verifyUser(), userController.updateUser)
router.get("/", verifyUser(User.roles.admin), userController.getUserList)

module.exports = router