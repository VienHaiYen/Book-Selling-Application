const { authController } = require("../controllers");
const { verifyUser } = require("../middlewares/verifyUser");

const router = require("express").Router();

router.post("/signin", authController.signIn)
router.post("/login", authController.login)
router.get("/login/google", authController.googleLogin)
router.get("/login/google/callback", authController.googleLoginCallback)
router.post("/logout", authController.logout)
router.get("/auth", verifyUser(), authController.getAuth)

// router.get("/logined", verifyUser(), (req, res, next) => { res.send("logined") })
// router.get("/admin", verifyUser(User.roles.admin), (req, res, next) => { res.send("admin") })
// router.get("/user", verifyUser(User.roles.client), (req, res, next) => { res.send("user") })

module.exports = router
