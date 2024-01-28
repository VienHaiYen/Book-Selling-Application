const { db } = require("../configs/postgres.js");
const { accountSQL } = require("./sql/index.js");
const Transaction = require("./transaction.m.js");

module.exports = class Account {
    constructor({ id, balance = 0 }) {
        this.id = id;
        this.balance = balance;
    }

    static async create({ id }) {
        const account = new Account({ id });
        return db.one(accountSQL.add, [account.id]).then(account => new Account(account));
    }

    static async get(id) {
        return db.oneOrNone(accountSQL.get, [id]).then(account => account ? new Account(account) : null);
    }

    static async getTransactions(id, offset, limit) {
        const results = await db.any(accountSQL.getTransactions, [id, limit, offset]);
        const transactions = results.map(transaction => new Transaction(transaction));
        const count = parseInt(results.length > 0 ? results[0].total_count : 0);
        return [transactions, count]
    }
}