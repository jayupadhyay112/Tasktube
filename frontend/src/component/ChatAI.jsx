import React, { useState, useRef, useEffect } from 'react';

const ChatAI = () => {
 
  return (
     <div style={{ padding: '20px', maxWidth: '1000px', margin: 'auto' }}>
      <h2 style={{ justifySelf:'center', margin:'3vh'}}>📚 Study Assistant Chat</h2>

      <iframe
        src="https://www.chatbase.co/chatbot-iframe/UcKiXmnGi7YJP2d-YIYqU"
        width="100%"
        style={{ height: '70vh', minHeight: '500px', border: 'none', borderRadius: '8px' }}
        title="Study AI Assistant"
        allow="clipboard-write"
      ></iframe>
    </div>
  );
};

export default ChatAI;
