const { transactionController } = require('../controllers');

const Router = require('express').Router;
const router = Router();

router.post("/purchase-order", transactionController.purchaseOrder)
router.post("/deposit", transactionController.deposit)

module.exports = router;
