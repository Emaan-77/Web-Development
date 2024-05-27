const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
let User = require("../../models/User");
const { response } = require("../../server");

router.get("/register", (req, res) => {
  res.render("auth/register");
});

router.post("/register", async (req, res) => {
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      res.flash("danger", "User with given email already exists");
      return res.redirect("/auth/register");
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    user = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });
    
  
    await user.save();
    res.redirect("/auth/login");
  
});

router.get("/logout", (req, res) => {
  req.session.user = null;
  res.flash("success", "Logged out Successfully");
  res.redirect("/auth/login");
});

router.get("/login", (req, res) => {
  res.render("auth/login");
});

router.post("/login", async (req, res) => {
  let user = await User.findOne({ email: req.body.email });
  if (!user) {
    res.flash("danger", "Username is invalid");
    return res.redirect("/auth/login");
  }
  const isPasswordValid = await bcrypt.compare(req.body.password, user.password);
  if (!isPasswordValid) {
    res.flash("danger", "Invalid Password");
    return res.redirect("/auth/login");
  }
  req.session.user = user;
  res.flash("success", user.name + " Logged In");

  if (user.role === "admin") {
    req.session.user.role = user.role;
    return res.redirect("/books/addnew");
  } else {
    return res.redirect("/");
  }
});

module.exports = router;
