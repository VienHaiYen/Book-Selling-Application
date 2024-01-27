const { shopController } = require("../controllers");
const verifyApiKey = require("../middlewares/verifyApiKey");

const Router = require("express").Router;
const router = Router();

router.get("/balance", verifyApiKey, shopController.getBalance);

module.exports = router;