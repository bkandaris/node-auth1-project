const express = require('express');
const server = express();
const port = 4000;
// importing our routers
const usersRouter = require('./users/users-router');
const authRouter = require('./auth/auth-router');
// adding helmet
const helmet = require('helmet');

// built in middleware
server.use(express.json());
// using our routers
server.use('/auth', authRouter);
server.use('/users', usersRouter);
// using helmet for extra security
server.use(helmet());
// testing our server to make sure it's running
server.get('/', (req, res) => {
  res.send(`server is running!`);
});

server.listen(port, () => {
  console.log(`server running on http://localhost:${port}`);
});

module.exports = server;
