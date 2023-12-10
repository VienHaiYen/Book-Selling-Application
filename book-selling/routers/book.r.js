const routers = require("express").Router();
const bookC = require('../controllers/book.c.js');

routers.post("/", bookC.getAll);

module.exports = routers;
