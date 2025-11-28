# Text Translator Backend Server

This is the backend proxy server for the Text Translator app. It securely handles API requests to RapidAPI's Google Translate service.

## 🚀 Setup Instructions

### 1. Install Dependencies

```bash
cd server
npm install
```

### 2. Configure Environment Variables

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Get your RapidAPI credentials:
   - Go to [RapidAPI Google Translate](https://rapidapi.com/googlecloud/api/google-translate1)
   - Sign up or log in
   - Subscribe to the API (free tier available)
   - Copy your API key

3. Update `.env` file with your credentials:
   ```
   RAPIDAPI_KEY=your_actual_api_key_here
   RAPIDAPI_HOST=google-translate1.p.rapidapi.com
   PORT=3000
   ```

### 3. Start the Server

```bash
npm start
```

The server will run on `http://localhost:3000`

## 📡 API Endpoints

### POST /api/translate
Translates text from English to target language.

**Request Body:**
```json
{
  "q": "Hello world",
  "target": "es"
}
```

**Response:**
```json
{
  "success": true,
  "translatedText": "Hola mundo",
  "targetLanguage": "es"
}
```

### GET /api/health
Health check endpoint.

**Response:**
```json
{
  "status": "ok",
  "message": "Translation server is running"
}
```

## 🔒 Security Notes

- **Never commit `.env` file** to version control
- API keys are stored server-side only
- CORS is enabled for frontend communication
- All sensitive credentials are environment variables

## 🐛 Troubleshooting

### "Missing API credentials" error
- Make sure you created `.env` file from `.env.example`
- Verify your RapidAPI key is correct
- Check that `.env` is in the `server/` directory

### Port already in use
- Change the PORT in `.env` file
- Make sure no other service is using port 3000

## 📦 Dependencies

- **express**: Web server framework
- **cors**: Enable cross-origin requests
- **dotenv**: Environment variable management
- **node-fetch**: HTTP client for API requests

## 🌐 Deployment

For production deployment:

1. Set environment variables on your hosting platform
2. Use a process manager like PM2
3. Enable HTTPS
4. Set appropriate CORS origins

Example Render.com deployment:
- Add environment variables in dashboard
- Deploy from GitHub
- Server will auto-start on push
