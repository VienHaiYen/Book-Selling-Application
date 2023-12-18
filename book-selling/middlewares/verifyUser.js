const jwt = require("jsonwebtoken")
const { User } = require("../models")

const verifyAccessToken = async (token) => {
    try {
        const { email } = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        const user = await User.getByEmail(email)
        return user
    } catch (error) {
        throw new Error("Token invalid")
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