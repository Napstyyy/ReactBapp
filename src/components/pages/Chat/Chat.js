import React from "react";
import "./styles/Chat.css";
import mockMessagesData from "../../../data/mockMessagesData.json";

const ChatView = () => {
  return (
    <div className="chat-container">
      {mockMessagesData.map((message) => (
        <div
          key={message.id}
          className={`message-container ${message.sender === "user" ? "user-message" : "hashim-message"}`}
        >
          <div className="message-time">{message.time}</div>
          {message.type === "text" ? (
            <div className={`message-bubble ${message.sender === "user" ? "user-bubble" : "hashim-bubble"}`}>
              {message.message}
            </div>
          ) : (
            <img src={message.message} alt="Chat" className="message-image" />
          )}
        </div>
      ))}
      <div className="chat-input-container">
        <input type="text" placeholder="Type a message..." />
        <button className="send-button">Send</button>
      </div>
    </div>
  );
};

export default ChatView;
