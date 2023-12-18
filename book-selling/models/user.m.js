const bcrypt = require('bcrypt');
const { db } = require('../configs/postgres');
const { userSQL } = require('./sql');
const saltRounds = 10;

module.exports = class User {
    constructor({ username, password_hash, role = User.roles.client }) {
        this.username = username;
        this.password_hash = password_hash;
        this.role = Object.values(User.roles).includes(role) ? role : User.roles.client;
    }

    static roles = {
        client: "client",
        admin: "admin"
    }

    static async getByUsername(username) {
        return await db.oneOrNone(userSQL.getByUserName, [username])
            .then(user => user ? new User(user) : null)
    }

    static async create(user) {
        const password = user.password_hash
        const hashedPassword = await bcrypt.hash(password, saltRounds)
        const newUser = new User({ ...user, password_hash: hashedPassword })
        return db.one(userSQL.add, [newUser.username, newUser.password_hash, newUser.role])
            .then(user => new User(user))

    }
}