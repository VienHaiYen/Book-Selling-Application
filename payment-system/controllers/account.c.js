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

module.exports.getAccount = async (req, res, next) => {
    try {
        const { accountId } = req.params;
        const account = await Account.get(accountId);
        if (!account) {
            return res.status(404).send("Not found");
        }
        res.status(200).send(account);
    } catch (err) {
        next(err)
    }
}