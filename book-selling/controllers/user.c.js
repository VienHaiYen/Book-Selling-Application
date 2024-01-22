const cookieOption = require("../configs/cookieOption");
const { commonErrorResponse } = require("../helpers/errorRes");
const { commonSuccessfulResponse } = require("../helpers/successfulRes");
const { paginationResponse } = require("../helpers/pagination");
const { User } = require("../models");
const paymentConfig = require("../configs/payment");
const fetch = require("node-fetch");


module.exports.getUserList = async (req, res, next) => {
  try {
    // pagination
    let { page = "1", pageSize = "10" } = req.query;
    page = parseInt(page);
    pageSize = parseInt(pageSize);

    // filter email
    const { email = "" } = req.query;

    const userList = await User.searchByEmail(email, page, pageSize);

    const total = await User.countSearchResult(email);

    res.send(paginationResponse(total, page, userList));
  } catch (error) {
    next(error);
  }
};

module.exports.getAmount = async (req, res, next) => {
  try {
    const amount = await User.count();
    res.send({
      amount: amount,
    });
  } catch (error) {
    next(error);
  }
};

module.exports.getUser = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const user = await User.getById(userId);
    res.send(user);
  } catch (error) {
    next(error);
  }
};

module.exports.updateUser = async (req, res, next) => {
  try {
    const { userId } = req.params;
    if (req.user.role !== User.roles.admin && userId != req.user.id) {
      return res.status(403).send(commonErrorResponse("Forbidden"));
    }
    const { address, full_name, phone, avatar } = req.body;
    const updateUser = new User({
      ...(await User.getById(userId)),
      address,
      full_name,
      phone,
      avatar,
    });
    const updatedUser = await updateUser.save();
    res.send(updatedUser);
  } catch (error) {
    next(error);
  }
};

module.exports.deleteUser = async (req, res, next) => {
  try {
    const { userId } = req.params;
    if (req.user.role !== User.roles.admin && userId != req.user.id) {
      return res.status(403).send(commonErrorResponse("Forbidden"));
    }

    const deletedUser = await (await User.getById(userId)).delete();
    if (userId == req.user.id) {
      res.clearCookie("aToken", cookieOption);
    }
    res.send(deletedUser);
  } catch (error) {
    next(error);
  }
};

module.exports.getBalance = async (req, res, next) => {
  try {
    const { id } = req.user;
    const { balance } = await fetch(`${paymentConfig.url}/accounts/${id}`, {
       agent: paymentConfig.agent 
      }).then((res) => res.json());
    res.send({ balance });
    console.log(id, balance);
  } catch (error) {
    next(error);
  }
};

module.exports.deposit = async (req, res, next) => {
  try {
    const { id } = req.user;
    const { amount } = req.body;
    const { balance } = await fetch(
      `${paymentConfig.url}/transactions/deposit/${id}`,
      {
        agent: paymentConfig.agent,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: paymentConfig.apiKey,
        },
        body: JSON.stringify({ amount }),
      }
    ).then((res) => res.json());
    console.log(id, amount, balance);
    res.send({ balance });
  } catch (error) {
    next(error);
  }
};

module.exports.listPaymentHistory = async (req, res, next) => {
  try {
    const user_id = req.user.id;
    let { page = "1", pageSize = "10" } = req.query;
    let totalRecord = 0;
    page = parseInt(page);
    pageSize = parseInt(pageSize);
    const rs = await User.listPaymentHistory(user_id, page, pageSize);
    if (rs.length > 0) {
      totalRecord = Number(rs[0].total_count);
    }
    return res.send(paginationResponse(totalRecord, page, rs, pageSize));
  } catch (error) {
    next(error);
  }
};
module.exports.getTotalPayment = async (req, res, next) => {
  try {
    const user_id = req.user.id;
    const { method } = req.query;
    if (!user_id || !method) {
      return res.status(400).json(commonErrorResponse("Bad request"));
    }
    const rs = await User.getTotalPaid(user_id, method);
    return res.json(commonSuccessfulResponse(rs));
  } catch (error) {
    next(error);
  }
};
