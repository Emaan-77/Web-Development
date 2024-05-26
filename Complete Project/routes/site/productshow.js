const express = require("express");
const req = require("express/lib/request");
const router = express.Router();
const Books = require("../../models/Books");

router.get("/books/productdisplay", async (req, res) => {
    let books = await Books.find();
    console.log(books);
    res.render("books/productdisplay", { pageTitle: "All Books", books , page:1, totalPages:1});

  });
  
router.get("/products/:page?", async (req, res) => {
    let page = Number(req.params.page) ? Number(req.params.page) : 1;
    let pageSize = 6;
    let books = await Books.find()
      .skip(pageSize * (page - 1))
      .limit(pageSize);
    let total = await Books.countDocuments();
    let totalPages = Math.ceil(total / pageSize);
    res.render("books/productdisplay", {
      pageTitle: "Products: ",
      books,
      total,
      page,
      pageSize,
      totalPages
    });
  });

  module.exports=router;