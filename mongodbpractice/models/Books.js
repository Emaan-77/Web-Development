const mongoose = require("mongoose");
let booksSchema = mongoose.Schema({
  title: String,
  genre: String,
  author: String,
  price: String,

});
let Book = mongoose.model("Book", booksSchema);
module.exports = Book;
