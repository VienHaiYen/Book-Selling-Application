const { db } = require("../configs/postgres.js");
const { accountSQL } = require("./sql/index.js");

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
}