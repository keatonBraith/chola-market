require("dotenv").config();
const express = require("express");
const session = require("express-session");
const app = express();
const massive = require("massive");
const nodemailer = require("nodemailer");
const authCtrl = require("./ctrl/authCtrl");
const categoryCtrl = require("./ctrl/categoryCtrl");
const productCtrl = require("./ctrl/productCtrl");
const cartCtrl = require("./ctrl/cartCtrl");
const reviewCtrl = require("./ctrl/reviewCtrl");
const orderCtrl = require("./ctrl/orderCtrl");
const S3Ctrl = require("./ctrl/S3Ctrl");

const {
  SESSION_SECRET,
  CONNECTION_STRING,
  SERVER_PORT,
  PASSWORD,
  EMAIL,
} = process.env;

app.use(express.json());

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: EMAIL,
    pass: PASSWORD,
  },
});

massive({
  connectionString: CONNECTION_STRING,
  ssl: { rejectUnauthorized: false },
})
  .then((db) => {
    app.set("db", db);
    app.set("transporter", transporter);
    console.log("db connected");
  })
  .catch((err) => console.log(err));

app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: SESSION_SECRET,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);

//#AUTH ENDPOINTS
app.get("/auth/user");
app.post("/auth/register");
app.post("/auth/login");
app.delete("/auth/logout");
app.put("/auth/user/:id");

//#ORDER ENDPOINTS
app.get("/api/order/:id");
app.get("/api/orders/:id");
app.post("/api/order");
app.delete("/api/order");

//#REVIEW ENDPOINTS
app.get("/api/reviews/:id");
app.post("/api/review");
app.get("/api/recent");
app.get("/api/ratings/:id");

//#PRODUCT ENDPOINTS
app.get("/api/products");
app.get("/api/product");
app.post("/api/product");
app.put("/api/product/:id");
app.delete("/api/product");
app.get("/api/products");

//#CART ENDPOINTS
app.get("/api/cart/:id");
app.post("/api/cart/:id");
app.put("/api/cart/:id");
app.delete("/api/cart");

//#CATEGORY ENDPOINTS
app.get("/api/categories");

//#AWS S3 ENDPOINTS
app.get("/api/signs3", S3Ctrl.sign_s3);
app.post("/auth/pic", authCtrl.pic);

app.listen(SERVER_PORT, () => console.log(`Suck brick at port ${SERVER_PORT}`));
