const routers = require("express").Router();
const { verifyUser } = require("../middlewares/verifyUser");
const { bookController } = require("../controllers");
const { User } = require('../models')

routers.get("/", bookController.getAll);

routers.get("/:bookId", bookController.getById);

routers.post("/", verifyUser(User.roles.admin), bookController.add);

routers.put("/:bookId", verifyUser(User.roles.admin), bookController.update);

routers.delete("/:bookId", verifyUser(User.roles.admin), bookController.remove);

module.exports = routers;
