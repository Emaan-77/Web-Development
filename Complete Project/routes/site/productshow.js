const express = require("express");
const req = require("express/lib/request");
const router = express.Router();
const Books = require("../../models/Books");

router.get("/books/productdisplay", async (req, res) => {
    let books = await Books.find();
    console.log(books);
    res.render("books/productdisplay", { pageTitle: "All Books", books});

  });
  

  module.exports=router;