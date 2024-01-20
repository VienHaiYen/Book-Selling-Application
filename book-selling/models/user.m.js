const bcrypt = require("bcrypt");
const { db } = require("../configs/postgres");
const { userSQL } = require("./sql");
const { getOffset } = require("../helpers/pagination");
const saltRounds = 10;
const paymentConfig = require("../configs/payment");
const fetch = require("node-fetch");
module.exports = class User {
  constructor({
    id,
    email,
    password_hash = "",
    role = User.roles.client,
    google_id,
    address,
    full_name,
    phone,
    avatar,
  }) {
    this.id = id;
    this.email = email;
    this.password_hash = password_hash;
    this.google_id = google_id;
    this.role = Object.values(User.roles).includes(role)
      ? role
      : User.roles.client;
    this.address = address;
    this.full_name = full_name;
    this.phone = phone;
    this.avatar = avatar;
  }

  static roles = {
    client: "client",
    admin: "admin",
  };

  static async getByEmail(email) {
    const user = await db.oneOrNone(userSQL.getByEmail, [email]);
    return user ? new User(user) : null;
  }

  static async searchByEmail(email, page, pageSize) {
    const offset = getOffset(page, pageSize);
    return await db
      .any(userSQL.searchByEmail, [email, pageSize, offset])
      .then((userList) => userList.map((user) => new User(user)));
  }

  static async create(user) {
    const password = user.password_hash;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const newUser = new User({ ...user, password_hash: hashedPassword });
    return await db.tx(async (t) => {
      const user = await t
        .one(userSQL.add, [
          newUser.email,
          newUser.password_hash,
          newUser.role,
          newUser.address,
          newUser.full_name,
          newUser.phone,
          newUser.google_id,
          newUser.avatar,
        ])
        .then((user) => new User(user));
      const paymentAccount = await (
        await fetch(`${paymentConfig.url}/accounts`, {
          agent: paymentConfig.agent,
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            apikey: paymentConfig.apikey,
          },
          body: JSON.stringify({ accountId: user.id }),
        })
      ).json();
      return user;
    });
  }

  static async getAll(page, pageSize) {
    const offset = getOffset(page, pageSize);
    return await db
      .any(userSQL.get, [pageSize, offset])
      .then((userList) => userList.map((user) => new User(user)));
  }

  static async count() {
    return await db.one(userSQL.count).then((data) => parseInt(data.count));
  }

  static async countSearchResult(email) {
    return await db
      .one(userSQL.countSearchByEmail, [email])
      .then((data) => parseInt(data.count));
  }

  static async getById(id) {
    return await db
      .oneOrNone(userSQL.getById, [id])
      .then((user) => (user ? new User(user) : null));
  }

  async save() {
    return await db
      .one(userSQL.update, [
        this.id,
        this.address,
        this.full_name,
        this.phone,
        this.avatar,
      ])
      .then((user) => new User(user));
  }

  async delete() {
    return await db
      .oneOrNone(userSQL.delete, [this.id])
      .then((user) => (user ? new User(user) : null));
  }
  static async listPaymentHistory(user_id, page, pageSize) {
    const res = await db.manyOrNone(userSQL.listPaymentHistory, [
      user_id,
      pageSize,
      pageSize * (page - 1),
    ]);
    return res;
  }
  static async getTotalPaid(user_id, method) {
    const res = await db.oneOrNone(userSQL.getTotalPaid, [user_id, method]);
    if (!res.total_paid) {
      return 0;
    } else {
      return res.total_paid;
    }
  }
};
