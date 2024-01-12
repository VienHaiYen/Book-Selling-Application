const { db } = require("../configs/postgres");
const Account = require("./account.m");
const { transactionSQL, accountSQL } = require("./sql");

module.exports = class Transaction {
    static transactionTypes = {
        purchaseOrder: 'purchase_order',
        deposit: 'deposit',
    }

    constructor({ id, payment_account_id, amount, transaction_type, transactionDate, description }) {
        this.id = id;
        this.payment_account_id = payment_account_id;
        this.amount = amount;
        if (!Object.values(Transaction.transactionTypes).includes(transaction_type)) {
            throw new Error('Invalid transaction type');
        }
        this.transaction_type = transaction_type;
        this.transactionDate = transactionDate;
        this.description = description;
    }

    static purchaseOrder = async (userAccountId, bookstoreId, amount, description) => {
        await db.tx(async t => {
            const deductUserBalance = await t.none(accountSQL.updateBalance, [userAccountId, -amount]);
            const addBookstoreBalance = await t.none(accountSQL.updateBalance, [bookstoreId, amount]);
            const insertNewTransaction = await t.none(transactionSQL.add, [userAccountId, amount, Transaction.transactionTypes.purchaseOrder, description]);
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