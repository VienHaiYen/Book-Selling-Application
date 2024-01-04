const { accountController } = require('../controllers');

const Router = require('express').Router;
const router = Router();

router.post("/", accountController.createAccount);

module.exports = router;
