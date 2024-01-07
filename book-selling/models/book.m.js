const { db } = require("../configs/postgres.js");
const { bookSQL, authorSQL } = require("./sql");

module.exports = class Book {
  constructor({
    id,
    title,
    language,
    description,
    thumbnail,
    publisher,
    published_year,
    page_count,
    created_at,
    updated_at,
    count,
  }) {
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
      return await db.manyOrNone(bookSQL.getAll, [
        pageSize,
        pageSize * (page - 1),
      ]);
    } catch (err) {
      return null;
    }
  }

  static async getById(id) {
    try {
      const bookData = await db
        .oneOrNone(bookSQL.getById, [id])
        .then((book) => new Book(book));
      const authorData = await db.oneOrNone(bookSQL.getAuthor, [id]);

      return { book: bookData, author: authorData };
    } catch (err) {
      return null;
    }
  }

  static async getByTitle(title) {
    try {
      return await db
        .manyOrNone(bookSQL.getByTitle, [`%${title}%`])
        .then((books) => books.map((book) => new Book(book)));
    } catch (err) {
      return null;
    }
  }

  static async add(data) {
    const newBook = new Book(data);
    const author = await db.one(authorSQL.add, data.author_name);
    const book = await db.one(bookSQL.add, [
      newBook.title,
      newBook.language,
      newBook.description,
      newBook.thumbnail,
      newBook.publisher,
      newBook.published_year,
      newBook.page_count,
    ]);

    await db.none(bookSQL.addBookAuthor, [book.id, author.id]);
    await db.none(bookSQL.addBookCategory, [book.id, data.category_id]);

    return book;
  }

  static async update(bookId, updateData) {
    let sql = 'UPDATE public."books" SET';

    const params = [];

    Object.entries(updateData).map(([key, value]) => {
      if (value !== undefined) {
        sql += ` ${key} = $${params.length + 1},`;
        params.push(value);
      }
    });

    sql = sql.slice(0, -1) + ` WHERE id = ${bookId} RETURNING *;`;
    return await db.oneOrNone(sql, params).then((book) => new Book(book));
  }
};
