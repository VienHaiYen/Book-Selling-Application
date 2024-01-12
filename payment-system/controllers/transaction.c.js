const { commonErrorResponse } = require("../helpers/errorRes");
const { Account, Transaction } = require("../models");

module.exports.purchaseOrder = async (req, res, next) => {
    try {
        // Not implemented authorization yet
        const bookstoreId = 1;

        const { paymentAccountId, amount, description } = req.body;

        // check if payment account exists
        const paymentAccount = await Account.get(paymentAccountId);
        // check enough balance
        if (paymentAccount.balance < amount) {
            return res.status(400).send(commonErrorResponse("Not enough balance"));
        }

        // create transaction
        await Transaction.purchaseOrder(paymentAccountId, bookstoreId, amount, description);
        res.status(201).send("Success");
    } catch (err) {
        console.error(err);
        res.status(500).send(commonErrorResponse("Failed to create transaction"));
    }
}