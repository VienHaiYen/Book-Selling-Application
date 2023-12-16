const User = require("../models/user.m")
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken')
const tokenOption = require("../configs/tokenOption")
const cookieOption = require("../configs/cookieOption")

module.exports = {
    signIn: async (req, res, next) => {
        try {
            const { username, password } = req.body
            const user = new User({ username, password_hash: password })
            if (await User.getByUsername(user.username)) {
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
            const userDb = await User.getByUsername(username);
            if (!userDb) {
                throw new Error("Username not exist")
            }

            const checkResult = await bcrypt.compare(password, userDb.password_hash)
            if (!checkResult) {
                throw new Error("Password incorrect")
            }
            const accessToken = jwt.sign(
                { username: userDb.username },
                process.env.ACCESS_TOKEN_SECRET,
                tokenOption.accessToken
            )
            res.cookie('aToken', accessToken, cookieOption)
            res.send(userDb)
        } catch (error) {
            next(error)
        }
    },

    logout: async (req, res, next) => {
        try {
            res.clearCookie('aToken', cookieOption)
            res.send("Logout successful")
        } catch (error) {
            next(error)
        }
    }
}