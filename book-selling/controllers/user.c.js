const cookieOption = require("../configs/cookieOption")
const { paginationResponse } = require("../helpers/pagination")
const { User } = require("../models")

module.exports.getUserList = async (req, res, next) => {
    try {
        // pagination
        let { page = "1", pageSize = "10" } = req.query
        page = parseInt(page)
        pageSize = parseInt(pageSize)

        // filter email
        const { email = "" } = req.query

        const userList = await User.searchByEmail(email, page, pageSize)

        const total = await User.countSearchResult(email);

        res.send(paginationResponse(total, page, userList))
    } catch (error) {
        next(error)
    }
}

module.exports.getAmount = async (req, res, next) => {
    try {
        const amount = await User.count();
        res.send({
            amount: amount
        })
    } catch (error) {
        next(error)
    }
}

module.exports.getUser = async (req, res, next) => {
    try {
        const { userId } = req.params
        const user = await User.getById(userId)
        res.send(user)
    } catch (error) {
        next(error)
    }
}

module.exports.updateUser = async (req, res, next) => {
    try {
        const { userId } = req.params
        if (req.user.role !== User.roles.admin && userId != req.user.id) {
            throw new Error('Forbidden')
        }
        const { address, full_name, phone } = req.body
        const updateUser = new User({
            ...(await User.getById(userId)),
            address, full_name, phone
        })
        const updatedUser = await updateUser.save()
        res.send(updatedUser)
    } catch (error) {
        next(error)
    }
}

module.exports.deleteUser = async (req, res, next) => {
    try {
        const { userId } = req.params
        if (req.user.role !== User.roles.admin && userId != req.user.id) {
            throw new Error("Forbidden")
        }

        const deletedUser = await (await User.getById(userId)).delete()
        if (userId == req.user.id) {
            res.clearCookie('aToken', cookieOption)
        }
        res.send(deletedUser)
    } catch (error) {
        next(error)
    }
}