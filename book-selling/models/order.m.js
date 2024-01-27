const { db } = require("../configs/postgres.js");
const { orderSQL } = require("./sql");
const paymentConfig = require("../configs/payment");

module.exports = class Order {
  constructor() {}
  static async makeNewOrderByMePay(user_id, item_list) {
    try {
      return await db.tx(async (t) => {
        const { new_order_id } = await t.one(orderSQL.makeNewOrder, [
          user_id,
          item_list,
          "mepay",
          null,
        ]);
        const newOrder = await t.one(orderSQL.getOrderById, [new_order_id]);
        const { id: payment_id } = await fetch(
          `${paymentConfig.url}/transactions/purchase-order/${user_id}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              apikey: paymentConfig.apikey,
            },
            body: JSON.stringify({
              amount: newOrder.total,
              orderId: new_order_id,
            }),
          }
        ).then(async (res) => {
          const data = await res.json();
          await t.none(orderSQL.updatePaidState, [
            new_order_id,
            "mepay",
            data.id,
          ]);
          return data;
        });
        return new_order_id;
      });
    } catch (error) {
      console.error(error);
      return -1;
    }
  }
  static async makeNewOrder(user_id, item_list, payment_method = "cash") {
    try {
      let result = await db.oneOrNone(orderSQL.makeNewOrder, [
        user_id,
        item_list,
        payment_method,
        0,
      ]);
      await db.none(orderSQL.updatePaidState, [
        result.new_order_id,
        "cash",
        result.new_order_id,
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
