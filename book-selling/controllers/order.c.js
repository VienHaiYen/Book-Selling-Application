const { Order } = require("../models");
const { paginationResponse } = require("../helpers/pagination");
const { commonSuccessfulResponse } = require("../helpers/successfulRes");
const { commonErrorResponse } = require("../helpers/errorRes");

async function makeNewOrder(req, res, next) {
  try {
    const user_id = req.user.id;
    const item_list = req.body.item_list; // list of item_id in cart_item
    if (!user_id || !item_list || item_list.length < 1) {
      return res
        .status(400)
        .json(commonErrorResponse("fail to create new order"));
    }
    const new_order_id = await Order.makeNewOrder(user_id, item_list);
    if (!new_order_id || new_order_id === -1) {
      //TODO return available updated item list
      return res
        .status(400)
        .json(commonErrorResponse("fail to create new order"));
    } else {
      //TODO return new order id
      return res.json(
        commonSuccessfulResponse({
          new_order_id: new_order_id,
        })
      );
    }
  } catch (err) {
    next(err);
  }
}
async function getOrderById(req, res, next) {
  try {
    const { id } = req.params;
    if (id) {
      const rs = await Order.getOrderById(id);
      return res.json(commonSuccessfulResponse(rs));
    } else {
      return res.status(400).json(commonErrorResponse("Invalid query"));
    }
  } catch (err) {
    next(err);
  }
}
async function getOrderByUserId(req, res, next) {
  try {
    const { id } = req.params;
    // TODO authz
    // const user_id = req.user.id;
    // if (!id || !user_id || id != user_id) {
    //   return res.status(401).json(commonErrorResponse("Unauthorized"));
    // }

    const rs = await Order.getOrderByUserId(id);
    return res.json(commonSuccessfulResponse(rs));
  } catch (err) {
    next(err);
  }
}
module.exports = {
  makeNewOrder,
  getOrderById,
  getOrderByUserId,
};
