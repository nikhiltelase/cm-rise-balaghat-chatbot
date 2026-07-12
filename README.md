# 🏫 सीएम राइज टिहलीबाई उत्कृष्ट विद्यालय वारासिवनी — AI Help Desk Chatbot

> **सारथी** — सीएम राइज टिहलीबाई उत्कृष्ट विद्यालय वारासिवनी (बालाघाट) के लिए तैयार AI Help Desk

[![Live Demo](https://img.shields.io/badge/Live%20Demo-cm--rise--waraseoni--chatbot.netlify.app-blue)](https://cm-rise-waraseoni-chatbot.netlify.app)

---

## ✨ Features

- 🤖 **Google Gemini AI** powered intelligent chatbot
- 🏫 **Universal** — किसी भी CM Rise/Sandipani School के लिए काम करे
- 🌐 **Bilingual** — हिंदी + English दोनों में
- 🎨 **AI Image Generation** — Pollinations.ai से तत्काल चित्र
- 🔊 **Voice Input + Output** — बोलकर पूछें, सुनकर जवाब पाएं
- 💬 **Chat History** — ChatGPT/Gemini जैसा Multi-session
- 📱 **Responsive** — Mobile, Tablet, Desktop सभी में

---

## 🚀 Setup Guide — अपने स्कूल के लिए Setup करें

### Step 1: Gemini API Key लें (Free)
1. [aistudio.google.com](https://aistudio.google.com) पर जाएं
2. **"Create API Key"** पर क्लिक करें
3. API Key copy करें

### Step 2: `js/keys.js` बनाएं
`js/keys.example.js` को copy करें → `js/keys.js` नाम दें:
```js
// js/keys.js
window.GEMINI_API_KEY = "AIzaxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx";
```
> ⚠️ **keys.js GitHub पर नहीं जाएगी** (`.gitignore` में है) — सुरक्षित!

### Step 3: अपने स्कूल की जानकारी भरें
`js/school-config.js` खोलें और अपना डेटा डालें:

```js
// js/school-config.js
window.SCHOOL_CONFIG = {
  schoolName: "सांदीपनि विद्यालय [आपका जिला]",
  schoolNameEnglish: "Sandipani Vidyalaya [District]",
  district: "[जिले का नाम]",
  block: "[विकासखंड]",
  udiseCode: "[UDISE Code]",
  principal: "[प्राचार्य का नाम]",
  principalContact: "[मोबाइल नंबर]",
  address: "[पूरा पता]",
  botName: "सारथी",
  // ...
};
```

### Step 4: Deploy करें (Netlify — Free)
1. [netlify.com](https://netlify.com) पर account बनाएं
2. **"Deploy from GitHub"** चुनें
3. **Environment Variables** में `GEMINI_API_KEY` डालें (Netlify Dashboard → Site Settings → Environment Variables)
4. Done! ✅

---

## 📁 Project Structure

```
chatBot/
├── index.html              ← Main HTML (Dynamic — config से load)
├── css/
│   └── style.css           ← Styling
├── js/
│   ├── school-config.js    ← ⭐ अपने स्कूल का DATA यहाँ भरें
│   ├── school-config.example.js  ← Template (copy करें)
│   ├── school-data.js      ← MP-wide CM Rise Knowledge Base
│   ├── keys.js             ← API Key (gitignore में — GitHub पर नहीं जाएगी)
│   ├── keys.example.js     ← Template
│   ├── gemini.js           ← Gemini API integration
│   ├── chat-history.js     ← Multi-session storage
│   └── app.js              ← Main logic (Universal)
├── .env                    ← Netlify injection (local)
├── inject-keys.js          ← Netlify build script
├── netlify.toml            ← Netlify config
└── .gitignore              ← keys.js और .env को ignore करता है
```

---

## 🗂️ Knowledge Base में क्या है?

`js/school-data.js` में पूरे मध्य प्रदेश का CM Rise/Sandipani School डेटाबेस है:

| Section | Details |
|---------|---------|
| **बालाघाट जिला** | 14 schools — UDISE, Principal, Contact |
| **State-wide DB** | मालवा-निमाड़, ग्वालियर-चंबल, महाकौशल के 50+ schools |
| **एकलव्य स्कूल** | EMRS बैहर, उकवा |
| **प्रवेश नियम** | RTE, Lottery, Education Portal 3.0 |
| **सांदीपनि इतिहास** | नामकरण, PM SHRI, NEP 2020 |
| **AI Training** | Agnirva, ISRO, Peepul India |
| **AI Exhibition** | Prompt Engineering, Cyber Security, Avatar Stall |

---

## 🔒 Security — API Key Safe कैसे रखें?

| File | GitHub पर? | क्यों? |
|------|-----------|--------|
| `js/keys.js` | ❌ नहीं | `.gitignore` में है |
| `.env` | ❌ नहीं | `.gitignore` में है |
| `js/school-config.js` | ✅ हाँ | कोई secret नहीं |
| `js/school-data.js` | ✅ हाँ | Public knowledge |

**Netlify पर deploy करते समय:**
- `Site Settings → Environment Variables → GEMINI_API_KEY`

---

## 🌟 Demo

**Live site:** [cm-rise-waraseoni-chatbot.netlify.app](https://cm-rise-waraseoni-chatbot.netlify.app)

---

## 🤝 Contributing

- नए school का data add करना हो तो `js/school-data.js` में PR भेजें
- Bug मिला हो तो Issues में report करें

---

## 📜 License

Open Source — All CM Rise / Sandipani Schools are welcome to use and customize!

---

*Made with ❤️ for MP Government Schools | Powered by Google Gemini AI*
