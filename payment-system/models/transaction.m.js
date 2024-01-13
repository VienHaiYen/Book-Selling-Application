const { db } = require("../configs/postgres");
const Account = require("./account.m");
const { transactionSQL, accountSQL } = require("./sql");

module.exports = class Transaction {
    static transactionTypes = {
        purchaseOrder: 'purchase_order',
        deposit: 'deposit',
    }

    constructor({ id, payment_account_id, amount, transaction_type, transaction_date, description }) {
        this.id = id;
        this.payment_account_id = payment_account_id;
        this.amount = amount;
        if (!Object.values(Transaction.transactionTypes).includes(transaction_type)) {
            throw new Error('Invalid transaction type');
        }
        this.transaction_type = transaction_type;
        this.transaction_date = transaction_date;
        this.description = description;
    }

    static purchaseOrder = async (userAccountId, bookstoreId, amount, orderId) => {
        return await db.tx(async t => {
            const updatedUserAccount = await t.one(accountSQL.updateBalance, [userAccountId, -amount])
                .then(account => new Account(account));
            const updatedBookStoreAccount = await t.one(accountSQL.updateBalance, [bookstoreId, amount])
                .then(account => new Account(account));

            const description = `Payment for order with id: ${orderId}`;
            const insertNewTransaction = await t.one(transactionSQL.add, [userAccountId, amount, Transaction.transactionTypes.purchaseOrder, description])
                .then(transaction => new Transaction(transaction));

            return insertNewTransaction;
        });
    }

    static deposit = async (userAccountId, amount) => {
        return await db.tx(async t => {
            const description = 'Deposit';
            const updatedAccount = await t.one(accountSQL.updateBalance, [userAccountId, amount])
                .then(account => new Account(account));
            const newTransaction = await t.one(transactionSQL.add, [userAccountId, amount, Transaction.transactionTypes.deposit, description])
                .then(transaction => new Transaction(transaction));

            return updatedAccount;
        });
    }
}