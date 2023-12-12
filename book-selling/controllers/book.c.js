const { Book } = require('../models');

async function getAll(req, res, next) {
  try {
    const rs = await Book.getAll()
    if (rs === null) {
      throw new Error()
    } else {
      return res.status(200).send(rs)
    }
  } catch (err) {
    console.log(err)
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
  getCategories,
}
