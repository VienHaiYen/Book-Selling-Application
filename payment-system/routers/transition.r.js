const { transactionController } = require('../controllers');
const verifyApiKey = require('../middlewares/verifyApiKey');

const Router = require('express').Router;
const router = Router();

router.post("/purchase-order/:paymentAccountId",
    verifyApiKey,
    transactionController.checkPaymentAccount,
    transactionController.purchaseOrder
)

router.post("/deposit/:paymentAccountId",
    transactionController.checkPaymentAccount,
    transactionController.deposit
)

module.exports = router;
