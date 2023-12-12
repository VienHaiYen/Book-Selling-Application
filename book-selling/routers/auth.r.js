const { authController } = require("../controllers");

const router = require("express").Router();

router.post("/signin", authController.signIn)
router.post("/login", authController.login)

module.exports = router
