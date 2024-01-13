const express = require("express");
const path = require("path");
const cors = require("cors");
// var bodyParser = require("body-parser");
const multer = require("multer");
const cookieParser = require("cookie-parser");
const stream = require("stream");
require("dotenv").config();

const app = express();
PORT = process.env.PORT || 3000;

const { google } = require("googleapis");
const upload = multer();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
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
const {
  bookController,
  authorController,
  categoryController,
} = require("./controllers");
app.use("/users", routers.userRouter);
app.use("/", routers.authRouter);
app.get("/", function (req, res) {
  res.sendFile("./views/index.html", options);
});

app.use("/books", routers.bookRouter);
app.use("/categories", routers.categoryRouter);
app.use("/myCart", routers.cartRouter);
app.use("/inventory", routers.inventoryRouter);
app.use("/orders", routers.orderRouter);
app.use("/dashboard", routers.dashboardRouter);

app.get("/search", async (req, res) => {
  try {
    const books = await bookController.getByTitle(req, res);
    const authors = await authorController.getByName(req, res);
    const categories = await categoryController.getByName(req, res);

    res.send({ books, authors, categories });
  } catch (err) {
    console.error("Error: ", err);
    res.status(500).send("Unknown Error");
  }
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send("Internal Error");
});
// app.use("/", routers);
app.listen(PORT, () => console.log(`Server is running at port ${PORT}`));

//// Google Drive API
const KEYFILEPATH = path.join(__dirname, "cred.json");
const SCOPES = ["https://www.googleapis.com/auth/drive"];

const auth = new google.auth.GoogleAuth({
  keyFile: KEYFILEPATH,
  scopes: SCOPES,
});

app.post("/upload", upload.any(), async (req, res) => {
  console.log("uploading");
  try {
    // console.log(req.body);
    // console.log(req.files);
    const { body, files } = req;

    let data = await uploadFile(files[0]);
    await res.status(200).send(data);
  } catch (f) {
    res.send(f.message);
  }
});

const uploadFile = async (fileObject) => {
  const bufferStream = new stream.PassThrough();
  bufferStream.end(fileObject.buffer);
  const { data } = await google.drive({ version: "v3", auth }).files.create({
    media: {
      mimeType: fileObject.mimeType,
      body: bufferStream,
    },
    requestBody: {
      name: fileObject.originalname,
      parents: ["1knpyo9Si8YJHcHMnmHdWLPIEebE-mFj1"],
    },
    fields: "id,name",
  });
  console.log(`Uploaded file ${data.name} ${data.id}`);
  return data;
};
