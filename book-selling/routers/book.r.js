const routers = require("express").Router();
const { bookController } = require('../controllers');

routers.get("/books", bookController.getAll);

routers.get("/books/:bookId", bookController.getBookById);

routers.get("/books/:bookTitle", bookController.getBookByTitle);

module.exports = routers;
