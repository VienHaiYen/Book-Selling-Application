const { userController } = require("../controllers");
const { verifyUser } = require("../middlewares/verifyUser");
const { User } = require("../models");


const router = require("express").Router();

router.use(verifyUser(User.roles.admin))
router.get("/amount", userController.getAmount)
router.get("/", userController.getUserList)
router.get("/:userId", userController.getUser)

module.exports = router