const routers = require("express").Router();
const { bookController } = require('../controllers');

routers.get("/all-books", bookController.getAll);

routers.get("/all-categories", bookController.getCategories);

module.exports = routers;
