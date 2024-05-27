const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const cartroute=require('./routes/api/cart');
const isAuthenticated = require("./middlewares/isAuthenticated");
let server = express();
server.use(express.json());
server.use(express.urlencoded());
var expressLayouts = require("express-ejs-layouts");



server.use(cookieParser());
server.use(session({ 
  secret: "Its  a secret",
cookie:{
  maxAge:900000
} }));



server.set("view engine", "ejs");
server.use(express.static("public"));

server.use(require("./middlewares/siteMiddleware"));

server.use(expressLayouts);

server.use("/auth", require("./routes/site/auth")); 
server.use("/api/cart",cartroute);



server.use("/", require("./routes/site/productshow")); 
server.use("/", require("./routes/site/books"));
server.use("/", require("./routes/site/auth"));


module.exports = server;


server.get("/contact-us.html", (req, res) => {
  res.render("contact-us");
});

server.get("/event", (req, res) => {
  res.render("event");
});
server.get("/aboutus", (req, res) => {
  res.render("aboutus");
});
server.get("/signup.html", (req, res) => {
  res.render("user/signuphtml");
});
server.get("/", (req, res) => {
  res.render("homepage");
});

//mongoose accepts a connection string to your db and attempts a connections here
mongoose.connect("mongodb://localhost:27017/fa21-bcs-b").then((data) => {
  console.log("DB Connected");
});
server.listen(4000, () => {
  console.log("Server started at localhost:4000");
});
