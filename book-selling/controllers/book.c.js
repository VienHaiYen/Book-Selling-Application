const { Book } = require('../models');
const { paginationResponse } = require("../helpers/pagination")

async function getAll(req, res, next) {
  try {
    let { page = "1", pageSize = "10" } = req.query
    page = parseInt(page)
    pageSize = parseInt(pageSize)

    let totalRecord = 0

    const rs = await Book.getAll(page, pageSize)
    if (rs.length > 0) {
      totalRecord = Number(rs[0].count)
      res.send(paginationResponse(totalRecord, page, rs))
    }

  } catch (err) {
    next(err)
  }
}

async function getBookById(req, res, next) {
  try {
    const { bookId } = req.params

    if (bookId) {
      const rs = await Book.getBookById(bookId)
      return res.status(200).send(rs)
    } else {
      return res.status(200).send({})
    }
  } catch (err) {
    next(err)
  }
}

async function getBookByTitle(req, res, next) {
  try {
    const { bookTitle } = req.params
    let { page = "1", pageSize = "10" } = req.query
    page = parseInt(page)
    pageSize = parseInt(pageSize)

    let totalRecord = 0

    if (bookTitle && bookTitle.length > 0) {
      const rs = await Book.getBooksByTitle(bookTitle, page, pageSize)
      if (rs.length > 0) {
        totalRecord = Number(rs[0].count)
        res.send(paginationResponse(totalRecord, page, rs))
      }
    } else {
      return res.status(200).send([])
    }
  } catch (err) {
    next(err)
  }
}

async function addBook(req, res, next) {
  try {
    const book = new Book(req.body)
    const rs = await Book.addBook(book)
    if (rs.id) {
      res.status(200).send("Add Success")
    }
  } catch (err) {
    next(err)
  }
}

async function updateBook(req, res, next) {
  try {
    const { bookId } = req.params

    if (bookId) {
      const rs = await Book.getBookById(bookId)
      return res.status(200).send(rs)
    } else {
      return res.status(400).send("Book Not Found")
    }
  } catch (err) {
    next(err)
  }
}

module.exports = {
  getAll,
  getBookById,
  getBookByTitle,
  addBook,
}
