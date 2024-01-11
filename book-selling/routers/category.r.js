const routers = require("express").Router();
const { categoryController } = require("../controllers");
const { verifyUser } = require("../middlewares/verifyUser");
const { User } = require("../models");

routers.get("/", categoryController.getAll);

routers.get("/:categoryId", categoryController.getById);

routers.post("/", verifyUser(User.roles.admin), categoryController.add);

routers.put("/:categoryId", verifyUser(User.roles.admin), categoryController.update);

routers.delete("/:categoryId", verifyUser(User.roles.admin), categoryController.remove);

module.exports = routers;
