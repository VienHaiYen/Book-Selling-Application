
const User = require("../models/user.m")
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken')
const tokenOption = require("../configs/tokenOption")
const cookieOption = require("../configs/cookieOption")
const googleOption = require("../configs/googleOption")

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

            if(userDb.google_id){
                throw new Error("User is registerd by google")
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
            console.log(authData)
            // get client info from google
            const clientInfo = new GoogleUser(await (await fetch(
                googleOption.ggInfoApiUrl,
                {
                    method: 'get',
                    headers: { "Authorization": `Bearer ${authData.access_token}` }
                }
            )).json())
            console.log(clientInfo)
            // get or create new user
            let user = await User.getByEmail(clientInfo.email)
            if(!user){
                user = new User({
                    email: clientInfo.email,
                    full_name: clientInfo.name,
                    google_id: clientInfo.id,
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

