import { useState } from "react";
import { Sparkles, Languages, Send, Loader2, CheckCircle2, AlertCircle, Wand2, Code, Server } from "lucide-react";

const Index = () => {
  const [inputText, setInputText] = useState("");
  const [targetLang, setTargetLang] = useState("es");
  const [translatedText, setTranslatedText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const languages = [
    { code: "es", name: "Spanish", flag: "🇪🇸" },
    { code: "fr", name: "French", flag: "🇫🇷" },
    { code: "de", name: "German", flag: "🇩🇪" },
    { code: "ja", name: "Japanese", flag: "🇯🇵" },
    { code: "hi", name: "Hindi", flag: "🇮🇳" },
    { code: "te", name: "Telugu", flag: "🇮🇳" },
  ];

  const handleTranslate = async () => {
    if (!inputText.trim()) {
      setError("Please enter some text to translate");
      return;
    }

    setLoading(true);
    setError("");
    setTranslatedText("");

    try {
      const response = await fetch("http://localhost:3000/api/translate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          q: inputText,
          target: targetLang,
        }),
      });

      if (!response.ok) {
        throw new Error("Translation failed");
      }

      const data = await response.json();
      setTranslatedText(data.translatedText);
    } catch (err) {
      setError("Failed to translate. Make sure the backend server is running on port 3000.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[hsl(330,60%,97%)] via-[hsl(270,60%,95%)] to-[hsl(200,60%,95%)]">
      {/* Hero Section */}
      <header className="relative overflow-hidden pt-20 pb-32">
        <div className="absolute inset-0 bg-gradient-hero opacity-50"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-block animate-float mb-6">
              <Sparkles className="w-16 h-16 text-primary mx-auto" strokeWidth={1.5} />
            </div>
            <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent animate-scale-in">
              Text Translator Magic
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-4 animate-scale-in">
              Transform your words across languages with a sprinkle of magic ✨
            </p>
            <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground animate-float-delayed">
              <Languages className="w-5 h-5" />
              <span>Powered by AI • Secure • Lightning Fast</span>
            </div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 animate-float opacity-20">
          <div className="w-32 h-32 rounded-full bg-primary blur-3xl"></div>
        </div>
        <div className="absolute bottom-10 right-10 animate-float-delayed opacity-20">
          <div className="w-40 h-40 rounded-full bg-accent blur-3xl"></div>
        </div>
      </header>

      {/* Main Translator Section */}
      <main className="container mx-auto px-4 -mt-16 relative z-20 pb-20">
        <div className="max-w-4xl mx-auto">
          {/* Translator Card */}
          <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-float border border-glass-border p-8 md:p-12 animate-scale-in">
            {/* Input Section */}
            <div className="mb-8">
              <label className="block text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                <Wand2 className="w-4 h-4 text-primary" />
                Enter Your Text
              </label>
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Type or paste your text here..."
                className="w-full h-40 px-6 py-4 rounded-2xl border-2 border-border bg-white/50 backdrop-blur-sm
                         focus:border-primary focus:ring-4 focus:ring-primary/20 outline-none transition-all
                         text-foreground placeholder:text-muted-foreground resize-none"
              />
            </div>

            {/* Language Selection */}
            <div className="mb-8">
              <label className="block text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                <Languages className="w-4 h-4 text-primary" />
                Target Language
              </label>
              <select
                value={targetLang}
                onChange={(e) => setTargetLang(e.target.value)}
                className="w-full px-6 py-4 rounded-2xl border-2 border-border bg-white/50 backdrop-blur-sm
                         focus:border-primary focus:ring-4 focus:ring-primary/20 outline-none transition-all
                         text-foreground font-medium cursor-pointer"
              >
                {languages.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.flag} {lang.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Translate Button */}
            <button
              onClick={handleTranslate}
              disabled={loading}
              className="w-full py-5 px-8 rounded-2xl bg-gradient-to-r from-primary via-accent to-secondary
                       text-white font-bold text-lg shadow-glow hover:shadow-float transition-all duration-300
                       hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed
                       flex items-center justify-center gap-3"
            >
              {loading ? (
                <>
                  <Loader2 className="w-6 h-6 animate-spin" />
                  Translating Magic...
                </>
              ) : (
                <>
                  <Send className="w-6 h-6" />
                  Translate Magic ✨
                </>
              )}
            </button>

            {/* Error State */}
            {error && (
              <div className="mt-6 p-4 rounded-2xl bg-destructive/10 border-2 border-destructive/30 flex items-start gap-3 animate-scale-in">
                <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
                <p className="text-destructive font-medium">{error}</p>
              </div>
            )}

            {/* Translation Result */}
            {translatedText && (
              <div className="mt-8 p-8 rounded-2xl bg-gradient-card border-2 border-primary/20 animate-scale-in">
                <div className="flex items-center gap-2 mb-4">
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                  <span className="text-sm font-semibold text-foreground">Translation Complete!</span>
                </div>
                <p className="text-lg text-foreground leading-relaxed">{translatedText}</p>
              </div>
            )}
          </div>

          {/* How It Works Section */}
          <div className="mt-20">
            <h2 className="text-4xl font-bold text-center mb-12 text-foreground">
              How It Works 🌟
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  step: "1",
                  title: "Enter Text",
                  description: "Type or paste the text you want to translate",
                  icon: "✍️",
                },
                {
                  step: "2",
                  title: "Choose Language",
                  description: "Select your target language from the dropdown",
                  icon: "🌍",
                },
                {
                  step: "3",
                  title: "Get Translation",
                  description: "Click the magic button and receive instant results",
                  icon: "✨",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="bg-white/70 backdrop-blur-xl rounded-3xl p-8 shadow-soft border border-glass-border
                           hover:shadow-glow transition-all duration-300 hover:-translate-y-2 animate-scale-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="text-5xl mb-4">{item.icon}</div>
                  <div className="text-sm font-bold text-primary mb-2">Step {item.step}</div>
                  <h3 className="text-xl font-bold text-foreground mb-3">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Tech Magic Section */}
          <div className="mt-20">
            <h2 className="text-4xl font-bold text-center mb-12 text-foreground">
              Tech Magic Behind the Scenes 🔮
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-8 shadow-soft border border-glass-border animate-scale-in">
                <Code className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-2xl font-bold text-foreground mb-4">Modern Frontend</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span>React + TypeScript for type-safe development</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span>TailwindCSS with custom pastel design system</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span>Vite for lightning-fast builds</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span>Smooth animations and glassmorphism effects</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-8 shadow-soft border border-glass-border animate-scale-in">
                <Server className="w-12 h-12 text-secondary mb-4" />
                <h3 className="text-2xl font-bold text-foreground mb-4">Secure Backend</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-secondary">•</span>
                    <span>Node.js + Express proxy server</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-secondary">•</span>
                    <span>API keys stored securely in environment variables</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-secondary">•</span>
                    <span>CORS-enabled for secure cross-origin requests</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-secondary">•</span>
                    <span>RapidAPI Google Translate integration</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/50 bg-white/30 backdrop-blur-sm py-12 mt-20">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-primary animate-pulse-soft" />
            <span className="font-bold text-foreground">Text Translator Magic</span>
          </div>
          <p className="text-sm text-muted-foreground">
            Built with React, TypeScript, and a lot of ✨
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            © 2025 • Made with 💜 by developers for developers
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
