const router = require("express").Router();
const { cartController } = require("../controllers");

router.get("/myCart", cartController.getByUserId);

module.exports = router;
