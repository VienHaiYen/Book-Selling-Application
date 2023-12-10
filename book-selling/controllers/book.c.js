const bookM = require('../models/book.m.js');

async function getAll(req, res, next) {
  try {
    const rs = await bookM.getAll()
    if (rs === null) {
      throw new Error()
    } else {
      return res.send(rs)
    }
  } catch (err) {
    console.log(err)
    next(err)
  }

}

module.exports = {
  getAll,
}
