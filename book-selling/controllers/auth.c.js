const User = require("../models/user.m")
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken')
const tokenOption = require("../configs/tokenOption")
const cookieOption = require("../configs/cookieOption")

module.exports = {
    signIn: async (req, res, next) => {
        try {
            const { email, password, role, address, full_name, phone } = req.body
            const user = new User({ email, password_hash: password, role, address, full_name, phone })
            if (await User.getByEmail(user.email)) {
                throw new Error("Email already in use")
            }
            const savedUser = await User.create(user)
            res.status(200).send(savedUser)
        } catch (error) {
            next(error)
        }
    },

    login: async (req, res, next) => {
        try {
            const { email, password } = req.body
            const userDb = await User.getByEmail(email);
            if (!userDb) {
                throw new Error("User does not exist")
            }

            const checkResult = await bcrypt.compare(password, userDb.password_hash)
            if (!checkResult) {
                throw new Error("Password incorrect")
            }
            const accessToken = jwt.sign(
                { email: userDb.email },
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