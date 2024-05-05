const express = require("express");
const req = require("express/lib/request");
const router = express.Router();
const Books = require("../../models/Books");

// router.get("/books/list",async(req,res)=>{
//   res.render('/books/list',{layout:false});
// });

router.get("/books/addnew", async (req, res) => {
  // res.render("books/addnew");
  res.render('books/addnew', { layout: false });

});
router.post("/books/addnew", async (req, res) => {
  let record = new Books(req.body);
  await record.save();
  //PRG: post redirect get design pattern
  return res.redirect("/books/list");
  // return res.send(record);
  // res.send("Submitted Data");
});
router.get("/books/:id/delete", async (req, res) => {
  await Books.findByIdAndDelete(req.params.id);
  return res.redirect("/books/list");
});

router.get("/books/:id/edit", async (req, res) => {
  let books = await Books.findById(req.params.id);
  
  res.render('books/edit', { books, layout: false });
});

router.post("/books/:id/edit", async (req, res) => {
  let books = await Books.findById(req.params.id);
  books.title = req.body.title;
  books.genre = req.body.genre;
  books.author = req.body.author;
  books.price = req.body.price;

  await books.save();
  return res.redirect("/books/list");
});

router.get("/books/:page?", async (req, res) => {
  let page = Number(req.params.page) ? Number(req.params.page) : 1;
  let pageSize = 6;
  let books = await Books.find()
    .skip(pageSize * (page - 1))
    .limit(pageSize);
  let total = await Books.countDocuments();
  let totalPages = Math.ceil(total / pageSize);
  res.render("books/list", {
    pageTitle: "Products: ",
    books,
    total,
    page,
    pageSize,
    totalPages,
    layout:false
  });
});

module.exports = router;
