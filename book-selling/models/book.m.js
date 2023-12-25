const { db } = require("../configs/postgres.js");
const { bookSQL } = require("./sql");

module.exports = class Book {
  constructor({ id, title, language, description, thumbnail, publisher, published_year, page_count, created_at, updated_at, count }) {
    this.id = id;
    this.title = title;
    this.language = language;
    this.description = description;
    this.thumbnail = thumbnail;
    this.publisher = publisher;
    this.published_year = published_year;
    this.page_count = page_count;
    this.created_at = created_at;
    this.updated_at = updated_at;
    this.count = count;
  }
  static async getAll(page, pageSize) {
    try {
      return await db.manyOrNone(bookSQL.getAll, [pageSize, pageSize * (page - 1)]).then((books) => books.map((book) => new Book(book)))
    } catch (err) {
      return null;
    }
  }

  static async getBookById(id) {
    try {
      return await db.oneOrNone(bookSQL.getById, [id]).then((book) => new Book(book))
    } catch (err) {
      return null;
    }
  }

  static async getBooksByTitle(title, page, pageSize) {
    try {
      return await db.manyOrNone(bookSQL.getByTitle, [`%${title}%`, pageSize, pageSize * (page - 1)]).then((books) => books.map((book) => new Book(book)))
    } catch (err) {
      return null;
    }
  }

  static async getCategories() {
    try {
      return await db.many(bookSQL.getCategories);
    } catch (err) {
      return null;
    }
  }

  static async addBook(book) {
    const newBook = new Book(book)
    return await db.one(bookSQL.addBook,
      [newBook.title, newBook.language, newBook.description, newBook.thumbnail, newBook.publisher, newBook.published_year, newBook.page_count]
    ).then((book) => new Book(book))
  }
};
