const routers = require("express").Router();
const bookC = require('../controllers/book.c.js');

routers.get("/all-books", bookC.getAll);

routers.get("/all-categories", bookC.getCategories);

module.exports = routers;
