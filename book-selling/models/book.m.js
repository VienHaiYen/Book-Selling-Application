const { pgp, db } = require('../configs/postgres.js')

module.exports = {
  getAll: async () => {
    try {
      const rs = await db.many(`SELECT * FROM public."books"
            ORDER BY id ASC `)
      return rs
    } catch (err) {
      console.log(err)
      return null
    }
  }
}
