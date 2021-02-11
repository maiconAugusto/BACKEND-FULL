/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-expressions */
const express = require('express');

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const helmet = require('helmet');
const cors = require('cors');
const db = require('./config/index');
const routes = require('./routes');
const Cron = require('./services/cron');

const connectUsers = [];

db;

io.on('connection', (socket) => {
  socket.on('connected', (data) => {
    if (connectUsers.includes(data));
    else {
      connectUsers.push(data);
    }
  });
});

app.use((req, res, next) => {
  req.io = io;
  req.connectUsers = connectUsers;
  return next();
});

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(routes);

// Cron.stop();

process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;

server.listen(process.env.PORT || 8081, () => {
  console.log('run');
});
