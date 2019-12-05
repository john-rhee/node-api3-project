const express = require('express');

const postRouter = require("./posts/postRouter.js")
const userRouter = require("./users/userRouter.js")

const server = express();

server.use(express.json());
server.use(logger);

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

server.use('/user', userRouter);
server.use('/post', postRouter);

//custom middleware

function logger(req, res, next) {
  console.log(`${req.method} on ${req.originalUrl} timestamp: ${Date.now()}`);
  next();
}

module.exports = server;
