const routers = require("express").Router();
const bookC = require('../controllers/book.c.js');

routers.get("/", bookC.getAll);

module.exports = routers;
