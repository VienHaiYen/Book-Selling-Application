const { Cart } = require("../models");
const { commonSuccessfulResponse } = require("../helpers/successfulRes");
const { commonErrorResponse } = require("../helpers/errorRes");
const { paginationResponse } = require("../helpers/pagination");

async function getByUserId(req, res, next) {
  try {
    user_id = 1;
    if (!user_id) {
      return res
        .status(400)
        .json(commonErrorResponse("Invalid user id", user_id));
    }
    const rs = await Cart.getByUserId(user_id);
    return res.json(commonSuccessfulResponse(rs));
  } catch (err) {
    next(err);
  }
}
async function updateQuantity(req, res, next) {
  try {
    cart_id = req.body.cart_id || 1;
    item_id = req.body.item_id || 3;
    new_quantity = req.body.new_quantity || 1;
    if (!cart_id || !item_id || !new_quantity || new_quantity < 1) {
      return res.status(400).json(commonErrorResponse("Invalid Quantity"));
    }
    const rs = await Cart.updateQuantity(cart_id, item_id, new_quantity);

    return res.json(commonSuccessfulResponse(rs));
  } catch (err) {
    next(err);
  }
}
async function removeItemById(req, res, next) {
  try {
    cart_id = req.params.cart_id || 1;
    cart_item_id = req.params.id;
    if (!cart_id || !cart_item_id) {
      return res.status(400).json(commonErrorResponse("Invalid item"));
    }
    await Cart.removeItemById(cart_id, cart_item_id);
    return res.json(commonSuccessfulResponse(true));
  } catch (err) {
    next(err);
  }
}
async function addItem(req, res, next) {
  try {
    cart_id = req.body.cart_id || 1;
    item_id = req.body.item_id;
    quantity = req.body.quantity;
    if (!cart_id || !item_id || !quantity || quantity < 1) {
      return res.status(400).json(commonErrorResponse("Invalid payload"));
    }
    const rs = await Cart.addItem(cart_id, item_id, quantity);
    return res.json(commonSuccessfulResponse(rs));
  } catch (err) {
    next(err);
  }
}
module.exports = {
  getByUserId,
  updateQuantity,
  removeItemById,
  addItem,
};
