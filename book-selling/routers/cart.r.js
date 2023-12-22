const routers = require("express").Router();
const { cartController } = require("../controllers");

routers.get("/myCart", cartController.getByUserId);

module.exports = routers;
