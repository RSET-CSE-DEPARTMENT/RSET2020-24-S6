import React, { useState } from 'react';
import axios from 'axios';
import '../styles/ChatForm.css';
const ChatForm = () => {
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:3002/gpt/chat', {
        message,
      });
      setResponse(res.data.message);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type='submit'>Send</button>
      </form>
      {response && <p>{response}</p>}
    </div>
  );
};

export default ChatForm;
