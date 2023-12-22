const { Cart } = require("../models");
const { paginationResponse } = require("../helpers/pagination");

async function getByUserId(req, res, next) {
  try {
    // let { page = "1", pageSize = "10" } = req.query;
    // page = parseInt(page);
    // pageSize = parseInt(pageSize);

    // let totalRecord = 0;
    const rs = await Cart.getByUserId(1);
    // if (rs.length > 0) {
    //   totalRecord = Number(rs[0].count);
    //   res.send(paginationResponse(totalRecord, page, rs));
    // }
    res.send(rs);
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getByUserId,
};
