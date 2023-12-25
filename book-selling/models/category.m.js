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
      return await db.oneOrNone(categorySQL.getById, [id]).then((cate) => new Category(cate))
    } catch (err) {
      return null;
    }
  }

  static async add(cat) {
    const newCat = new Category(cat)
    return await db.one(bookSQL.add, [newCat.name]).then((cate) => new Category(cate))
  }
};
