const { accountController } = require("../controllers");
const verifyApiKey = require("../middlewares/verifyApiKey");

const Router = require("express").Router;
const router = Router();

router.post("/", verifyApiKey, accountController.createAccount);
router.get("/:accountId", accountController.getAccount);

module.exports = router;
