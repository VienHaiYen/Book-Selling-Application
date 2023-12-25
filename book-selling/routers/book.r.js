const routers = require("express").Router();
const { bookController } = require("../controllers");

routers.get("/books", bookController.getAll);

routers.get("/books/:bookId", bookController.getById);

routers.get("/books/:bookTitle", bookController.getByTitle);

routers.post("/books", bookController.add);

routers.put("/books/:bookId", bookController.update);

module.exports = routers;
