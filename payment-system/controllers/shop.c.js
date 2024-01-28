const { getOffset, paginationResponse } = require("../helpers/pagination");
const { Account, Transaction } = require("../models");

module.exports.getBalance = async (req, res, next) => {
    try {
        const bookstoreId = req.user.id;

        const { balance } = await Account.get(bookstoreId);
        res.status(200).send({ balance });
    } catch (err) {
        console.error(err);
        res.status(500).send("Failed to get balance");
    }
}

module.exports.getTransactions = async (req, res, next) => {
    try {
        // pagination
        let { page = "1", pageSize = "10" } = req.query;
        page = parseInt(page);
        pageSize = parseInt(pageSize);
        const offset = getOffset(page, pageSize);

        const bookstoreId = req.user.id;
        const [transactions, count] = await Transaction.getTransactions(bookstoreId, offset, pageSize);
        res.status(200).send(paginationResponse(count, page, transactions, pageSize));
    } catch (err) {
        console.error(err);
        res.status(500).send("Failed to get transactions");
    }
}