const { db } = require("../configs/postgres.js");
const { dashboardSQL } = require("./sql");

module.exports = class Order {
  constructor() {}
  static async getTodayOverallReport() {
    try {
      let result = await db.oneOrNone(dashboardSQL.getTodayOverallReport);
      return result;
    } catch (err) {
      console.error(err);
      return null;
    }
  }
  static async getThisWeekOverallReport() {
    try {
      let result = await db.oneOrNone(dashboardSQL.getThisWeekOverallReport);
      return result;
    } catch (err) {
      console.error(err);
      return null;
    }
  }
  static async getThisMonthOverallReport() {
    try {
      let result = await db.oneOrNone(dashboardSQL.getThisMonthOverallReport);
      return result;
    } catch (err) {
      console.error(err);
      return null;
    }
  }
  static async getThisYearOverallReport() {
    try {
      let result = await db.oneOrNone(dashboardSQL.getThisYearOverallReport);
      return result;
    } catch (err) {
      console.error(err);
      return null;
    }
  }
  static async getThisWeekDetailReport() {
    try {
      let result = await db.manyOrNone(dashboardSQL.getThisWeekDetailReport);
      return result;
    } catch (err) {
      console.error(err);
      return null;
    }
  }
};
