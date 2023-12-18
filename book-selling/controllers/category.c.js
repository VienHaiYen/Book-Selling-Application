const { Category } = require("../models")

async function getAll(req, res, next) {
    try {
        const rs = await Category.getAll()
        if (rs === null) {
            throw new Error()
        } else {
            return res.status(200).send(rs)
        }
    } catch (err) {
        next(err)
    }
}

module.exports = {
    getAll,
}
