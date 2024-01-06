const Message = require('../models/message');
const Student = require('../models/student');
const { verifyToken } = require('../utils/jwt');
const socketService = require('./socketService');

const setupSocketEvents = (io) => {
  io.use(async (socket, next) => {
    try {
      const token = socket.handshake.query.token;
      if (!token) {
        return next(new Error('unauthorized'));
      }

      const decoded = verifyToken(token);
      const user = await Student.findById(decoded.id);
      if (!user) {
        return next(new Error('unauthorized'));
      }

      socket.user = user;
      socketService.registerUserSocket(user.id, socket.id);
      next();
    } catch (error) {
      next(error);
    }
  });

  io.on('connection', (socket) => {
    console.log(`A user connected with ID: ${socket.user.id}`);

    socket.on('sendMessage', async (messageData) => {
      try {
        const newMessage = await Message.create({
          sender: socket.user.id,
          receiver: messageData.receiver,
          content: messageData.content,
        });

        socketService.emitToUser(
          messageData.receiver,
          'receiveMessage',
          newMessage
        );
      } catch (error) {
        console.error('Error sending message:', error);
      }
    });

    socket.on('disconnect', () => {
      console.log(`User ${socket.user.id} disconnected`);
      socketService.unregisterUserSocket(socket.user.id);
    });
  });
};

module.exports = (io) => {
  setupSocketEvents(io);
  socketService.setIoInstance(io);
};
