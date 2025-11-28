const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Translation server is running' });
});

// Translation endpoint
app.post('/api/translate', async (req, res) => {
  try {
    const { q, target } = req.body;

    // Validate input
    if (!q || !target) {
      return res.status(400).json({ 
        error: 'Missing required fields: q (text) and target (language code)' 
      });
    }

    // Check for API credentials
    if (!process.env.RAPIDAPI_KEY || !process.env.RAPIDAPI_HOST) {
      return res.status(500).json({ 
        error: 'Server configuration error: Missing API credentials' 
      });
    }

    // Make request to RapidAPI
    const response = await fetch(
      'https://google-translate1.p.rapidapi.com/language/translate/v2',
      {
        method: 'POST',
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
          'Accept-Encoding': 'application/gzip',
          'X-RapidAPI-Key': process.env.RAPIDAPI_KEY,
          'X-RapidAPI-Host': process.env.RAPIDAPI_HOST,
        },
        body: new URLSearchParams({
          q: q,
          target: target,
          source: 'en',
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`RapidAPI request failed with status ${response.status}`);
    }

    const data = await response.json();

    // Extract translated text
    const translatedText = data.data?.translations?.[0]?.translatedText;

    if (!translatedText) {
      throw new Error('No translation found in response');
    }

    res.json({ 
      success: true,
      translatedText: translatedText,
      targetLanguage: target,
    });

  } catch (error) {
    console.error('Translation error:', error.message);
    res.status(500).json({ 
      error: 'Translation failed',
      message: error.message,
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`✨ Translation server running on http://localhost:${PORT}`);
  console.log(`📡 API endpoint: http://localhost:${PORT}/api/translate`);
  console.log(`🏥 Health check: http://localhost:${PORT}/api/health`);
});
