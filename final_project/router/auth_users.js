const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const doesExist =  (username)=>
{
  let userswithsamename = users.filter((user)=>
  {
    return user.username === username
  });

  if(userswithsamename.length > 0){
    return true;
  } 
  else 
  {
    return false;
  }
}

const authenticatedUser = (username,password)=>
{
  let validusers = users.filter((user)=>{
    return (user.username === username && user.password === password)
  });
  if(validusers.length > 0){
    return true;
  } 
  else 
  {
    return false;
  }
}

regd_users.post("/register", (req,res) => 
{
  const username = req.body.username;
  const password = req.body.password;

  if (username && password) {
    if (!doesExist(username)) { 
      users.push({"username":username,"password":password});
      return res.status(200).json({message: "User successfully registred. Now you can login"});
    } 
    else 
    {
      return res.status(404).json({message: "User already exists!"});    
    }
  } 
  return res.status(404).json({message: "Unable to register user."});
});

//only registered users can login
regd_users.post("/login", (req,res) => 
{
  const username = req.body.username;
  const password = req.body.password;

  if (!username || !password) {
      return res.status(404).json({message: "Error logging in"});
  }

  if (authenticatedUser(username,password)) 
  {
    let accessToken = jwt.sign({
      data: password
    }, 'access', { expiresIn: 60 * 60 });

    req.session.authorization = 
    {
      accessToken,username
    }
    return res.status(200).send("User successfully logged in");
  } 
  else 
  {
    return res.status(208).json({message: "Invalid Login. Check username and password"});
  }
});

module.exports.authenticated = regd_users;
module.exports.doesExist = doesExist;
module.exports.users = users;
module.exports.authenticatedUser = authenticatedUser;