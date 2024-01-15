const { Book, Category, Author } = require("../models");
const { paginationResponse } = require("../helpers/pagination");
const { commonSuccessfulResponse } = require("../helpers/successfulRes");
const { commonErrorResponse } = require("../helpers/errorRes");
async function getAll(req, res, next) {
  try {
    let { page = "1", pageSize = "10" } = req.query;
    page = parseInt(page);
    pageSize = parseInt(pageSize);

    let totalRecord = 0;

    const rs = await Book.getAll(page, pageSize);
    if (rs.length > 0) {
      totalRecord = Number(rs[0].count);
      return res.status(200).send(paginationResponse(totalRecord, page, rs));
    } else {
      return res.status(200).send([]);
    }
  } catch (err) {
    next(err);
  }
}

async function getById(req, res, next) {
  try {
    const { bookId } = req.params;

    if (bookId) {
      const rs = await Book.getById(bookId);
      return rs && rs.book.id
        ? res.status(200).json(commonSuccessfulResponse(rs))
        : res.status(404).json(commonErrorResponse("Not found"));
    } else {
      return res.status(400).json(commonErrorResponse("Invalid query"));
    }
  } catch (err) {
    next(err);
  }
}

async function getByTitle(req, res, next) {
  try {
    const searchTerm = req.query.q;

    if (searchTerm && searchTerm.length > 0) {
      return await Book.getByTitle(searchTerm);
    } else {
      return res.status(200).send([]);
    }
  } catch (err) {
    next(err);
  }
}

async function add(req, res, next) {
  try {
    const rs = await Book.add(req.body).then((book) => new Book(book));
    return rs && rs.id
      ? res.status(200).json(commonSuccessfulResponse("Add Success"))
      : res.status(400).json(commonErrorResponse("Failed fo create new book"));
  } catch (err) {
    next(err);
  }
}

async function update(req, res, next) {
  try {
    const { bookId } = req.params;
    const updateData = req.body;
    const checkBook = await Book.getById(bookId);
    const rs =
      checkBook && checkBook.book.id && (await Book.update(bookId, updateData));
    return rs && rs.id
      ? res.status(200).json(commonSuccessfulResponse("Update Success"))
      : res.status(400).json(commonErrorResponse("Failed to update"));
  } catch (err) {
    next(err);
  }
}

async function remove(req, res, next) {
  try {
    const { bookId } = req.params;
    const checkBook = await Book.getById(bookId);

    const rs =
      checkBook &&
      checkBook.book.id &&
      (await Book.update(bookId, { status: false }));
    return rs && rs.id
      ? res.status(200).json(commonSuccessfulResponse("Remove Success"))
      : res.status(400).json(commonErrorResponse("Failed to update"));
  } catch (err) {
    next(err);
  }
}
async function getMyBooks(req, res, next) {
  try {
    const userId = req.user.id;

    if (userId) {
      const rs = await Book.getMyBooks(userId);
      return res.json(commonSuccessfulResponse(rs));
    } else {
      return res.status(403).json(commonErrorResponse("Unauthorized"));
    }
  } catch (err) {
    next(err);
  }
}

async function updateCategory(req, res, next) {
  try {
    const { bookId } = req.params;
    const updateData = req.body;
    const checkBook = await Book.getById(bookId);
    const checkCate = await Category.getById(updateData.categoryId)
    if (checkCate && checkCate.category.id && checkBook && checkBook.book.id) {
      const rs = await Book.updateCategory(bookId, checkCate.category.id);
      return rs
        ? res.status(200).json(commonSuccessfulResponse("Update Success"))
        : res.status(400).json(commonErrorResponse("Failed to update"));
    } else {
      return res.status(400).json(commonErrorResponse("Invalid query"));
    }
  } catch (err) {
    next(err);
  }
}

async function updateAuthor(req, res, next) {
  try {
    const { bookId } = req.params;
    const updateData = req.body;
    const checkBook = await Book.getById(bookId);
    const checkAuthor = await Author.getByName(updateData.authorName)
    if (checkBook && checkBook.book.id) {
      const authorId = checkAuthor?.length && checkAuthor[0].id
        ? checkAuthor[0].id
        : (await Author.add({ name: updateData.authorName })).id
      const rs = await Book.updateAuthor(bookId, authorId);
      return rs
        ? res.status(200).json(commonSuccessfulResponse("Update Success"))
        : res.status(400).json(commonErrorResponse("Failed to update"));
    } else {
      return res.status(400).json(commonErrorResponse("Invalid query"));
    }
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getAll,
  getById,
  getByTitle,
  getMyBooks,
  add,
  update,
  remove,
  updateCategory,
  updateAuthor,
};
