import React, { useState } from 'react';
import axios from 'axios';

const ChatAI = () => {
  const [prompt, setPrompt] = useState('');
  const [messages, setMessages] = useState([]);

  const sendMessage = async () => {
    if (!prompt.trim()) return;

    // Add user message to chat
    const userMessage = { role: 'user', content: prompt };
    setMessages([...messages, userMessage]);

    // try {
     const response = await fetch('http://localhost:5000/api/chat', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ prompt })
});
const data = await response.json();

const aiMessage = { role: 'ai', content: data.content };
setMessages((prev) => [...prev, aiMessage]);

    setPrompt('');
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
      <h2>Chat with AI</h2>

      <div
        style={{
          border: '1px solid #ccc',
          padding: '10px',
          height: '400px',
          overflowY: 'scroll',
          marginBottom: '20px',
          borderRadius: '8px',
        }}
      >
        {messages.map((msg, index) => (
          <div
            key={index}
            style={{
              marginBottom: '10px',
              textAlign: msg.role === 'user' ? 'right' : 'left',
            }}
          >
            <strong>{msg.role === 'user' ? 'You' : 'AI'}:</strong> {msg.content}
          </div>
        ))}
      </div>

      <input
        type="text"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Ask something..."
        style={{
          padding: '10px',
          width: '80%',
          marginRight: '10px',
          borderRadius: '5px',
        }}
      />
      <button
        onClick={sendMessage}
        style={{
          padding: '10px 15px',
          borderRadius: '5px',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
        }}
      >
        Send
      </button>
    </div>
  );
};

export default ChatAI;
