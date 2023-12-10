const { pgp, db } = require('../configs/postgres')

module.exports = {
  getAll: async () => {
    try {
      var rs = await db.any(`SELECT * FROM public."books"
            ORDER BY id ASC `)
      return rs
    } catch (e) {
      return null
    }
  }
}
