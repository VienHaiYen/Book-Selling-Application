const { db } = require("../configs/postgres.js");
const { orderSQL } = require("./sql");

module.exports = class Order {
  constructor() {}
  static async makeNewOrder(user_id, item_list) {
    try {
      let result = await db.oneOrNone(orderSQL.makeNewOrder, [
        user_id,
        item_list,
      ]);
      return result.new_order_id;
    } catch (err) {
      console.error(err);
      return -1;
    }
  }
  static async getOrderById(order_id) {
    try {
      let result = await db.oneOrNone(orderSQL.getOrderById, [order_id]);
      return result;
    } catch (err) {
      console.error(err);
      return null;
    }
  }
  static async listOrdersByUserId(user_id, page, pageSize) {
    try {
      let result = await db.manyOrNone(orderSQL.getOrderByUserId, [
        user_id,
        pageSize,
        pageSize * (page - 1),
      ]);
      return result;
    } catch (err) {
      console.error(err);
      return null;
    }
  }
  static async listOrders(page, pageSize) {
    try {
      let result = await db.manyOrNone(orderSQL.getOrders, [
        pageSize,
        pageSize * (page - 1),
      ]);
      return result;
    } catch (err) {
      console.error(err);
      return null;
    }
  }
};
