
const User = require("../models/user.m")
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken')
const tokenOption = require("../configs/tokenOption")
const cookieOption = require("../configs/cookieOption")
const googleOption = require("../configs/googleOption")
const { commonErrorResponse } = require("../helpers/errorRes")
const paymentConfig = require("../configs/payment")
class GoogleUser {
    constructor({ id, email, verified_email, name, given_name, family_name, picture, locale, }) {
        this.id = id
        this.email = email
        this.verified_email = verified_email
        this.name = name
        this.given_name = given_name
        this.family_name = family_name
        this.picture = picture
        this.locale = locale
    }
}

module.exports = {
    signIn: async (req, res, next) => {
        try {
            const { email, password, role, address, full_name, phone } = req.body
            const user = new User({ email, password_hash: password, role, address, full_name, phone })
            if (await User.getByEmail(user.email)) {
                return res.status(400).send(commonErrorResponse("Email already exists"))
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
                return res.status(404).send(commonErrorResponse("Account not found"))
            }

            if (userDb.google_id) {
                return res.status(400).send(commonErrorResponse("User is registerd by google"))
            }

            const checkResult = await bcrypt.compare(password, userDb.password_hash)
            if (!checkResult) {
                return res.status(400).send(commonErrorResponse("Password incorrect"))
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
    },

    googleLogin: async (req, res, next) => {
        try {
            res.redirect(`${googleOption.ggLoginUrl}?${googleOption.query.toString()}`)
        } catch (error) {
            next(error)
        }
    },

    googleLoginCallback: async (req, res, next) => {
        try {
            // get code
            const code = req.query.code
            // get access token
            const authData = await (await fetch(
                googleOption.ggAuthApiUrl,
                {
                    method: 'post',
                    headers: { 'Content-Type': "application/json" },
                    body: JSON.stringify(googleOption.getGGAuthApiOption(code))
                }
            )).json()
            // get client info from google
            const clientInfo = new GoogleUser(await (await fetch(
                googleOption.ggInfoApiUrl,
                {
                    method: 'get',
                    headers: { "Authorization": `Bearer ${authData.access_token}` }
                }
            )).json())
            // get or create new user
            let user = await User.getByEmail(clientInfo.email)
            if (!user) {
                user = new User({
                    email: clientInfo.email,
                    full_name: clientInfo.name,
                    google_id: clientInfo.id,
                    avatar: clientInfo.picture,
                })
                user = await User.create(user)
            }
            // set token
            const accessToken = jwt.sign(
                { email: user.email },
                process.env.ACCESS_TOKEN_SECRET,
                tokenOption.accessToken
            )
            res.cookie('aToken', accessToken, cookieOption)
            res.redirect("/")
        } catch (error) {
            next(error)
        }
    },
    getAuth: async (req, res, next) => {
        try {
            const { password_hash, ...user } = req.user
            res.send(user)
        } catch (error) {
            next(error)
        }
    },
    getBalance: async (req, res, next) => {
        try {
            const { balance } = await fetch(`${paymentConfig.url}/shop/balance`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    apikey: paymentConfig.apikey,
                },
            })
                .then(res => res.json())
            res.send({ balance })
        } catch (error) {
            next(error)
        }
    },

    getTransactions: async (req, res, next) => {
        try {
            // pagination
            let { page = "1", pageSize = "10" } = req.query;
            page = parseInt(page);
            pageSize = parseInt(pageSize);

            const { data, meta } = await fetch(`${paymentConfig.url}/shop/transactions?page=${page}&pageSize=${pageSize}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    apikey: paymentConfig.apikey,
                },
            })
                .then(res => res.json())
            const userIdList = data.map(item => item.payment_account_id)
            const userList = await User.getByIds(userIdList)
            const dateWithUserData = data.map(item => {
                const { payment_account_id, ...rest } = item
                const user = userList.find(user => user.id === payment_account_id)
                return {
                    ...rest,
                    user
                }
            })
        
            res.send({
                data: dateWithUserData,
                meta
            })
        } catch (error) {
            next(error)
        }
    }
}

// response from google
// {
//     id: '114180075313625028899',
//     email: 'haiyenvien2307@gmail.com',
//     verified_email: true,
//     name: 'Hải Yến Viên',
//     given_name: 'Hải Yến',
//     family_name: 'Viên',
//     picture: 'https://lh3.googleusercontent.com/a/ACg8ocIQzpTqJ9mOY3ywaDqy4TS14GJx3Gn6fMCrQHBMOw8Z=s96-c',
//     locale: 'vi'
//   }

