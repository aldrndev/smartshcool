let io = null;
let userSocketMap = {};

const setIoInstance = (ioInstance) => {
  io = ioInstance;
};

const emitToUser = (userId, event, data) => {
  if (!io) {
    console.log('Socket.io instance not set');
    return;
  }
  const userSocketId = userSocketMap[userId];
  if (userSocketId) {
    io.to(userSocketId).emit(event, data);
  }
};

const registerUserSocket = (userId, socketId) => {
  userSocketMap[userId] = socketId;
};

const unregisterUserSocket = (userId) => {
  delete userSocketMap[userId];
};

module.exports = {
  setIoInstance,
  emitToUser,
  registerUserSocket,
  unregisterUserSocket,
};
