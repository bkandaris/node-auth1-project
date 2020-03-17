const express = require('express');
const server = express();
const port = 4000;
// importing our routers
const usersRouter = require('./users/users-router');
const authRouter = require('./auth/auth-router');
// importing connect--session-knex
const KnexSessionStore = require('connect-session-knex')(express);
// adding helmet
const helmet = require('helmet');
// adding express-session middleware
const session = require('express-session');

// importing our config file for our instance of knex
const dbConfig = require('./config');

// built in middleware
server.use(express.json());
// using express-session middleware
server.use(
  session({
    name: 'token', // overwrites default cookie name / hides stack better - if a bug surfaces in express-session hackers wont' know we are using this
    resave: false, // avoid recreating sessions if they haven't changed
    saveUninitialized: false, // GDPR laws against setting cookies automatically
    secret: 'keep it secret, keep it safe', // any string / encrypts our cookie
    cookie: {
      httpOnly: true, // keeps us more secure not allowing JS to read it
      maxAge: 1500000 // expires the cookie after 15 seconds
    },
    store: new KnexSessionStore({
      knex: dbConfig, // configured instance of knex
      createtable: true // if session table doesn't exist, create it to store sessions
    })
  })
);
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
