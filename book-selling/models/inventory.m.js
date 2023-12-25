const { db } = require("../configs/postgres.js");
const { inventorySQL } = require("./sql");

module.exports = class Inventory {
  constructor() {}
  static async getAvailableQuantity(item_id) {
    try {
      const result = await db.oneOrNone(inventorySQL.getAvailableQuantity, [
        item_id,
      ]);
      if (result) return result.available_quantity;
      else return 0;
    } catch (err) {
      console.error(err);
      return 0;
    }
  }
  static async checkAvailableList(user_id, item_list) {
    try {
      for (const item_key of item_list) {
        let isAvailable = await db.oneOrNone(
          inventorySQL.checkAvailableQuantity,
          [user_id, item_key]
        );
        if (!isAvailable || !isAvailable.exists) {
          return false;
        }
      }
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  }
};
