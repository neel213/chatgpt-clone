import React, { useState } from 'react';
import './App.css';
function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const handleSend = async () => {
    if (input.trim() === "") return;

    setMessages([...messages, { sender: "user", text: input }]);
    const userMessage = input;
    setInput("");

    try {
      const response = await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: userMessage }),
      });

      const data = await response.json();
      const botResponse = data.message || "No valid response received."; // Updated to show the actual response

      setMessages((prevMessages) => [...prevMessages, { sender: "bot", text: botResponse }]);
    } catch (error) {
      console.error("Error:", error);
      setMessages((prevMessages) => [...prevMessages, { sender: "bot", text: "Error communicating with chatbot." }]);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSend();
    }
  };

  return (
    <div className="chatbot-container">
      <div className="sidebar">
        <h3>Past Conversations</h3>
        <ul>
          {messages.map((message, index) => (
            <li key={index} className={message.sender}>
              {message.text}
            </li>
          ))}
        </ul>
      </div>
      <div className="chat-area">
        <div className="quick-messages">
          <button onClick={() => setInput("Quiz me on world capitals")}>Quiz me on world capitals</button>
          <button onClick={() => setInput("Create an image for my presentation")}>Create an image for my presentation</button>
          <button onClick={() => setInput("Superhero shark story")}>Superhero shark story</button>
          <button onClick={() => setInput("Python script for daily email reports")}>Python script for daily email reports</button>
        </div>
        <div className="conversation">
          {messages.map((message, index) => (
            <div key={index} className={`message ${message.sender}`}>
              {message.text}
            </div>
          ))}
        </div>
        <div className="input-area">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type a message..."
          />
          <button onClick={handleSend}>Send</button>
        </div>
      </div>
    </div>
  );
}

export default Chatbot;
