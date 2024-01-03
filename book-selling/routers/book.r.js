const routers = require("express").Router();
const { bookController } = require("../controllers");

routers.get("/", bookController.getAll);

routers.get("/:bookId", bookController.getById);

routers.post("/", bookController.add);

routers.put("/:bookId", bookController.update);

module.exports = routers;
