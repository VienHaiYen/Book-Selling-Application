const { Inventory } = require("../models");
const { paginationResponse } = require("../helpers/pagination");
const { commonSuccessfulResponse } = require("../helpers/successfulRes");
const { commonErrorResponse } = require("../helpers/errorRes");
async function getAvailableQuantity(req, res, next) {
  try {
    const { itemId } = req.params;
    if (!itemId) {
      res.json(commonErrorResponse("Invalid item"));
    }
    const rs = await Inventory.getAvailableQuantity(itemId);
    res.json(commonSuccessfulResponse(rs));
  } catch (err) {
    next(err);
  }
}
async function checkAvailableList(req, res, next) {
  try {
    const user_id = req.user.id;
    const item_list = req.body.item_list; // list of item_id in cart_item
    if (!user_id || !item_list || item_list.length < 1) {
      return res
        .status(400)
        .json(commonErrorResponse("fail to create new order"));
    }
    const rs = await Inventory.checkAvailableList(user_id, item_list);
    if (!rs) {
      //TODO return available updated item list
      return res
        .status(400)
        .json(
          commonErrorResponse(
            (msg = "Make new order fail"),
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
