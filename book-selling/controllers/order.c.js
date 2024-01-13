const { Order } = require("../models");
const { paginationResponse } = require("../helpers/pagination");
const { commonSuccessfulResponse } = require("../helpers/successfulRes");
const { commonErrorResponse } = require("../helpers/errorRes");

async function makeNewOrder(req, res, next) {
  try {
    const user_id = req.user.id;
    const item_list = req.body.item_list; // list of item_id in cart_item
    const payment_method = req.body.payment_method;
    if (!user_id || !item_list || item_list.length < 1) {
      return res
        .status(400)
        .json(commonErrorResponse("Failed to create new order"));
    }

    let new_order_id;
    if (payment_method === "mepay") {
      new_order_id = await Order.makeNewOrderByMePay(user_id, item_list);
    } else if (payment_method === "cash") {
      new_order_id = await Order.makeNewOrder(user_id, item_list);
    } else {
      return res
        .status(400)
        .json(commonErrorResponse("Invalid payment method"));
    }

    if (!new_order_id || new_order_id === -1) {
      //TODO return available updated item list
      return res
        .status(400)
        .json(commonErrorResponse("Failed to create new order"));
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
async function listOrdersByUserId(req, res, next) {
  try {
    const { id } = req.params;
    let { page = "1", pageSize = "5" } = req.query;
    page = parseInt(page);
    pageSize = parseInt(pageSize);
    let totalRecord = 0;
    const rs = await Order.listOrdersByUserId(id, page, pageSize);
    if (rs.length > 0) {
      totalRecord = Number(rs[0].total);
    }
    res.send(paginationResponse(totalRecord, page, rs, pageSize));
  } catch (err) {
    next(err);
  }
}
async function listOrders(req, res, next) {
  try {
    let { page = "1", pageSize = "5" } = req.query;
    page = parseInt(page);
    pageSize = parseInt(pageSize);
    let totalRecord = 0;
    const rs = await Order.listOrders(page, pageSize);
    if (rs.length > 0) {
      totalRecord = Number(rs[0].total);
    }
    res.send(paginationResponse(totalRecord, page, rs, pageSize));
  } catch (err) {
    next(err);
  }
}
module.exports = {
  makeNewOrder,
  getOrderById,
  listOrdersByUserId,
  listOrders,
};
