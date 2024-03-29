const routers = require("express").Router();
const { verifyUser } = require("../middlewares/verifyUser");
const { bookController } = require("../controllers");
const { User } = require("../models");

routers.get("/", bookController.getAll);

routers.get("/detail/:bookId", bookController.getById);

routers.get("/myBooks", verifyUser(), bookController.getMyBooks);

routers.post("/", verifyUser(User.roles.admin), bookController.add);

routers.put("/:bookId", verifyUser(User.roles.admin), bookController.update);

routers.put("/category/:bookId", bookController.updateCategory)

routers.put("/author/:bookId", bookController.updateAuthor)

routers.delete("/:bookId", verifyUser(User.roles.admin), bookController.remove);

module.exports = routers;
