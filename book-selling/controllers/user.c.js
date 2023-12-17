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