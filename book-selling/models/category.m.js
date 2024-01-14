const { db } = require("../configs/postgres.js");
const { categorySQL } = require("./sql");

module.exports = class Category {
  constructor({ id, name, created_at, updated_at, count }) {
    this.id = id;
    this.name = name;
    this.created_at = created_at;
    this.updated_at = updated_at;
    this.count = count;
  }
  static async getAll() {
    try {
      return await db.manyOrNone(categorySQL.getAll).then((cates) => cates.map((cate) => new Category(cate)))
    } catch (err) {
      return null;
    }
  }

  static async getById(id) {
    try {
      const cateData = await db.oneOrNone(categorySQL.getById, [id]).then((cate) => new Category(cate))
      const bookData = await db.manyOrNone(categorySQL.getBooks, [id])

      return { category: cateData, books: bookData }
    } catch (err) {
      return null;
    }
  }

  static async getByName(name) {
    try {
      return await db.manyOrNone(categorySQL.getByName, [`%${name}%`]).then((cates) => cates.map((cate) => new Category(cate)))
    } catch (err) {
      return null;
    }
  }

  static async add(cat) {
    const newCat = new Category(cat)
    return await db.one(categorySQL.add, [newCat.name]).then((cate) => new Category(cate))
  }

  static async update(id, updateData) {
    let sql = 'UPDATE public."categories" SET ';

    const params = [];

    Object.entries(updateData).map(([key, value]) => {
      if (value !== undefined) {
        sql += `${key} = $${params.length + 1},`;
        params.push(value);
      }
    })

    sql = sql.slice(0, -1) + ` WHERE id = ${id} RETURNING *;`;
    return await db.oneOrNone(sql, params).then((cate) => new Category(cate))
  }
};
