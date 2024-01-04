const { db } = require("../configs/postgres.js");
const { accountSQL } = require("./sql/index.js");

module.exports = class Account {
    constructor({ id, balance }) {
        this.id = id;
        this.balance = balance;
    }
    
    static async create({ id }) {
        const account = new Account({ id, balance });
        return db.one(accountSQL.add, [account.id]);
    }
}