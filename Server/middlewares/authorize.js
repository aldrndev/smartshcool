const Message = require('../models/message');

module.exports = {
  changeStatusMessageAuthorize: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { id: userId } = req.user;

      const checkMessage = await Message.findById(id);

      if (!checkMessage) {
        return next(new Error('message_not_found'));
      }

      if (checkMessage.receiver.toString() !== userId) {
        return next(new Error('forbidden'));
      }
      next();
    } catch (error) {
      next(error);
    }
  },

  deleteMessageAuthorize: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { id: userId } = req.user;

      const findMessage = await Message.findById(id);

      if (!findMessage) {
        return next(new Error('message_not_found'));
      }

      if (findMessage.sender !== userId) {
        return next(new Error('forbidden'));
      }

      next();
    } catch (error) {
      next(error);
    }
  },
};
