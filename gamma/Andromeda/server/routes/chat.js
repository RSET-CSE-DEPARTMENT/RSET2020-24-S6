const express = require('express');
const axios = require('axios');
const router = express.Router();

const API_KEY = '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'; // Replace with your ChatGPT API key

router.post('/', async (req, res) => {
  try {
    const { message } = req.body;

    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: 'You are a helpful assistant.' },
          { role: 'user', content: message },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    res.json({ message: response.data.choices[0].message.content });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

module.exports = router;
