const express = require("express");
const path = require("path");
const cors = require("cors");
require("dotenv").config();

const routers = require("./routers");

const app = express();
PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
// app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(__dirname + "/views"));
app.use(express.static(__dirname + "/public"));

app.set("view engine", "html");
app.set("views", "views");

// const options = { root: path.join(__dirname, "../views") };
app.get("/", function (req, res) {
  res.sendFile("./views/index.html", options);
});

// app.use("/", routers);
app.listen(PORT, () => console.log(`Server is running at port ${PORT}`));
