const { pgp, db } = require("../configs/postgres.js");

module.exports = {
  getAll: async () => {
    try {
      const rs = await db.many(`SELECT * FROM public."books"
      ORDER BY id ASC LIMIT 50`);
      console.log("getdata", rs);
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
