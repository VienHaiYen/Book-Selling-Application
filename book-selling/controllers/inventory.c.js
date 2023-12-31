const { Inventory } = require("../models");
const { paginationResponse } = require("../helpers/pagination");
const { commonSuccessfulResponse } = require("../helpers/successfulRes");
const { commonErrorResponse } = require("../helpers/errorRes");
async function getAvailableQuantity(req, res, next) {
  try {
    item_id = req.pagrams.idItem;
    const rs = await Inventory.getAvailableQuantity(item_id);
    res.json(commonSuccessfulResponse(rs));
  } catch (err) {
    next(err);
  }
}
async function checkAvailableList(req, res, next) {
  try {
    item_list = req.body.data;
    user_id = 1;
    const rs = await Inventory.checkAvailableList(user_id, item_list);
    if (!rs) {
      //TODO return available updated item list
      return res
        .status(400)
        .json(
          commonErrorResponse(
            (msg = "invalid quantity"),
            (detail = "Some items are out-of-stock or 0")
          )
        );
    } else {
      next();
    }
  } catch (err) {
    next(err);
  }
}
module.exports = {
  getAvailableQuantity,
  checkAvailableList,
};
