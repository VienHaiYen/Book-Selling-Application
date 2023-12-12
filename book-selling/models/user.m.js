const userList = [];
const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports = class User {
    constructor({ username, password, role }) {
        this.username = username;
        this.password = password;
        this.role = role;
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
        const { password } = user
        const salt = await bcrypt.genSalt(saltRounds)
        const hashedPassword = await bcrypt.hash(password, salt)
        const newUser = new User({ ...user, password: hashedPassword })
        userList.push(newUser)

        return newUser
    }
}