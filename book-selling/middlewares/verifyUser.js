const jwt = require("jsonwebtoken")
const { User } = require("../models")

const verifyAccessToken = async (token) => {
    try {
        const { username } = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        const user = await User.getByUsername(username)
        return user
    } catch (error) {
        throw new Error("Token expired")
    }
}

const verifyUser = (role) => async (req, res, next) => {
    try {
        const { aToken } = req.cookies
        if (!aToken) {
            throw new Error("Unauthenticated")
        }

        req.user = await verifyAccessToken(aToken);
        if (!!role && req.user.role !== role) {
            throw new Error("Forbidden")
        }

        next();
    } catch (error) {
        next(error)
    }
}

module.exports = { verifyUser }