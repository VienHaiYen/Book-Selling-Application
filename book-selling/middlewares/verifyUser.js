const jwt = require("jsonwebtoken")
const { User } = require("../models")

const verifyAccessToken = async (token) => {
    try {
        const { email } = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        const user = await User.getByEmail(email)
        if (!user) {
            throw new Error("Token invalid")
        }
        return user
    } catch (error) {
        throw new Error("Token invalid")
    }
}

const verifyUser = (role) => async (req, res, next) => {
    try {
        const { aToken } = req.cookies
        if (!aToken) {
            return res.status(401).send(commonErrorResponse("Unauthenticated"))
        }

        try {
            req.user = await verifyAccessToken(aToken);
        } catch (error) {
            return res.status(401).send(commonErrorResponse("Unauthenticated"))
        }
        
        if (!!role && req.user.role !== role) {
            return res.status(403).send(commonErrorResponse("Forbidden"))
        }

        next();
    } catch (error) {
        next(error)
    }
}



module.exports = { verifyUser }