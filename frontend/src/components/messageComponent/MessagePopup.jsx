import React, { useEffect } from "react";
import "./messagePopup.css";

const MessagePopup = ({ messages, removeMessage }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      if (messages.length > 0) {
        removeMessage(messages[0].id); // Remove the first message after 5 seconds
      }
    }, 5000); // 5 seconds

    return () => clearTimeout(timer); // Clean up the timer
  }, [messages, removeMessage]);

  return (
    <div className="msg-popup-container">
      {messages.map((message) => (
        <div key={message.id} className={`msg-popup-message ${message.type}`}>
          {message.text}
        </div>
      ))}
    </div>
  );
};

export default MessagePopup;
