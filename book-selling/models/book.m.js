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

  static async getById(id) {
    try {
      return await db.oneOrNone(bookSQL.getById, [id]).then((book) => new Book(book))
    } catch (err) {
      return null;
    }
  }

  static async getByTitle(title, page, pageSize) {
    try {
      return await db.manyOrNone(bookSQL.getByTitle, [`%${title}%`, pageSize, pageSize * (page - 1)]).then((books) => books.map((book) => new Book(book)))
    } catch (err) {
      return null;
    }
  }

  static async add(book) {
    const newBook = new Book(book)
    return await db.one(bookSQL.add,
      [newBook.title, newBook.language, newBook.description, newBook.thumbnail, newBook.publisher, newBook.published_year, newBook.page_count]
    ).then((book) => new Book(book))
  }

  static async update(bookId, updateData) {
    let sql = 'UPDATE public."books" SET';

    const params = [];

    for (let key in updateData) {
      if (updateData.hasOwnProperty(key)) {
        const value = updateData[key];
        if (value !== undefined) {
          sql += ` ${key} = $${params.length + 1},`;
          params.push(value);
        }
      }
    }

    // Remove trailing comma and add WHERE clause
    sql = sql.slice(0, -1) + ` WHERE id = ${bookId} RETURNING *;`;

    return await db.oneOrNone(sql, params).then((book) => new Book(book))
  }

};
