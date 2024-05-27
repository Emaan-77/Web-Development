const express = require("express");
const router = express.Router();
const Books = require("../../models/Books"); 

router.get("/search", async (req, res) => {
  let query = req.query.query;
  let page = Number(req.query.page) || 1;
  let pageSize = 6;

  if (!query) {
    return res.redirect("/");
  }

  if (!req.session.searchHistory) {
    req.session.searchHistory = [];
  }
  if (!req.session.searchHistory.includes(query)) {
    req.session.searchHistory.push(query);
  }
  let books = await Books.find({ title: new RegExp(query, "i") })
    .skip(pageSize * (page - 1))
    .limit(pageSize);
  let total = await Books.countDocuments({ title: new RegExp(query, "i") });
  let totalPages = Math.ceil(total / pageSize);

  res.render("books/search", {
    pageTitle: `Search results for: ${query}`,
    books,
    total,
    page,
    pageSize,
    totalPages,
    query,
    searchHistory: req.session.searchHistory || []
  });
});

module.exports = router;
