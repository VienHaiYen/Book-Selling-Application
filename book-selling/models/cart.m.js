const { db } = require("../configs/postgres.js");
const { cartSQL } = require("./sql");

class CartItem {
  constructor({ id, item_id, title, quantity, unit_price, thumbnail }) {
    this.id = id;
    this.item_id = item_id;
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
      return [];
    } catch (err) {
      console.error(err);
      return [];
    }
  }
  static async updateQuantity(cart_id, item_id, new_quantity) {
    try {
      const result = await db.oneOrNone(cartSQL.updateQuantity, [
        cart_id,
        item_id,
        new_quantity,
      ]);
      if (result && result.new_quantity) {
        return result.new_quantity;
      }
      return 0;
    } catch (err) {
      console.error(err);
      return 0;
    }
  }
  static async removeItemById(cart_id, cart_item_id) {
    try {
      const result = await db.query(cartSQL.removeItemById, [
        cart_id,
        cart_item_id,
      ]);
    } catch (err) {
      console.error(err);
    }
  }
  static async addItem(cart_id, item_id, quantity) {
    try {
      const result = await db.one(cartSQL.addItem, [
        cart_id,
        item_id,
        quantity,
      ]);
      return result;
    } catch (err) {
      console.error(err);
    }
  }
};
