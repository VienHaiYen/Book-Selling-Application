const express = require("express");
const https = require("https");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(__dirname + "/views"));
app.use(express.static(__dirname + "/public"));

app.set("view engine", "html");
app.set("views", "views");

// Routers
const _ = require("./configs/app");
const router = require("./routers");
app.use("/", router);


app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send("Internal Error");
});
// app.use("/", routers);

// https server
const privateKey = process.env.PRIVATE_KEY;
const certificate = process.env.CERTIFICATE;
const credentials = { key: privateKey, cert: certificate };
const server = https.createServer(credentials, app);
server.listen(PORT, () => console.log(`Server is running at https://localhost:${PORT}`));
