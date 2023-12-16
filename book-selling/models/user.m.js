const userList = [];
const bcrypt = require('bcrypt');
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
        const res = userList.find(user => user.username === username)
        if (res) {
            return new User(res);
        } else {
            return undefined
        }
    }

    static async create(user) {
        const password = user.password_hash
        const hashedPassword = await bcrypt.hash(password, saltRounds)
        const newUser = new User({ ...user, password_hash: hashedPassword })
        userList.push(newUser)

        return newUser
    }
}