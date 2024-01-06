if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const mongoConnect = require('./config/db_connection');
const router = require('./routes');
const errorHandler = require('./middlewares/errorHandler');
const setupSocketEvents = require('./config/socketEvent');

const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 3000;
const io = socketIo(server);

app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());
app.use(router);
app.use(errorHandler);

(async () => {
  try {
    await mongoConnect();
    server.listen(PORT, () => {
      console.log(`this server is running on port ${PORT}`);
      setupSocketEvents(io);
    });
  } catch (error) {
    console.log('Failed to connect to MongoDB:', error.message);
  }
})();

module.exports = { app, server, io };
