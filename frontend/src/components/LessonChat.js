import React, { useState } from "react";
import "../css/LessonChat.css";

const LessonChat = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "In the passage on the left... blah blah blah blah blah blah blah blah blah blah blah",
      sender: "left",
    },
    { id: 2, text: "I'm not really sure what you mean...", sender: "right" },
  ]);
  const [progress, setProgress] = useState(40); // Variable to track progress, change as needed

  const addMessage = (newMessage) => {
    setMessages([
      ...messages,
      { id: messages.length + 1, text: newMessage, sender: "right" },
    ]);
  };

  return (
    <div className="lesson-chat-container">
      <div className="progress-container">
        <div className="progress-bar" style={{ width: `${progress}%` }}></div>
        <span className="progress-percent">{progress}%</span>
      </div>

      <div className="lesson-chat-content">
        {messages.map((message) => (
          <div key={message.id} className={`message ${message.sender}`}>
            {message.sender === "left" && (
              <img
                src="/images/chat-logo.png"
                alt="Docere Logo"
                className="message-logo"
              />
            )}

            {message.text}
          </div>
        ))}
      </div>

      <div className="lesson-chat-input">
        <input
          type="text"
          placeholder="Start typing..."
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              addMessage(e.target.value);
              e.target.value = "";
            }
          }}
        />
      </div>
    </div>
  );
};

export default LessonChat;
