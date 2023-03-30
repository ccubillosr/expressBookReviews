const axios=require("axios").default;
const express = require('express');
const async_routes = require('./generalAsync.js').generalAsync;
const public_methods =  express.Router();

const connectToURLAsync = async(url)=>
{
  const response = axios.get(url);
  let data = (await response).data;
  return response;
}

public_methods.get('/',function (req, res) 
{
  let url = "http://localhost:5000/async/";
  connectToURLAsync(url)
    .then( 
      (response) => res.send(response.data),
      (err) => res.send(err)
    );
});


public_methods.get('/isbn/:isbn',function (req, res) {
  let isbn = req.params.isbn;
  let url = "http://localhost:5000/async/isbn/";
  url += isbn;
  const response = axios.get(url);
  response
  .then(
    resp => {
      let data = resp.data;
        res.send(data);
    })
  .catch(err => {
      res.send(err);
  });
});
public_methods.get('/author/:author',function (req, res) {
  let author = req.params.author;
  let url = "http://localhost:5000/async/author/";
  url += author;
  const response = axios.get(url);
  response
  .then(
    resp => {
      let data = resp.data;
        res.send(data);
    })
  .catch(err => {
      res.send(err);
  });
});
public_methods.get('/title/:title',function (req, res) {
  let title = req.params.title;
  let url = "http://localhost:5000/async/title/";
  url += title;
  const response = axios.get(url);
  response
  .then(
    resp => {
      let data = resp.data;
        res.send(data);
    })
  .catch(err => {
      res.send(err);
  });
});

module.exports.public_methods = public_methods;