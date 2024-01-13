const { commonErrorResponse } = require("../helpers/errorRes")
const { commonSuccessfulResponse } = require("../helpers/successfulRes")
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
      return rs && rs.category.id
        ? res.status(200).json(commonSuccessfulResponse(rs))
        : res.status(400).json(commonErrorResponse('Not Found'))
    } else {
      return res.status(400).json(commonErrorResponse('Invalid query'))
    }
  } catch (err) {
    next(err)
  }
}

async function add(req, res, next) {
  try {
    const cate = new Category(req.body)
    const rs = await Category.add(cate)
    return rs && rs.id 
      ? res.status(200).json(commonSuccessfulResponse("Add Success"))
      : res.status(400).json(commonErrorResponse("Fail fo create new category"))
  } catch (err) {
    next(err)
  }
}

async function getByName(req, res, next) {
  try {
    const searchTerm = req.query.q;

    if (searchTerm && searchTerm.length > 0) {
      return await Category.getByName(searchTerm)
    } else {
      return res.status(200).send([])
    }
  } catch (err) {
    next(err)
  }
}

async function update(req, res, next) {
  try {
    const { categoryId } = req.params
    const updateData = req.body

    const checkCate = await Category.getById(categoryId)
    const rs = checkCate && checkCate.category.id && await Category.update(categoryId, updateData)
    return (rs && rs.id)
      ? res.status(200).json(commonSuccessfulResponse("Update Success"))
      : res.status(400).json(commonErrorResponse("Invalid query"))
  } catch (err) {
    next(err)
  }
}

async function remove(req, res, next) {
  try {
    const { categoryId } = req.params
    const checkCate = await Category.getById(categoryId)

    const rs = checkCate && checkCate.category.id && await Category.update(categoryId, { "status": false })
    return (rs && rs.id)
      ? res.status(200).json(commonSuccessfulResponse("Remove Success"))
      : res.status(400).json(commonErrorResponse("Invalid query"))
  } catch (err) {
    next(err)
  }
}

module.exports = {
  getAll,
  getById,
  getByName,
  add,
  update,
  remove,
}
