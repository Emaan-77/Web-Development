const express = require("express");
const req = require("express/lib/request");
const router = express.Router();
const Books = require("../../models/Books");
const multer = require("multer");
const path=require("path");
const Adminauth= require("../../middlewares/isAdminAuthen");


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });



router.get("/books/addnew",Adminauth, async (req, res) => {
  res.render('books/addnew', {layout :false});

});
router.post("/books/addnew",Adminauth,upload.single('image'), async (req, res) => {
  
  let record = new Books({
    title: req.body.title,
    genre: req.body.genre,
    author: req.body.author,
    price: req.body.price,
    image: req.body.image
  });
  await record.save();
  return res.redirect("/books/list");
});


router.post("/books/:id/delete", Adminauth, async (req, res) => {
  await Books.findByIdAndDelete(req.params.id);
  return res.redirect("/books/list");
});

router.get("/books/:id/edit",Adminauth, async (req, res) => {
  let books = await Books.findById(req.params.id);
  res.render('books/edit', { books, layout: false });
});

router.post("/books/:id/edit",Adminauth, async (req, res) => {
  let books = await Books.findById(req.params.id);
  books.title = req.body.title;
  books.genre = req.body.genre;
  books.author = req.body.author;
  books.price = req.body.price;
  books.image = req.body.image;
  console.log(req.body);
  await books.save();
  return res.redirect("/books/list");
});

router.get("/books/:page?",Adminauth, async (req, res) => {
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
