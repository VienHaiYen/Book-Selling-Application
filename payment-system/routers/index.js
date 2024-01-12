const accountRouter = require("./account.r.js");
const transitionRouter = require("./transition.r.js");

const Router = require('express').Router;
const router = Router();

router.use("/accounts", accountRouter);
router.use("/transitions", transitionRouter);

module.exports = router;