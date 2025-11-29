// server/index.js
const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'server running' });
});

// TRANSLATE ROUTE (uses the HTML translator endpoint from your RapidAPI curl)
app.post('/api/translate', async (req, res) => {
  try {
    const { q, target } = req.body;

    if (!q || !target) {
      return res.status(400).json({ error: "Missing required fields: q and target" });
    }

    if (!process.env.RAPIDAPI_KEY || !process.env.RAPIDAPI_HOST) {
      return res.status(500).json({ error: "Missing RapidAPI credentials" });
    }

    // ---- IMPORTANT: correct full endpoint from your RapidAPI curl ----
    const url = "https://google-translate113.p.rapidapi.com/api/v1/translator/html";

    // RapidAPI expects JSON body: { from: "en", to: "vi", html: "<...>" }
    const payload = {
      from: "en",    // source language
      to: target,    // target language code passed from frontend
      html: q        // the text/html you want translated
    };

    const rapidResp = await fetch(url, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "X-RapidAPI-Key": process.env.RAPIDAPI_KEY,
        "X-RapidAPI-Host": process.env.RAPIDAPI_HOST
      },
      body: JSON.stringify(payload)
    });

    const rawText = await rapidResp.text();
    console.log("RapidAPI status:", rapidResp.status);
    console.log("RapidAPI body:", rawText);

    // Parse JSON safely
    let parsed;
    try {
      parsed = JSON.parse(rawText);
    } catch (err) {
      return res.status(500).json({ error: "Invalid RapidAPI response", body: rawText });
    }

    // The provider returns an object under `trans` (from your sample).
    // Prefer trans.title, else trans.short_text, else stringify trans.
    let translatedText = null;
    if (parsed?.data?.translations?.[0]?.translatedText) {
      translatedText = parsed.data.translations[0].translatedText;
    } else if (parsed?.trans) {
      if (typeof parsed.trans === "string") translatedText = parsed.trans;
      else translatedText = parsed.trans.title || parsed.trans.short_text || JSON.stringify(parsed.trans);
    }

    // If we have a translation, return it. Otherwise return raw for debugging.
    if (translatedText) {
      return res.status(200).json({ success: true, translatedText });
    } else {
      return res.status(200).json({ success: true, raw: parsed });
    }
  } catch (error) {
    console.error("Translation error:", error && error.stack ? error.stack : error);
    res.status(500).json({ error: "Translation failed", message: error.message });
  }
});

// START SERVER
app.listen(PORT, () => {
  console.log(`✨ Translation server running on http://localhost:${PORT}`);
  console.log(`📡 API endpoint: http://localhost:${PORT}/api/translate`);
});
