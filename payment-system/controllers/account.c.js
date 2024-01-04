const { Account } = require("../models");

module.exports.createAccount = async (req, res, next) => {
    try {
        const { accountId } = req.body;
        const account = await Account.create({ id: accountId });
        res.status(201).send(account);
    } catch (err) {
        next(err)
    }
}