const { Book } = require('../models');
const { paginationResponse } = require("../helpers/pagination");
const { commonErrorResponse } = require('../helpers/errorRes');
const { commonSuccessfulResponse } = require('../helpers/successfulRes');

async function getAll(req, res, next) {
  try {
    let { page = "1", pageSize = "10" } = req.query
    page = parseInt(page)
    pageSize = parseInt(pageSize)

    let totalRecord = 0

    const rs = await Book.getAll(page, pageSize)
    if (rs.length > 0) {
      totalRecord = Number(rs[0].count)
      return res.status(200).send(paginationResponse(totalRecord, page, rs))
    } else {
      return res.status(200).send([])
    }
  } catch (err) {
    next(err)
  }
}

async function getById(req, res, next) {
  try {
    const { bookId } = req.params

    if (bookId) {
      const rs = await Book.getById(bookId)
      return rs && rs.book.id
        ? res.status(200).json(commonSuccessfulResponse(rs))
        : res.status(404).json(commonErrorResponse("Not found"))
    } else {
      return res.status(400).json(commonErrorResponse("Invalid query"));
    }
  } catch (err) {
    next(err)
  }
}

async function getByTitle(req, res, next) {
  try {
    const searchTerm = req.query.q;

    if (searchTerm && searchTerm.length > 0) {
      return await Book.getByTitle(searchTerm)
    } else {
      return res.status(200).send([])
    }
  } catch (err) {
    next(err)
  }
}

async function add(req, res, next) {
  try {
    const rs = await Book.add(req.body).then((book) => new Book(book))
    return rs && rs.id
      ? res.status(200).json(commonSuccessfulResponse("Add Success"))
      : res.status(400).json(commonErrorResponse("Fail fo create new book"))
  } catch (err) {
    next(err)
  }
}

async function update(req, res, next) {
  try {
    const { bookId } = req.params
    const updateData = req.body
    const checkBook = await Book.getById(bookId)

    const rs = checkBook && checkBook.id && await Book.update(bookId, updateData)
    return (rs && rs.id)
      ? res.status(200).json(commonSuccessfulResponse("Update Success"))
      : res.status(400).json(commonErrorResponse("Invalid query"))
  } catch (err) {
    next(err)
  }
}

async function remove(req, res, next) {
  try {
    const { bookId } = req.params
    const checkBook = await Book.getById(bookId)

    const rs = checkBook && checkBook.id && await Book.update(bookId, { "status": false })
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
  getByTitle,
  add,
  update,
  remove,
}
