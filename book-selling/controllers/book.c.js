const { Book } = require('../models');

async function getAll(req, res, next) {
  try {
    const rs = await Book.getAllBook()
    if (rs === null) {
      throw new Error()
    } else {
      return res.status(200).send(rs)
    }
  } catch (err) {
    next(err)
  }
}

async function getBookById(req, res, next) {
  try {
    if (req.query && req.query?.id) {
      const rs = await Book.getBookById(req.query.id)
      return res.status(200).send(rs)
    } else {
      throw new Error()
    }
  } catch (err) {
    next(err)
  }
}

async function getCategories(req, res, next) {
  try {
    const rs = await Book.getCategories()
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
  getBookById,
  getCategories,
}
