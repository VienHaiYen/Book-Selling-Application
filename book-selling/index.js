const express = require("express");
const path = require("path");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const app = express();
PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(__dirname + "/views"));
app.use(express.static(__dirname + "/public"));

app.set("view engine", "html");
app.set("views", "views");

// Routers
// const options = { root: path.join(__dirname, "../views") };

const routers = require("./routers");
const { bookController, authorController, categoryController } = require("./controllers");
app.use("/users", routers.userRouter);
app.use("/", routers.authRouter);
app.get("/", function (req, res) {
  res.sendFile("./views/index.html", options);
});

app.use("/books", routers.bookRouter);
app.use("/categories", routers.categoryRouter);
app.use("/", routers.cartRouter);
app.use("/", routers.inventoryRouter);
app.use("/", routers.orderRouter);

app.get("/search", async (req, res) => {
  try {
    const books = await bookController.getByTitle(req, res)
    const authors = await authorController.getByName(req, res)
    const categories = await categoryController.getByName(req, res)

    res.send({ books, authors, categories })
  } catch (err) {
    console.error('Error: ', err)
    res.status(500).send('Unknown Error')
  }
})

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send("Internal Error");
});
// app.use("/", routers);
app.listen(PORT, () => console.log(`Server is running at port ${PORT}`));
