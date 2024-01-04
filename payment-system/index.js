const express = require("express");
require("dotenv").config();

const app = express();
PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(__dirname + "/views"));
app.use(express.static(__dirname + "/public"));

app.set("view engine", "html");
app.set("views", "views");

// Routers
// const options = { root: path.join(__dirname, "../views") };
const routers = require("./routers");


app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send("Internal Error");
});
// app.use("/", routers);
app.listen(PORT, () => console.log(`Server is running at port ${PORT}`));
