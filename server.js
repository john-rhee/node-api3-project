const express = require('express');

const postRouter = require("./posts/postRouter.js")
const userRouter = require("./users/userRouter.js")

const server = express();

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

server.use(postRouter, userRouter);

//custom middleware

function logger(req, res, next) {}

module.exports = server;
