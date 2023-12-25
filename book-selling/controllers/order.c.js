const { Order } = require("../models");
const { paginationResponse } = require("../helpers/pagination");
const { commonSuccessfulResponse } = require("../helpers/successfulRes");
const { commonErrorResponse } = require("../helpers/errorRes");

async function makeNewOrder(req, res, next) {
  try {
    user_id = 1;
    item_list = req.body.data;
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
module.exports = {
  makeNewOrder,
  getOrderById,
};
