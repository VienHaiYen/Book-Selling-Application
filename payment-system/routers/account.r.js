const { accountController } = require('../controllers');

const Router = require('express').Router;
const router = Router();

router.post("/", accountController.createAccount);
router.get("/:accountId", accountController.getAccount);

module.exports = router;
