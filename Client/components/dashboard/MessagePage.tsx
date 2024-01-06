import { IoMdSend } from 'react-icons/io';

const MessagePage = () => {
  return (
    <div className="flex h-screen">
      {/* Contacts or Conversations List */}
      <div className="w-1/4 bg-gray-100 p-4">
        <h2 className="text-lg font-semibold mb-4">Conversations</h2>
        {/* List of conversations */}
        <div className="conversation-list">
          {/* Replace with dynamic conversation list */}
          <div className="p-3 hover:bg-gray-200 cursor-pointer">
            Conversation 1
          </div>
          <div className="p-3 hover:bg-gray-200 cursor-pointer">
            Conversation 2
          </div>
        </div>
      </div>

      {/* Chat Window */}
      <div className="flex-grow p-4">
        <div className="flex flex-col h-full">
          {/* Chat Header */}
          <div className="border-b-2 p-3">
            <h3 className="text-xl font-semibold">Chat with John Doe</h3>
          </div>

          {/* Chat Messages */}
          <div className="flex-grow overflow-y-auto p-3">
            {/* Replace with dynamic chat messages */}
            <div className="incoming-message">Hello there!</div>
            <div className="outgoing-message">Hi, How are you?</div>
          </div>

          {/* Message Input */}
          <div className="border-t-2 p-3">
            <div className="flex items-center">
              <input
                type="text"
                className="flex-grow p-2 border-2 rounded mr-2"
                placeholder="Type your message"
              />
              <button className="p-2 bg-blue-500 text-white rounded-full">
                <IoMdSend size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessagePage;
