const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").doesExist;
let users = require("./auth_users.js").users;
const public_usersAsync = express.Router();

// Get the book list available in the shop
public_usersAsync.get('/',function (req, res) {
  res.send(JSON.stringify(books,null,4));
});

// Get book details based on ISBN
public_usersAsync.get('/isbn/:isbn',function (req, res) {
  const isbn = req.params.isbn;
  res.send(books[isbn])
 });

 let bookauthor=[];
let booktitles=[];
let bookreviews=[];

let booklist =(author)=>{
  let book; 
  bookauthor=[];
  for (book in books) {
    if (books[book].author === author) {
      bookauthor.push(books[book]);
    }
  }
  return bookauthor;
}

let titlelist =(title)=>{
  let book; 
  booktitles=[];
  for (book in books) {
    if (books[book].title === title) {
      booktitles.push(books[book]);
    }
  }
  return booktitles;
}

let reviewslist =(title)=>{
  let book; 
  bookreviews=[];
  for (book in books) {
    if (books[book].title === title) {
      bookreviews.push(books[book].reviews);
    }
  }
  return bookreviews;
}


// Get book details based on author
public_usersAsync.get('/author/:author',function (req, res) {
  const author = req.params.author;
  bookauthor= booklist(author)
  res.send(bookauthor);
});

// Get book details based on title
public_usersAsync.get('/title/:title',function (req, res) {
  const title = req.params.title;
  booktitles= titlelist(title);
  res.send(booktitles);
});

// Get book review based on title
public_usersAsync.get('/review/:title',function (req, res) {
  const title = req.params.title;
  bookreviews= reviewslist(title);
  res.send(bookreviews);
});


// Add a book review
public_usersAsync.put("/author/review/:isbn", (req, res) => {
  const isbn = req.params.isbn;
  const review = req.body.review;
  const user = req.body.user;
  const rating = req.body.rating;
  const date = new Date();
  if (isValid(user)) {
    books[isbn].reviews[user] = { review: review, rating: rating, date: date };
    res.send("Review added");
  } else {
    res.send("User not found");
  }
});
// Delete a book review
public_usersAsync.delete("/author/review/:isbn", (req, res) => {
  const isbn = req.params.isbn;
  const user = req.body.user;
  if (isValid(user)) {

    delete books[isbn].reviews[user]; 
    res.send("Review deleted");
  } else {
    res.send("User not found");
  }
});


//  Get book review
public_usersAsync.get('/author/review/:isbn',function (req, res) {
  const reviews = req.params.isbn;
  res.send(books[reviews])
});

module.exports.generalAsync = public_usersAsync;
