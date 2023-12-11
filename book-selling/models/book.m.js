const { pgp, db } = require('../configs/postgres.js')

module.exports = {
  getAll: async () => {
    try {
      const rs = await db.many(`SELECT * FROM public."books"
            ORDER BY id ASC LIMIT 50`)
      return rs
    } catch (err) {
      console.log(err)
      return null
    }
  }
}
