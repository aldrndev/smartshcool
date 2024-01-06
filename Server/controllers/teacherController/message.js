const Message = require('../../models/message');
const socketService = require('../../config/socketService');

module.exports = {
  fetchMessage: async (req, res, next) => {
    try {
      const { id } = req.user;

      const receiveMessage = await Message.find({ receiver: id }).populate([
        { path: 'sender' },
        { path: 'receiver' },
      ]);

      const sendMessage = await Message.find({ sender: id }).populate([
        { path: 'sender' },
        { path: 'receiver' },
      ]);

      if (receiveMessage.length === 0 && sendMessage.length === 0) {
        return res.status(200).json({
          message: 'There are no message',
          data: [],
        });
      }

      res.status(200).json({
        message: 'Success fetch message',
        data: { receiveMessage, sendMessage },
      });
    } catch (error) {
      next(error);
    }
  },

  changeStatusMessage: async (req, res, next) => {
    try {
      const { id } = req.params;
      const changeStatus = await Message.findByIdAndUpdate(
        id,
        {
          status: 'Read',
        },
        { new: true, runValidators: true }
      );

      if (!changeStatus) {
        return next(new Error('message_not_found'));
      }

      if (changeStatus.sender.toString() !== req.user.id) {
        socketService.emitToUser(changeStatus.sender, 'messageStatusChanged', {
          messageId: id,
          newStatus: 'Read',
        });
      }
      res.status(200).json({
        message: 'Success change status message',
        data: changeStatus,
      });
    } catch (error) {
      next(error);
    }
  },

  deleteMessage: async (req, res, next) => {
    try {
      const { id } = req.params;

      const deletedMessage = await Message.deleteOne({ _id: id });

      if (deletedMessage.deletedCount === 0) {
        return res.status(404).json({ message: 'Message not found' });
      }

      res.status(200).json({
        message: `Delete message successfully`,
        data: deletedMessage,
      });
    } catch (error) {
      next(error);
    }
  },
};
