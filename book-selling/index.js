const express = require("express");
const path = require("path");
const cors = require("cors");

require("dotenv").config();

const app = express();
PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", routers);
app.listen(PORT, () => console.log(`Server is running at port ${PORT}`));
