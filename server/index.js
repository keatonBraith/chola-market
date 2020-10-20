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
app.get("/auth/user", authCtrl.getUser);
app.post("/auth/register", authCtrl.register);
app.post("/auth/login", authCtrl.login);
app.delete("/auth/logout", authCtrl.logout);
app.put("/auth/user/:id", authCtrl.edit);

//#ORDER ENDPOINTS
app.get("/api/order/:id", orderCtrl.getOrder);
app.get("/api/orders/:id", orderCtrl.getOrders);
app.post("/api/order", orderCtrl.addOrder);
app.post("/api/order/:id", orderCtrl.cancelOrder);

//#REVIEW ENDPOINTS
app.get("/api/reviews/:id", reviewCtrl.getAllReviews);
app.post("/api/review", reviewCtrl.addReview);
app.get("/api/recent", reviewCtrl.getRecentReviews);
app.get("/api/ratings/:id", reviewCtrl.getAvgRating);

//#PRODUCT ENDPOINTS
app.get("/api/products", productCtrl.getProducts);
app.get("/api/product/:id", productCtrl.getProduct);
app.post("/api/product", productCtrl.addProduct);
app.put("/api/product/:id", productCtrl.editProduct);
app.delete("/api/product", productCtrl.deleteProducts);
app.get("/api/productscat", productCtrl.getProductsCat);

//#CART ENDPOINTS
app.get("/api/cart/:id", cartCtrl.getCart);
app.post("/api/cart", cartCtrl.addCart);
app.put("/api/cart/:id", cartCtrl.editCart);
app.delete("/api/cart/:id", cartCtrl.deleteCart);

//#CATEGORY ENDPOINTS
app.get("/api/categories", categoryCtrl.getCats);

//#AWS S3 ENDPOINTS
app.get("/api/signs3", S3Ctrl.sign_s3);
app.post("/auth/pic", authCtrl.pic);

app.listen(SERVER_PORT, () => console.log(`Suck brick at port ${SERVER_PORT}`));
