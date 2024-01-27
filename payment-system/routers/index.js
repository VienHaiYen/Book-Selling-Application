const accountRouter = require("./account.r.js");
const transitionRouter = require("./transition.r.js");
const shopRouter = require("./shop.r.js");

const Router = require('express').Router;
const router = Router();

router.use("/accounts", accountRouter);
router.use("/transactions", transitionRouter);
router.use("/shop", shopRouter);

module.exports = router;