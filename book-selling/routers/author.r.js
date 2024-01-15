const routers = require("express").Router();
const { authorController } = require("../controllers");
const { verifyUser } = require("../middlewares/verifyUser");
const { User } = require("../models");

routers.get("/", authorController.getAll);

routers.get("/detail/:authorId", authorController.getById);

routers.post("/", verifyUser(User.roles.admin), authorController.add);

routers.put("/:authorId", verifyUser(User.roles.admin), authorController.update);

module.exports = routers;
