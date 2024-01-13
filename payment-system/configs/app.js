const { db } = require("./postgres");
const { accountSQL } = require('../models/sql/index.js');

const defaultAccountId = process.env.DEFAULT_ACCOUNT_ID || 0;
const createDefaultAccount = async () => {
    const defaultAccount = await db.oneOrNone(accountSQL.get, [defaultAccountId]);
    if (!defaultAccount) {
        await db.one(accountSQL.add, [defaultAccountId]);
        return console.log('Default account created');
    }
    return console.log('Default account already exists');
}
createDefaultAccount();

module.exports = {
    defaultAccountId
}