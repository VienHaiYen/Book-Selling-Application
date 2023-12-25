const { Cart } = require("../models");
const { commonSuccessfulResponse } = require("../helpers/successfulRes");
const { commonErrorResponse } = require("../helpers/errorRes");
const { paginationResponse } = require("../helpers/pagination");

async function getByUserId(req, res, next) {
  try {
    user_id = req.body.user_id;
    if (!user_id) {
      return res
        .status(400)
        .json(commonErrorResponse("Invalid user id", user_id));
    }
    const rs = await Cart.getByUserId(user_id);

    return res.json(commonSuccessfulResponse(rs));
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getByUserId,
};
