const User = require("../models/user.m")
const bcrypt = require("bcrypt")

module.exports = {
    signIn: async (req, res, next) => {
        try {
            const { username, password } = req.body
            const user = new User({ username, password })
            if (await User.getByUsername(username)) {
                throw new Error("Username already in use")
            }
            const savedUser = await User.create(user)
            const { role, ...userData } = savedUser
            res.status(200).send(userData)
        } catch (error) {
            next(error)
        }
    },

    login: async (req, res, next) => {
        try {
            const { username, password } = req.body 
            const user = await User.getByUsername(username);
            if(!user){
                throw new Error("Username not exist")
            }
            const checkResult = await bcrypt.compare(password, user.password)
            if (checkResult) {
                res.send(user)
            } else {
                throw new Error("Password incorrect")
            }
        } catch (error) {
            next(error)
        }
    }
}