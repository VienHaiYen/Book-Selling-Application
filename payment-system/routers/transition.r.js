const { transactionController } = require('../controllers');

const Router = require('express').Router;
const router = Router();

router.post("/purchase-order", transactionController.purchaseOrder)

module.exports = router;
