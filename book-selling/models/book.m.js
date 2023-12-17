const { pgp, db } = require("../configs/postgres.js");

module.exports = {
  getAllBook: async () => {
    try {
      const rs = await db.many(`SELECT * FROM public."books"
      ORDER BY id ASC LIMIT 50`);
      return rs;
    } catch (err) {
      return null;
    }
  },
  getBookById: async (id) => {
    try {
      const rs = await db.oneOrNone(`SELECT * FROM public."books" as b
      WHERE b.id = ${id}`)
      return rs;
    } catch (err) {
      return null;
    }
  },
  getCategories: async () => {
    try {
      const rs = await db.many(`SELECT  * FROM public."categories"
            ORDER BY name`);
      return rs;
    } catch (err) {
      return null;
    }
  },
};
