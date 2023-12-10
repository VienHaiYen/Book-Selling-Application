const bookM = require('../models/book.m.js');

async function getAll(req, res, next) {
  try {
    const rs = await bookM.getAll()
    console.log(rs)
    if (rs === null) {
      throw new Error()
    } else {
      return res.send(rs)
    }
  } catch (err) {
    next(err)
  }

}

module.exports = {
  getAll,
}
