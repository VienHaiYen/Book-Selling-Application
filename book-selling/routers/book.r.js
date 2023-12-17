const routers = require("express").Router();
const { bookController } = require('../controllers');

routers.get("/books", bookController.getAll);

routers.get("/book", bookController.getBookById);

routers.get("/categories", bookController.getCategories);

module.exports = routers;
