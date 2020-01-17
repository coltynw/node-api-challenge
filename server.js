const express = require('express');

const projectRouter = require('./data/routers/projectRouter');
const actionRouter = require('./data/routers/actionRouter');

const server = express();


server.use(express.json());
server.use(logger);
server.use('./api/action', actionRouter);
server.use('./api/project', projectRouter);


server.get('/', (request, response) => {
    response.send(" <h1> HELLO? </h1>")
})

// too lazy to make logger in middleware
function logger(req, res, next) {
    console.log(`${req.method} ${req.url} ${Date.now()}`);
    next();
  }

module.exports = server; 