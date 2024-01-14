const { Author, Book } = require("../models")

async function getAll(_req, res, next) {
  try {
    const rs = await Author.getAll()
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
    const { authorId } = req.params

    if (authorId) {
      const rs = await Author.getById(authorId)
      const books = rs.books.map(book => new Book(book)) || []
      return rs && rs.author.id
        ? res.status(200).json(commonSuccessfulResponse({ author: rs.author, books }))
        : res.status(400).json(commonErrorResponse('Not Found'))
    } else {
      return res.status(400).json(commonErrorResponse('Invalid query'))
    }
  } catch (err) {
    next(err)
  }
}

async function getByName(req, res, next) {
  try {
    const searchTerm = req.query.q;

    if (searchTerm && searchTerm.length > 0) {
      return await Author.getByName(searchTerm)
    } else {
      return res.status(200).send([])
    }
  } catch (err) {
    next(err)
  }
}

async function add(req, res, next) {
  try {
    const cate = new Author(req.body)
    const rs = await Author.add(cate)
    if (rs.id) {
      res.status(200).send("Add Success")
    }
  } catch (err) {
    next(err)
  }
}

async function update(req, res, next) {
  try {
    const { authorId } = req.params
    const updateData = req.body

    const rs = await Author.update(authorId, updateData)
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
  getByName,
  add,
  update,
}
