const { Account, Transaction } = require("../models");

module.exports.purchaseOrder = async (req, res, next) => {
    try {
        const bookstoreId = req.user.id;

        let { amount, orderId } = req.body;
        amount = Number(amount);
        if (!amount || amount <= 0) {
            return res.status(400).send("Invalid amount");
        }
        // check enough balance
        const paymentAccount = new Account(req.paymentAccount);
        if (paymentAccount.balance < amount) {
            return res.status(400).send("Not enough balance");
        }

        // create transaction
        const transation = await Transaction.purchaseOrder(paymentAccount.id, bookstoreId, amount, orderId);
        res.status(201).send(transation);
    } catch (err) {
        console.error(err);
        res.status(500).send("Failed to create transaction");
    }
}

module.exports.deposit = async (req, res, next) => {
    try {
        const paymentAccount = new Account(req.paymentAccount);
        const { amount } = req.body;

        // create transaction
        const updatedAccount = await Transaction.deposit(paymentAccount.id, amount || 0);
        res.status(201).send(updatedAccount);
    } catch (err) {
        console.error(err);
        res.status(500).send("Failed to create transaction");
    }
}

module.exports.checkPaymentAccount = async (req, res, next) => {
    try {
        const { paymentAccountId } = req.params;

        // check if payment account exists
        const paymentAccount = await Account.get(paymentAccountId);
        if (!paymentAccount) {
            return res.status(400).send("Payment account not found");
        }

        req.paymentAccount = paymentAccount;
        next();
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal server error");
    }
}