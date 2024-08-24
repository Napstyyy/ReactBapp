import React from "react";
import "./styles/Chat.css";
import mockMessagesData from "../../../data/mockMessagesData.json";
import { RxDashboard } from "react-icons/rx";
import NotificationIcon from "../../../assets/images/Home/notificationIcon.png";
import MoreAttachments from "../../../assets/images/Chat/MoreAttachments.png"
import InputImage from "../../../assets/images/Chat/InputImage.png"
import SendMessageIcon from "../../../assets/images/Chat/SendMessageIcon.png"

const ChatView = () => {
  return (
    <div className="chat-container">
      <header>
        <button className="home-button left">
          <RxDashboard />
        </button>
        <h2>Chat</h2>
        <button className="home-button right">
          <img
            src={NotificationIcon}
            alt="Notification"
            className="notification-image"
          />
        </button>
      </header>
      <div className="Messages-Container">
        {mockMessagesData.map((message) => (
          <div
            key={message.id}
            className={`message-container ${
              message.sender === "user" ? "user-message" : "hashim-message"
            }`}
          >
            <div className="message-time">{message.time}</div>
            {message.type === "text" ? (
              <div
                className={`message-bubble ${
                  message.sender === "user" ? "user-bubble" : "hashim-bubble"
                }`}
              >
                {message.message}
              </div>
            ) : (
              <img src={message.message} alt="Chat" className="message-image" />
            )}
          </div>
        ))}
<div className="chat-input-container">
  <button className="attachment-button">
    <img
      src={MoreAttachments}
      alt="MoreAttachments"
      className="MoreAttachment-icon"
    />
  </button>
  <div className="input-with-camera">
    <input type="text" placeholder="Type a message..." />
    <button className="camera-button">
      <img
      src={InputImage}
      alt="InputImage"
      className="InputImage-icon"
    />
    </button>
  </div>
  <button className="send-button">
    <img
      src={SendMessageIcon}
      alt="SendMessageIcon"
      className="SendMessage-icon"
    />
  </button>
</div>

      </div>
    </div>
  );
};

export default ChatView;
