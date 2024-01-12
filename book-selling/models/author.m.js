const { db } = require("../configs/postgres.js");
const Book = require("./book.m.js");
const { authorSQL } = require("./sql");

module.exports = class Author {
  constructor({ id, name, created_at, updated_at, count }) {
    this.id = id;
    this.name = name;
    this.created_at = created_at;
    this.updated_at = updated_at;
    this.count = count;
  }
  static async getAll() {
    try {
      return await db.manyOrNone(authorSQL.getAll).then((authors) => authors.map((author) => new Author(author)))
    } catch (err) {
      return null;
    }
  }

  static async getById(id) {
    try {
      const authorData = await db.oneOrNone(authorSQL.getById, [id]).then((author) => new Author(author))
      const bookData = await db.manyOrNone(authorSQL.getBooks, [id]).then((books) => books.map((book) => new Book(book)))

      return { author: authorData, books: bookData }

    } catch (err) {
      return null;
    }
  }

  static async getByName(name) {
    try {
      return await db.manyOrNone(authorSQL.getByName, [`%${name}%`]).then((authors) => authors.map((author) => new Author(author)))
    } catch (err) {
      return null;
    }
  }

  static async add(newAuthor) {
    return await db.one(authorSQL.add, [newAuthor.name]).then((author) => new Author(author))
  }

  static async update(id, updateData) {
    const params = [];
    Object.values(updateData).map((value) => params.push(value))
    return await db.oneOrNone(authorSQL.update, [id, ...params])
  }
};
