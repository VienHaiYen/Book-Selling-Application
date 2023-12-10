const routers = require("express").Router();
const bookC = require('../controllers/book.c.js');

routers.get("/", async (req, res) => {
  const books = await bookC.getAll().then((data) => {
    console.log(data);
  });
  res.json(books);
});


module.exports = routers;
