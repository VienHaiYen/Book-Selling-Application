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
        .json(commonErrorResponse("Failed to create new order"));
    }
    const rs = await Inventory.checkAvailableList(user_id, item_list);
    if (!rs) {
      //TODO return available updated item list
      return res
        .status(400)
        .json(
          commonErrorResponse(
            (msg = "Make new order failed"),
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
async function updateById(req, res, next) {
  try {
    const item_id = req.body.book_id;
    var new_quantity = req.body.new_quantity;
    var new_unit_price = req.body.new_unit_price;
    var item = null;
    if (!item_id) {
      return res.status(400).json(commonErrorResponse("Invalid item"));
    } else {
      item = await Inventory.getAvailableQuantity(item_id);
      if (!item) {
        return res.status(400).json(commonErrorResponse("Item not found"));
      }
    }
    if (!new_quantity || new_quantity < 0) {
      new_quantity = item.available_quantity;
    }
    if (!new_unit_price || new_unit_price < 0) {
      new_unit_price = item.unit_price;
    }

    const rs = await Inventory.updateById(
      item_id,
      new_quantity,
      new_unit_price
    );
    if (rs) return res.json(commonSuccessfulResponse(rs));
    else
      return res
        .status(400)
        .json(commonErrorResponse("Failed to update inventory"));
  } catch (err) {
    next(err);
  }
}
module.exports = {
  getAvailableQuantity,
  checkAvailableList,
  updateById,
};
