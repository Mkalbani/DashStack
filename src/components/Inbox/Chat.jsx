import React, { useState, useEffect } from "react";
import {
  ArrowLeft,
  Printer,
  Trash2,
  Mic,
  Image,
  Paperclip,
  Send,
} from "lucide-react";

const Chat = ({ email, onClose, onDelete, onPrint }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    if (email) {
      console.log("Initializing chat with email:", email);
      setMessages([
        {
          id: 1,
          sender: email.sender,
          content: email.subject,
          timestamp: email.time,
        },
      ]);
    } else {
      console.error("Email prop is undefined in Chat component");
    }
  }, [email]);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setMessages([
        ...messages,
        {
          id: messages.length + 1,
          sender: "You",
          content: newMessage,
          timestamp: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ]);
      setNewMessage("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!email) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col h-full bg-gray-900 text-white">
      {/* Header */}
      <div className="flex items-center justify-between p-2 sm:p-4 border-b border-gray-700">
        <div className="flex items-center">
          <button onClick={onClose} className="mr-2 sm:mr-4">
            <ArrowLeft size={20} />
          </button>
          <div className="max-w-[60%] sm:max-w-full">
            <h2 className="text-base sm:text-lg font-semibold truncate">
              {email.sender}
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 truncate">
              {email.subject}
            </p>
          </div>
        </div>
        <div className="flex">
          <button onClick={onPrint} className="mr-2 p-1 sm:p-2">
            <Printer size={16} className="sm:w-5 sm:h-5" />
          </button>
          <button onClick={onDelete} className="p-1 sm:p-2">
            <Trash2 size={16} className="sm:w-5 sm:h-5" />
          </button>
        </div>
      </div>

      {/* Chat messages */}
      <div className="flex-grow overflow-y-auto p-2 sm:p-4 space-y-2 sm:space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.sender === "You" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[75%] p-2 sm:p-3 rounded-lg ${
                message.sender === "You" ? "bg-blue-600" : "bg-gray-700"
              }`}
            >
              <p className="text-sm sm:text-base">{message.content}</p>
              <p className="text-xs text-gray-400 mt-1">{message.timestamp}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Message input */}
      <div className="p-2 sm:p-4 border-t border-gray-700">
        <div className="flex items-center bg-gray-800 rounded-lg">
          <button className="p-1 sm:p-2">
            <Mic size={16} className="sm:w-5 sm:h-5" />
          </button>
          <textarea
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Write message"
            className="flex-grow bg-transparent p-1 sm:p-2 text-sm sm:text-base focus:outline-none"
            rows="1"
          />
          <button className="p-1 sm:p-2">
            <Image size={16} className="sm:w-5 sm:h-5" />
          </button>
          <button className="p-1 sm:p-2">
            <Paperclip size={16} className="sm:w-5 sm:h-5" />
          </button>
          <button
            onClick={handleSendMessage}
            className="p-1 sm:p-2 bg-blue-600 rounded-lg ml-1 sm:ml-2"
          >
            <Send size={16} className="sm:w-5 sm:h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
