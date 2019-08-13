const express = require('express');

const accountsRouter = require('./accounts/accountsRouter.js')

const server = express();
server.use(express.json());
server.use('/accounts', accountsRouter)

server.get('/', (request, response) => {
  response.send('This is a response message')
})

module.exports = server;