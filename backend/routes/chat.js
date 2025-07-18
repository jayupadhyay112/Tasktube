import express from 'express';
import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();
const router = express.Router();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro-latest" });

router.post('/', async (req, res) => {
  const { prompt } = req.body;

  if (!prompt || typeof prompt !== 'string') {
    return res.status(400).json({ error: 'Invalid prompt' });
  }

  try {
    console.log('Prompt:', prompt);

    // Optional delay to respect quota
    await new Promise(resolve => setTimeout(resolve, 2000));

    const result = await model.generateContent({
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
    });

    const response = result.response;
    const text = response.text();

    console.log('Gemini Response:', text);
    res.json({ content: text });
  } catch (err) {
    console.error('Gemini API Error:', err.message);
    res.status(500).json({
      error: 'Gemini API limit exceeded or something went wrong.',
      details: err.message,
    });
  }
});

export default router;
