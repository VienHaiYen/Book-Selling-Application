const { Account } = require("../models");

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