# ✨ Text Translator Magic

A beautiful, modern text translation web app with a dreamy pastel UI. Translate text from English to multiple languages with a sprinkle of magic!

![Text Translator Magic](https://via.placeholder.com/1200x600/E6D5F5/7C3AED?text=Text+Translator+Magic)

## 🌟 Features

- **Beautiful Pastel UI**: Dreamy gradients, glassmorphism effects, and smooth animations
- **Multiple Languages**: Translate to Spanish, French, German, Japanese, Hindi, and Telugu
- **Secure Architecture**: API keys stored server-side, never exposed to frontend
- **Real-time Translation**: Instant results powered by Google Translate API
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Type-Safe**: Built with TypeScript for robust development
- **Modern Stack**: React, Vite, TailwindCSS, Express

## 🎨 Screenshots

### Hero Section
![Hero](https://via.placeholder.com/800x400/F5E6FF/9333EA?text=Hero+Section)

### Translation Interface
![Translator](https://via.placeholder.com/800x400/E6F5FF/3B82F6?text=Translation+Interface)

## 🛠️ Tech Stack

### Frontend
- **React** - UI library
- **TypeScript** - Type-safe JavaScript
- **Vite** - Lightning-fast build tool
- **TailwindCSS** - Utility-first CSS framework
- **Lucide React** - Beautiful icons

### Backend
- **Node.js** - JavaScript runtime
- **Express** - Web server framework
- **RapidAPI** - Google Translate integration
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variable management

## 📁 Project Structure

```
text-translator/
├── README.md
├── index.html
├── package.json
├── vite.config.ts
├── tsconfig.json
├── tailwind.config.ts
├── postcss.config.cjs
├── .gitignore
│
├── src/
│   ├── App.tsx                 # Main app component
│   ├── main.tsx                # Entry point
│   ├── index.css               # Design system (HSL colors)
│   └── pages/
│       └── Index.tsx           # Main translator page
│
└── server/
    ├── index.js                # Express server
    ├── package.json            # Server dependencies
    ├── .env.example            # Environment template
    └── README.md               # Server documentation
```

## 🚀 Installation & Setup

### Prerequisites
- Node.js 18+ installed
- RapidAPI account with Google Translate API access

### 1. Clone the Repository
```bash
git clone <your-repo-url>
cd text-translator
```

### 2. Frontend Setup
```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The frontend will run on `http://localhost:8080`

### 3. Backend Setup
```bash
# Navigate to server directory
cd server

# Install dependencies
npm install

# Create environment file
cp .env.example .env
```

### 4. Configure API Keys

1. Go to [RapidAPI Google Translate](https://rapidapi.com/googlecloud/api/google-translate1)
2. Sign up and subscribe (free tier available)
3. Copy your API key
4. Edit `server/.env`:

```env
RAPIDAPI_KEY=your_actual_api_key_here
RAPIDAPI_HOST=google-translate1.p.rapidapi.com
PORT=3000
```

### 5. Start Backend Server
```bash
# From server directory
npm start
```

The backend will run on `http://localhost:3000`

## 🎯 Usage

1. Open the app in your browser (`http://localhost:8080`)
2. Enter the text you want to translate
3. Select target language from the dropdown
4. Click "Translate Magic ✨"
5. See your translated text appear instantly!

## 🎨 Design System

The app uses a custom pastel HSL color system defined in `src/index.css`:

- **Primary**: Soft lavender (`hsl(270, 60%, 70%)`)
- **Secondary**: Sky blue (`hsl(200, 60%, 75%)`)
- **Accent**: Rose pink (`hsl(340, 70%, 80%)`)
- **Background**: Cream pink (`hsl(330, 60%, 97%)`)

### Custom Animations
- `animate-scale-in`: Gentle entrance animation
- `animate-float`: Floating effect
- `animate-float-delayed`: Delayed floating
- `animate-pulse-soft`: Soft pulsing glow

## 🔒 Security

- ✅ API keys stored in environment variables
- ✅ Backend proxy server protects credentials
- ✅ CORS enabled for secure communication
- ✅ No sensitive data in frontend code
- ✅ `.env` files excluded from git

## 🌐 Deployment

### Frontend (Vercel)
```bash
npm run build
# Deploy dist/ folder to Vercel
```

### Backend (Render.com)
1. Create new Web Service
2. Connect GitHub repository
3. Set build command: `cd server && npm install`
4. Set start command: `cd server && npm start`
5. Add environment variables in dashboard

### Environment Variables on Render
- `RAPIDAPI_KEY`: Your RapidAPI key
- `RAPIDAPI_HOST`: `google-translate1.p.rapidapi.com`
- `PORT`: 3000

## 📝 Available Scripts

### Frontend
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

### Backend
- `npm start` - Start server
- `npm run dev` - Start with auto-reload (if nodemon installed)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Google Translate API via RapidAPI
- Lucide Icons for beautiful icons
- TailwindCSS for the styling framework

## 💬 Support

If you have any questions or need help:
1. Check the [server/README.md](server/README.md) for backend setup
2. Review the code comments for implementation details
3. Open an issue on GitHub

---

Made with 💜 and a lot of ✨ by developers for developers
