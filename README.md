# 🤖 सारथी — CM Rise School Balaghat AI Chatbot

> CM Rise Government Veerangana Rani Durgawati Higher Secondary School, Balaghat  
> AI Help Desk Assistant for Students & Parents

## 🚀 कैसे चलाएं (How to Run)

### Option 1: सीधे ब्राउज़र में खोलें
1. `index.html` फाइल पर **डबल क्लिक** करें
2. ब्राउज़र में चैटबॉट खुल जाएगा
3. कोई सवाल पूछें!

### Option 2: Live Server (VS Code)
1. VS Code में यह फोल्डर खोलें
2. **Live Server** एक्सटेंशन इंस्टॉल करें
3. `index.html` पर Right Click → "Open with Live Server"

### Option 3: Python HTTP Server
```bash
cd chatBot
python -m http.server 8000
```
फिर ब्राउज़र में `http://localhost:8000` खोलें

---

## 📁 प्रोजेक्ट स्ट्रक्चर (Project Structure)

```
chatBot/
├── index.html            ← मुख्य HTML फाइल
├── css/
│   └── style.css         ← Premium Dark Theme
├── js/
│   ├── app.js            ← Main application logic
│   ├── gemini.js         ← Google Gemini API integration
│   ├── chat-history.js   ← localStorage chat history
│   └── school-data.js    ← स्कूल की पूरी जानकारी (Knowledge Base)
└── README.md             ← यह फाइल
```

---

## ✏️ स्कूल डेटा कैसे बदलें (How to Update School Data)

1. `js/school-data.js` फाइल खोलें
2. `SCHOOL_DATA` object में अपनी जानकारी भरें:
   - प्रिंसिपल का नाम
   - फ़ोन नंबर
   - ईमेल
   - स्कूल का समय
   - छुट्टियों की लिस्ट
   - आदि...
3. Save करें और ब्राउज़र refresh करें

---

## 🔑 API Key बदलना (How to Change API Key)

1. [Google AI Studio](https://aistudio.google.com/app/apikey) पर जाएं
2. "Create API Key" पर क्लिक करें
3. `js/gemini.js` फाइल खोलें
4. `apiKey` फील्ड में नई key पेस्ट करें

---

## 🌐 Netlify पर Deploy करना

1. [Netlify](https://app.netlify.com) पर लॉगिन करें
2. "Add new site" → "Deploy manually"
3. पूरा `chatBot` फोल्डर drag & drop करें
4. Done! 🎉

---

## ✨ Features

| Feature | Description |
|---|---|
| 🤖 AI Chat | Google Gemini 2.0 Flash |
| 💾 Chat History | localStorage — page reload पर भी चैट सेव |
| 🎨 Premium UI | Dark glassmorphism + saffron accents |
| 📱 Responsive | Mobile, Tablet, Desktop |
| 🇮🇳 Bilingual | Hindi + English support |
| ⚡ Quick Replies | Sidebar + Welcome screen chips |
| 🧹 Clear Chat | One-click history delete |

---

## 🛠️ Tech Stack

- **Frontend:** HTML5, CSS3, JavaScript (Vanilla)
- **AI:** Google Gemini 2.0 Flash API
- **Storage:** localStorage (Browser)
- **Fonts:** Inter + Noto Sans Devanagari (Google Fonts)
- **Hosting:** Netlify (Static site)

---

**Made with ❤️ for CM Rise School Balaghat — AI Workshop Demo**
