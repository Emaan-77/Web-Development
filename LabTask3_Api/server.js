const express = require("express");
const mongoose = require("mongoose");
let server = express();
server.use(express.json());
server.use(express.urlencoded());
var expressLayouts = require("express-ejs-layouts");

server.set("view engine", "ejs");
server.use(express.static("public"));



server.use(expressLayouts);



server.use("/", require("./routes/site/books"));

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

mongoose.connect("mongodb://localhost:27017/fa21-bcs-b").then((data) => {
  console.log("DB Connected");
});
server.listen(4000, () => {
  console.log("Server started at localhost:4000");
});
