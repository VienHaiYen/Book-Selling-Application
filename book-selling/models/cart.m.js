const { db } = require("../configs/postgres.js");
const { cartSQL } = require("./sql");

class CartItem {
  constructor({ id, title, quantity, unit_price, thumbnail }) {
    this.id = id;
    this.title = title;
    this.quantity = quantity;
    this.unit_price = unit_price;
    this.thumbnail = thumbnail;
  }
}

module.exports = class Cart {
  constructor() {}

  static async getByUserId(user_id) {
    try {
      const result = await db.oneOrNone(cartSQL.getByUserId, [user_id]);
      if (result && result.cart_items) {
        return result.cart_items.map((item) => new CartItem(item));
      }
      return null;
    } catch (err) {
      console.error(err);
      return null;
    }
  }
};
