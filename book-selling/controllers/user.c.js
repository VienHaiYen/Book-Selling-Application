const { paginationResponse } = require("../helpers/pagination")
const { User } = require("../models")

module.exports.getUserList = async (req, res, next) => {
    try {
        let { page = "1", pageSize = "10" } = req.query
        page = parseInt(page)
        pageSize = parseInt(pageSize)

        const userList = await User.getAll(page, pageSize)
        const total = await User.count();

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
        if (userId != req.user.id) {
            throw new Error('Forbidden')
        }
        const { address, full_name, phone } = req.body
        const updateUser = new User({
            ...req.user,
            address, full_name, phone
        })
        const updatedUser = await updateUser.save()
        res.send(updatedUser)
    } catch (error) {
        next(error)
    }
}