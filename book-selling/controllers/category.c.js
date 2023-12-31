const { Category } = require("../models")

async function getAll(_req, res, next) {
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

async function getById(req, res, next) {
  try {
    const { categoryId } = req.params

    if (categoryId) {
      const rs = await Category.getById(categoryId)
      return res.status(200).send(rs)
    } else {
      return res.status(404).send('Not Found')
    }
  } catch (err) {
    next(err)
  }
}

async function add(req, res, next) {
  try {
    const cate = new Category(req.body)
    const rs = await Category.add(cate)
    if (rs.id) {
      res.status(200).send("Add Success")
    }
  } catch (err) {
    next(err)
  }
}

async function update(req, res, next) {
  try {
    const { categoryId } = req.params
    const updateData = req.body

    const rs = await Category.update(categoryId, updateData)
    if (rs.id) {
      res.status(200).send("Update Success")
    }
  } catch (err) {
    next(err)
  }
}

module.exports = {
  getAll,
  getById,
  add,
  update,
}
