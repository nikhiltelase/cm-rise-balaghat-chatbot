// =====================================================
// CM Rise / Sandipani Vidyalaya — Universal Saarthi Chatbot
// Main Application Logic — Reads from SCHOOL_CONFIG
// =====================================================

document.addEventListener("DOMContentLoaded", () => {
  // ─── DOM Elements ───
  const chatMessages = document.getElementById("chatMessages");
  const messageInput = document.getElementById("messageInput");
  const sendBtn = document.getElementById("sendBtn");
  const micBtn = document.getElementById("micBtn");
  const voiceToggleBtn = document.getElementById("voiceToggleBtn");
  const menuBtn = document.getElementById("menuBtn");
  const sidebar = document.getElementById("sidebar");
  const sidebarClose = document.getElementById("sidebarClose");
  const sidebarOverlay = document.getElementById("sidebarOverlay");
  const clearChatBtn = document.getElementById("clearChatBtn");
  const welcomeSection = document.getElementById("welcomeSection");
  const statusText = document.getElementById("statusText");
  const newChatBtn = document.getElementById("newChatBtn");
  const recentChatsList = document.getElementById("recentChatsList");
  const noHistoryText = document.getElementById("noHistoryText");

  // ─── Load SCHOOL_CONFIG into UI (Universal School Branding) ───
  const cfg = (typeof window.SCHOOL_CONFIG !== 'undefined') ? window.SCHOOL_CONFIG : {};
  const botName = cfg.botName || 'सारथी';
  const botNameEnglish = cfg.botNameEnglish || 'Saarthi';
  const schoolName = cfg.schoolName || 'CM Rise Sandipani विद्यालय';
  const schoolNameEnglish = cfg.schoolNameEnglish || 'CM Rise Sandipani School';
  const botEmoji = cfg.botEmoji || '🤖';

  // ─── UI Localization Dictionary ───
  const UI_TEXT = {
    hi: {
      newChat: "नया चैट (New Chat)",
      recentChats: "💬 हालिया बातचीत",
      quickAsk: "🔖 जल्दी पूछें",
      clearChat: "चैट मिटाएं",
      noHistory: "कोई इतिहास नहीं है",
      statusOnline: "ऑनलाइन • जवाब देने को तैयार",
      statusTyping: "टाइप कर रहा है...",
      statusListening: "सुन रहा हूँ... बोलिए (Speak now)",
      placeholder: "अपना सवाल यहाँ लिखें... (हिंदी या English में)",
      inputHint: "⚡ Google Gemini AI • CM Rise / सांदीपनि विद्यालय • Enter भेजें, Shift+Enter नई लाइन",
      headerTitle: `${botName} — AI Assistant`,
      welcomeTitle: `नमस्ते! मैं <span class="gradient-text">${botName}</span> हूँ`,
      welcomeSubtitle: `${schoolName} का AI Help Desk। मैं आज आपकी क्या सहायता कर सकता हूँ?`,
      clearConfirm: "क्या आप सभी चैट डिलीट करना चाहते हैं?",
      confirmDeleteBtn: "हाँ, मिटाओ",
      cancelDeleteBtn: "रहने दो",
      dialogTitle: "🗑️ चैट मिटाएं?",
      dialogDesc: "क्या आप सारी चैट हिस्ट्री डिलीट करना चाहते हैं? यह वापस नहीं आएगी।",
      welcomeCards: cfg.welcomeCards || [
        { emoji: '🕐', title: 'स्कूल का समय व कैलेंडर', desc: 'समय सारणी, छुट्टियां और परीक्षा तिथियां जानें', query: 'स्कूल का समय क्या है?' },
        { emoji: '📝', title: 'प्रवेश प्रक्रिया व नियम', desc: 'दाखिला पात्रता, 1-3 किमी नियम और दस्तावेज देखें', query: 'एडमिशन की प्रक्रिया बताओ' },
        { emoji: '🎨', title: 'एआई इमेज जनरेशन', desc: 'स्कूल या प्रोजेक्ट का AI चित्र बनवाएं', query: 'सीएम राइज विद्यालय वारासिवनी की स्मार्ट क्लास का चित्र बनाओ' },
        { emoji: '🏗️', title: 'स्मार्ट लैब व सुविधाएं', desc: 'अटल टिंकरिंग लैब, कंप्यूटर लैब की जानकारी', query: 'अटल टिंकरिंग लैब के बारे में बताओ' }
      ],
      quickLinks: cfg.quickLinks || [
        { emoji: '🕐', label: 'स्कूल का समय', query: 'स्कूल का समय क्या है?' },
        { emoji: '📝', label: 'एडमिशन जानकारी', query: 'एडमिशन की प्रक्रिया बताओ' },
        { emoji: '📖', label: 'विषय / Streams', query: 'कक्षा 11 में कौन-कौन से विषय हैं?' },
        { emoji: '🏗️', label: 'सुविधाएं', query: 'स्कूल में क्या-क्या सुविधाएं हैं?' },
        { emoji: '📅', label: 'छुट्टियाँ / कैलेंडर', query: 'छुट्टियों की लिस्ट दिखाओ' },
        { emoji: '📋', label: 'नियम', query: 'स्कूल के नियम क्या हैं?' },
        { emoji: '📞', label: 'संपर्क करें', query: 'स्कूल से कैसे संपर्क करें?' },
        { emoji: '🌟', label: 'CM Rise के बारे में', query: 'CM Rise / सांदीपनि योजना क्या है?' }
      ]
    },
    en: {
      newChat: "New Chat",
      recentChats: "💬 Recent Chats",
      quickAsk: "🔖 Quick Links",
      clearChat: "Clear History",
      noHistory: "No history found",
      statusOnline: "Online • Ready to help",
      statusTyping: "Typing response...",
      statusListening: "Listening... speak now",
      placeholder: "Type your question here... (Hindi or English)",
      inputHint: "⚡ Google Gemini AI • CM Rise School • Press Enter to send, Shift+Enter for new line",
      headerTitle: `${botNameEnglish} — AI Assistant`,
      welcomeTitle: `Hello! I am <span class="gradient-text">${botNameEnglish}</span>`,
      welcomeSubtitle: `AI Help Desk for ${schoolNameEnglish}. How can I assist you today?`,
      clearConfirm: "Are you sure you want to clear all chat history?",
      confirmDeleteBtn: "Yes, Clear",
      cancelDeleteBtn: "Cancel",
      dialogTitle: "🗑️ Clear History?",
      dialogDesc: "Are you sure you want to delete all chat history? This cannot be undone.",
      welcomeCards: [
        { emoji: '🕐', title: 'School Timings & Calendar', desc: 'Know about schedules, holidays, and exam dates', query: 'What are the school timings?' },
        { emoji: '📝', title: 'Admission Process & Rules', desc: 'Eligibility, 1-3 km radius rule & documentation', query: 'Tell me about the admission process' },
        { emoji: '🎨', title: 'AI Image Generation', desc: 'Create an AI image of school labs or creative projects', query: 'Create an AI image of a smart classroom in CM Rise School Waraseoni' },
        { emoji: '🏗️', title: 'Smart Labs & Facilities', desc: 'Atal Tinkering Lab, computer lab & coding details', query: 'Tell me about the Atal Tinkering Lab' }
      ],
      quickLinks: [
        { emoji: '🕐', label: 'School Timings', query: 'What are the school timings?' },
        { emoji: '📝', label: 'Admission Info', query: 'Tell me about the admission process' },
        { emoji: '📖', label: 'Streams & Subjects', query: 'What subjects are available in class 11?' },
        { emoji: '🏗️', label: 'Facilities', query: 'What facilities are available in this school?' },
        { emoji: '📅', label: 'Holidays / Calendar', query: 'Show the holiday list' },
        { emoji: '📋', label: 'Rules & Regs', query: 'What are the school rules?' },
        { emoji: '📞', label: 'Contact Us', query: 'How can I contact the school?' },
        { emoji: '🌟', label: 'About CM Rise', query: 'What is CM Rise / Sandipani scheme?' }
      ]
    }
  };

  // Update page title
  document.title = `${botName} — ${schoolName} AI Assistant`;

  // Build welcome cards from localized dictionary
  function buildWelcomeCardsHTML(lang) {
    const cards = UI_TEXT[lang].welcomeCards;
    return cards.map(c => `
      <div class="welcome-card" data-query="${c.query}">
        <div class="card-icon">${c.emoji}</div>
        <div class="card-title">${c.title}</div>
        <div class="card-desc">${c.desc}</div>
      </div>
    `).join('');
  }

  // ─── Language Selector Setup ───
  let selectedLang = localStorage.getItem('saarthi_lang') || 'hi';
  window.SELECTED_LANG = selectedLang; // Global for gemini.js to read

  const langBtn = document.getElementById('langBtn');
  const langFlag = document.getElementById('langFlag');
  const langLabel = document.getElementById('langLabel');
  const langSelector = document.getElementById('langSelector');
  const langDropdown = document.getElementById('langDropdown');

  const LANG_META = {
    hi: { flag: '🇮🇳', label: 'हिंदी' },
    en: { flag: '🇬🇧', label: 'English' }
  };

  function applyLanguage(lang) {
    selectedLang = lang;
    window.SELECTED_LANG = lang;
    localStorage.setItem('saarthi_lang', lang);

    const txt = UI_TEXT[lang];

    // Header updates
    if (headerTitle) headerTitle.textContent = txt.headerTitle;
    if (statusText && !isWaitingForResponse) statusText.textContent = txt.statusOnline;

    const headerBadge = document.getElementById('header-badge');
    if (headerBadge) {
      const badgeText = (cfg.block || cfg.district) ? `CM Rise • ${cfg.block || cfg.district}` : 'CM Rise';
      headerBadge.textContent = lang === 'en' ? badgeText.replace('वारासिवनी', 'Waraseoni') : badgeText;
    }
    if (headerAvatar) headerAvatar.textContent = botEmoji;

    // Sidebar branding (dynamic English names on English mode)
    if (sidebarBotName) sidebarBotName.textContent = lang === 'en' ? botNameEnglish : botName;
    if (sidebarSchoolName) {
      const sName = lang === 'en' ? schoolNameEnglish : schoolName;
      sidebarSchoolName.textContent = sName.length > 30 ? sName.substring(0, 28) + '...' : sName;
    }

    // Sidebar buttons and labels
    const btnTextNewChat = document.getElementById('btnTextNewChat');
    if (btnTextNewChat) btnTextNewChat.textContent = txt.newChat;

    const labelRecentChats = document.getElementById('labelRecentChats');
    if (labelRecentChats) labelRecentChats.textContent = txt.recentChats;

    const labelQuickLinks = document.getElementById('labelQuickLinks');
    if (labelQuickLinks) labelQuickLinks.textContent = txt.quickAsk;

    const btnTextClearChat = document.getElementById('btnTextClearChat');
    if (btnTextClearChat) btnTextClearChat.textContent = txt.clearChat;

    const noHistoryTextEl = document.getElementById('noHistoryText');
    if (noHistoryTextEl) noHistoryTextEl.textContent = txt.noHistory;

    // Footer input hint
    const inputHint = document.getElementById('inputHint');
    if (inputHint) inputHint.textContent = txt.inputHint;

    // Message Input Placeholder
    if (messageInput) messageInput.placeholder = txt.placeholder;

    // Dropdown UI updates
    const meta = LANG_META[lang];
    if (langFlag) langFlag.textContent = meta.flag;
    if (langLabel) langLabel.textContent = meta.label;

    // Update active dropdown item
    document.querySelectorAll('.lang-option').forEach(opt => {
      opt.classList.toggle('active', opt.dataset.lang === lang);
    });

    // Populate welcome grid if showing
    const welcomeGrid = document.getElementById('welcomeGrid');
    if (welcomeGrid) welcomeGrid.innerHTML = buildWelcomeCardsHTML(lang);

    // Update welcome screen text elements
    const welcomeSectionEl = document.getElementById('welcomeSection');
    if (welcomeSectionEl) {
      const welcomeAvatarEl = document.getElementById('welcome-avatar');
      if (welcomeAvatarEl) welcomeAvatarEl.textContent = botEmoji;

      const welcomeTitleEl = welcomeSectionEl.querySelector('.welcome-title');
      if (welcomeTitleEl) welcomeTitleEl.innerHTML = txt.welcomeTitle;

      const welcomeSubtitleEl = welcomeSectionEl.querySelector('.welcome-subtitle');
      if (welcomeSubtitleEl) welcomeSubtitleEl.textContent = txt.welcomeSubtitle;
    }

    // Re-populate sidebar quick links
    const quickLinksContainer = document.getElementById('quickLinksContainer');
    if (quickLinksContainer) {
      const links = txt.quickLinks;
      quickLinksContainer.innerHTML = links.map(l => `
        <button class="quick-link-btn" data-query="${l.query}">
          <span class="ql-icon">${l.emoji}</span>
          <span>${l.label}</span>
        </button>
      `).join('');

      // Re-bind click events
      quickLinksContainer.querySelectorAll('.quick-link-btn').forEach(btn => {
        btn.addEventListener('click', () => sendMessage(btn.dataset.query));
      });
    }

    // Re-bind suggest card click events
    bindChipEvents();
  }

  // Apply saved language on load
  applyLanguage(selectedLang);

  // Toggle dropdown
  if (langBtn) {
    langBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      langSelector.classList.toggle('open');
    });
  }

  // Select language from dropdown
  document.querySelectorAll('.lang-option').forEach(opt => {
    opt.addEventListener('click', () => {
      const prevLang = selectedLang;
      applyLanguage(opt.dataset.lang);
      langSelector.classList.remove('open');

      // If language actually changed, clear AI history so next response is in new language
      if (prevLang !== opt.dataset.lang) {
        if (typeof gemini !== 'undefined' && gemini) {
          gemini.clearHistory();
        }
        // Show a brief toast notification
        const langName = opt.dataset.lang === 'en' ? 'English' : 'Hindi / हिंदी';
        const toast = document.createElement('div');
        toast.style.cssText = 'position:fixed;bottom:90px;left:50%;transform:translateX(-50%);background:rgba(99,102,241,0.95);color:#fff;padding:8px 20px;border-radius:20px;font-size:0.82rem;z-index:9999;font-family:inherit;box-shadow:0 4px 20px rgba(0,0,0,0.4);';
        toast.textContent = `🌐 Language changed to ${langName}`;
        document.body.appendChild(toast);
        setTimeout(() => toast.remove(), 2500);
      }
    });
  });

  // Close dropdown on outside click
  document.addEventListener('click', (e) => {
    if (langSelector && !langSelector.contains(e.target)) {
      langSelector.classList.remove('open');
    }
  });


  // ─── Initialize Modules ───
  const gemini = new GeminiChat();
  const history = new ChatHistoryManager();

  let currentSessionId = "";
  let isWaitingForResponse = false;
  let isVoiceOutputEnabled = localStorage.getItem("saarthi_voice_output") === "true";
  let recognition = null;
  let isRecording = false;

  // Initialize Voice Toggle UI state
  if (isVoiceOutputEnabled) {
    voiceToggleBtn.classList.add("voice-on");
    voiceToggleBtn.querySelector(".vt-icon").textContent = "🔊";
  } else {
    voiceToggleBtn.classList.remove("voice-on");
    voiceToggleBtn.querySelector(".vt-icon").textContent = "🔈";
  }

  // ─── Speech Recognition (Voice Typing) Setup ───
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (SpeechRecognition) {
    recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = "hi-IN"; // Default to Hindi, accepts English too

    recognition.onstart = () => {
      isRecording = true;
      micBtn.classList.add("recording");
      messageInput.placeholder = "सुन रहा हूँ... बोलिए (Speak now)";
      updateStatus("सुन रहा हूँ...", false);
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      messageInput.value = (messageInput.value + " " + transcript).trim();
      autoResizeTextarea();
      sendBtn.disabled = false;
    };

    recognition.onerror = (event) => {
      console.error("Speech Recognition Error:", event.error);
      stopRecording();
    };

    recognition.onend = () => {
      stopRecording();
    };
  } else {
    // Hide mic button if browser doesn't support Web Speech API
    micBtn.style.display = "none";
    console.warn("Speech recognition not supported in this browser.");
  }

  function startRecording() {
    if (!recognition) return;
    try {
      window.speechSynthesis.cancel(); // Stop talking when user starts speaking
      recognition.start();
    } catch (e) {
      console.error("Start recording failed:", e);
    }
  }

  function stopRecording() {
    isRecording = false;
    if (micBtn) micBtn.classList.remove("recording");
    if (messageInput) messageInput.placeholder = UI_TEXT[selectedLang].placeholder;
    updateStatus(UI_TEXT[selectedLang].statusOnline, false);
    if (recognition) {
      try {
        recognition.stop();
      } catch (e) {}
    }
  }

  // ─── Speech Synthesis (Text to Speech) Setup ───
  let synth = window.speechSynthesis;
  let activeSpeechUtterance = null;
  let activeSpeakButton = null;

  /**
   * Read text aloud using Speech Synthesis
   * @param {string} text - Clean text to speak
   * @param {HTMLElement} speakButton - Button trigger for animation feedback
   */
  function speakText(text, speakButton = null) {
    if (!synth) return;

    // Stop current speech
    stopSpeaking();

    // Clean text from markdown syntax
    const cleanText = text
      .replace(/[*#`_\-]/g, "") // Remove markdown characters
      .replace(/<[^>]*>/g, "") // Remove HTML tags
      .replace(/\(.*?\)/g, "") // Remove parentheses content to make it flow better
      .trim();

    if (!cleanText) return;

    const utterance = new SpeechSynthesisUtterance(cleanText);
    
    // Choose appropriate voice/language
    // Hindi characters range: \u0900-\u097F
    const hasHindi = /[\u0900-\u097F]/.test(cleanText);
    utterance.lang = hasHindi ? "hi-IN" : "en-US";

    // Set voice properties
    utterance.rate = 1.0;
    utterance.pitch = 1.0;

    // Apply voice settings (find browser installed Hindi/English voice)
    const voices = synth.getVoices();
    let selectedVoice = null;

    if (hasHindi) {
      selectedVoice = voices.find(v => v.lang.includes("hi-IN") || v.lang.includes("hi_IN"));
    }
    if (!selectedVoice) {
      // Fallback to English or default voice
      selectedVoice = voices.find(v => v.lang.includes("en-US") || v.lang.includes("en-GB") || v.default);
    }
    if (selectedVoice) {
      utterance.voice = selectedVoice;
    }

    // Set active states
    activeSpeechUtterance = utterance;
    activeSpeakButton = speakButton;

    if (speakButton) {
      speakButton.classList.add("speaking");
      speakButton.textContent = "⏹️";
    }

    utterance.onend = () => {
      resetSpeakingUI();
    };

    utterance.onerror = (e) => {
      console.error("Speech Synthesis Error:", e);
      resetSpeakingUI();
    };

    synth.speak(utterance);
  }

  function stopSpeaking() {
    if (synth) {
      synth.cancel();
    }
    resetSpeakingUI();
  }

  function resetSpeakingUI() {
    if (activeSpeakButton) {
      activeSpeakButton.classList.remove("speaking");
      activeSpeakButton.textContent = "🔊";
    }
    activeSpeechUtterance = null;
    activeSpeakButton = null;
  }

  // ─── Multi-Session Management Functions ───

  /**
   * Starts a completely new chat session
   */
  function startNewChat() {
    // Stop any active audio
    stopSpeaking();
    stopRecording();

    currentSessionId = "session_" + Date.now() + "_" + Math.random().toString(36).substr(2, 9);

    const txt = UI_TEXT[selectedLang];

    // Build welcome screen using localized values
    chatMessages.innerHTML = `
      <div class="welcome-section" id="welcomeSection">
        <div class="welcome-avatar" id="welcome-avatar">${botEmoji}</div>
        <h2 class="welcome-title">
          ${txt.welcomeTitle}
        </h2>
        <p class="welcome-subtitle">
          ${txt.welcomeSubtitle}
        </p>
        <div class="welcome-grid" id="welcomeGrid">
          ${buildWelcomeCardsHTML(selectedLang)}
        </div>
      </div>
    `;

    // Reset Gemini context
    gemini.clearHistory();

    // Re-bind click events for suggestion cards
    bindChipEvents();

    // Render list to show active state
    renderSessionsList();
    messageInput.focus();
  }

  /**
   * Renders the session list in the sidebar
   */
  function renderSessionsList() {
    const sessions = history.getSessions();
    
    // Clear current list container (leaving noHistoryText alone if needed)
    recentChatsList.innerHTML = "";

    if (sessions.length === 0) {
      noHistoryText.style.display = "block";
      recentChatsList.appendChild(noHistoryText);
      return;
    }

    noHistoryText.style.display = "none";

    sessions.forEach(session => {
      const item = document.createElement("div");
      item.className = `chat-session-item ${session.id === currentSessionId ? "active" : ""}`;
      item.dataset.id = session.id;

      const icon = document.createElement("span");
      icon.className = "session-icon";
      icon.textContent = "💬";

      const title = document.createElement("span");
      title.className = "session-title";
      title.textContent = session.title;
      title.title = session.title;

      const deleteBtn = document.createElement("button");
      deleteBtn.className = "delete-session-btn";
      deleteBtn.title = "चैट हटाएं";
      deleteBtn.textContent = "✕";

      // Delete session click handler
      deleteBtn.addEventListener("click", (e) => {
        e.stopPropagation(); // Prevent loading this session
        
        // Show confirm small alert or just delete (ChatGPT style is direct delete)
        history.deleteSession(session.id);
        
        // If we deleted the currently active session, start a new chat
        if (session.id === currentSessionId) {
          startNewChat();
        } else {
          renderSessionsList();
        }
      });

      // Load session click handler
      item.addEventListener("click", () => {
        loadSession(session.id);
      });

      item.appendChild(icon);
      item.appendChild(title);
      item.appendChild(deleteBtn);
      recentChatsList.appendChild(item);
    });
  }

  /**
   * Load a session's message history onto the screen and into Gemini context
   * @param {string} sessionId 
   */
  function loadSession(sessionId) {
    if (sessionId === currentSessionId && chatMessages.innerHTML !== "") {
      closeSidebar();
      return; // Already loaded
    }

    // Stop speaking
    stopSpeaking();
    stopRecording();

    currentSessionId = sessionId;
    
    // Update active highlight in sidebar
    document.querySelectorAll(".chat-session-item").forEach(item => {
      item.classList.toggle("active", item.dataset.id === sessionId);
    });

    // Clear main chat area
    chatMessages.innerHTML = "";
    welcomeSection.style.display = "none";

    const messages = history.getSessionMessages(sessionId);
    
    if (messages.length === 0) {
      welcomeSection.style.display = "flex";
      gemini.clearHistory();
    } else {
      // Render messages
      messages.forEach(msg => {
        appendMessage(msg.sender, msg.text, msg.timestamp, false);
      });

      // Load into Gemini memory context
      gemini.loadHistory(messages);
    }

    scrollToBottom();
    closeSidebar();
  }

  // ─── Load Saved Chat History ───
  function loadSavedHistory() {
    const sessions = history.getSessions();
    if (sessions.length > 0) {
      renderSessionsList();
      // Load the most recent session
      loadSession(sessions[0].id);
    } else {
      startNewChat();
    }
  }

  // ─── Send Message ───
  async function sendMessage(text) {
    const userText = text || messageInput.value.trim();
    if (!userText || isWaitingForResponse) return;

    isWaitingForResponse = true;

    // Stop speaking if user interacts/sends new query
    stopSpeaking();
    stopRecording();

    // Ensure session exists (create if starting from fresh welcome screen)
    let isNewSession = false;
    const messages = history.getSessionMessages(currentSessionId);
    if (messages.length === 0) {
      isNewSession = true;
      history.createSession(currentSessionId, userText);
    }

    // Hide welcome section
    if (welcomeSection) {
      welcomeSection.style.display = "none";
    }

    // Clear input
    messageInput.value = "";
    autoResizeTextarea();
    sendBtn.disabled = true;

    // Append user message
    const userTimestamp = Date.now();
    appendMessage("user", userText, userTimestamp);
    history.saveMessage(currentSessionId, { sender: "user", text: userText, timestamp: userTimestamp });

    // Re-render sidebar list to show generated title if it's the first message
    if (isNewSession) {
      renderSessionsList();
    }

    // Show typing indicator
    const typingEl = showTypingIndicator();
    updateStatus(UI_TEXT[selectedLang].statusTyping, true);

    // Close sidebar on mobile
    closeSidebar();

    // Get AI response
    const aiResponse = await gemini.sendMessage(userText);

    // Remove typing indicator
    typingEl.remove();

    // Append bot message
    const botTimestamp = Date.now();
    const botMsgBubble = appendMessage("bot", aiResponse, botTimestamp);
    history.saveMessage(currentSessionId, { sender: "bot", text: aiResponse, timestamp: botTimestamp });

    // Auto voice output if active
    if (isVoiceOutputEnabled) {
      const speakBtn = botMsgBubble.querySelector(".speak-btn");
      speakText(aiResponse, speakBtn);
    }

    updateStatus(UI_TEXT[selectedLang].statusOnline, false);
    isWaitingForResponse = false;

    // Re-enable send button if there's text
    if (messageInput.value.trim()) {
      sendBtn.disabled = false;
    }
  }

  // ─── Append Message to Chat ───
  function appendMessage(sender, text, timestamp, animate = true) {
    const wrapper = document.createElement("div");
    wrapper.className = `message-wrapper ${sender}`;

    if (!animate) {
      wrapper.style.animation = "none";
    }

    const avatar = document.createElement("div");
    avatar.className = "message-avatar";
    avatar.textContent = sender === "bot" ? "🤖" : "👤";

    const bubbleContainer = document.createElement("div");
    bubbleContainer.style.position = "relative";

    const bubble = document.createElement("div");
    bubble.className = "message-bubble";

    if (sender === "bot") {
      bubble.innerHTML = renderMarkdown(text);
      
      // Add Text-to-Speech button inside bot bubble
      const speakBtn = document.createElement("button");
      speakBtn.className = "speak-btn";
      speakBtn.title = "आवाज सुने/बंद करें";
      speakBtn.textContent = "🔊";
      
      speakBtn.addEventListener("click", () => {
        if (speakBtn.classList.contains("speaking")) {
          stopSpeaking();
        } else {
          speakText(text, speakBtn);
        }
      });
      
      bubble.appendChild(speakBtn);
    } else {
      bubble.textContent = text;
    }

    const time = document.createElement("div");
    time.className = "message-time";
    time.textContent = ChatHistoryManager.formatTime(timestamp || Date.now());

    bubbleContainer.appendChild(bubble);
    bubbleContainer.appendChild(time);

    wrapper.appendChild(avatar);
    wrapper.appendChild(bubbleContainer);

    chatMessages.appendChild(wrapper);
    scrollToBottom();

    return wrapper;
  }

  // ─── Simple Markdown Renderer ───
  function renderMarkdown(text) {
    if (!text) return "";

    let html = text
      // Escape HTML
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");

    // Robust Markdown Images Parser with parenthesis tracking
    html = (() => {
      let result = "";
      let currentIndex = 0;
      
      while (true) {
        let imgStart = html.indexOf("![", currentIndex);
        if (imgStart === -1) {
          result += html.substring(currentIndex);
          break;
        }
        
        result += html.substring(currentIndex, imgStart);
        
        let bracketClose = html.indexOf("]", imgStart + 2);
        if (bracketClose === -1) {
          result += html.substring(imgStart, imgStart + 2);
          currentIndex = imgStart + 2;
          continue;
        }
        
        let altText = html.substring(imgStart + 2, bracketClose);
        
        if (html.charAt(bracketClose + 1) !== "(") {
          result += html.substring(imgStart, bracketClose + 1);
          currentIndex = bracketClose + 1;
          continue;
        }
        
        let parenStart = bracketClose + 1;
        let parenClose = -1;
        let openCount = 0;
        
        for (let i = parenStart; i < html.length; i++) {
          if (html.charAt(i) === "(") {
            openCount++;
          } else if (html.charAt(i) === ")") {
            openCount--;
            if (openCount === 0) {
              parenClose = i;
              break;
            }
          }
        }
        
        if (parenClose === -1) {
          result += html.substring(imgStart, parenStart + 1);
          currentIndex = parenStart + 1;
          continue;
        }
        
        let imageUrl = html.substring(parenStart + 1, parenClose).trim();
        
        // URL-encode spaces and double quotes in URL to ensure browser correctness
        imageUrl = imageUrl.replace(/\s+/g, "%20").replace(/"/g, "%22");
        
        const replacement = `<div class="chat-image-wrapper"><img src="${imageUrl}" alt="${altText}" class="chat-generated-image" loading="lazy" /><a href="${imageUrl}" target="_blank" class="download-img-btn">📥 डाउनलोड करें (Download)</a></div>`;
        
        result += replacement;
        currentIndex = parenClose + 1;
      }
      return result;
    })();

    // Other Markdown elements
    html = html
      // Headers
      .replace(/^### (.+)$/gm, "<h3>$1</h3>")
      .replace(/^## (.+)$/gm, "<h2>$1</h2>")
      .replace(/^# (.+)$/gm, "<h1>$1</h1>")

      // Bold
      .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")

      // Italic
      .replace(/\*(.+?)\*/g, "<em>$1</em>")

      // Inline code
      .replace(/`(.+?)`/g, "<code>$1</code>")

      // Unordered list items
      .replace(/^[\-\*] (.+)$/gm, "<li>$1</li>")

      // Ordered list items
      .replace(/^\d+\. (.+)$/gm, "<li>$1</li>")

      // Line breaks
      .replace(/\n\n/g, "</p><p>")
      .replace(/\n/g, "<br>");

    // Wrap consecutive <li> items in <ul>
    html = html.replace(/(<li>.*?<\/li>)(\s*<br>)?/g, "$1");
    html = html.replace(/((?:<li>.*?<\/li>\s*)+)/g, "<ul>$1</ul>");

    // Wrap in paragraph
    html = `<p>${html}</p>`;

    // Clean empty paragraphs
    html = html.replace(/<p>\s*<\/p>/g, "");

    return html;
  }

  // ─── Typing Indicator ───
  function showTypingIndicator() {
    const typing = document.createElement("div");
    typing.className = "typing-indicator";
    typing.id = "typingIndicator";
    typing.innerHTML = `
      <div class="message-avatar">🤖</div>
      <div class="typing-dots">
        <span></span>
        <span></span>
        <span></span>
      </div>
    `;
    chatMessages.appendChild(typing);
    scrollToBottom();
    return typing;
  }

  // ─── Status Update ───
  function updateStatus(text, isTyping) {
    statusText.textContent = text;
    const statusDot = document.querySelector(".status-dot");
    if (statusDot) {
      statusDot.style.background = isTyping ? "var(--warning-yellow)" : "var(--online-green)";
    }
  }

  // ─── Scroll to Bottom ───
  function scrollToBottom() {
    requestAnimationFrame(() => {
      chatMessages.scrollTop = chatMessages.scrollHeight;
    });
  }

  // ─── Auto-resize Textarea ───
  function autoResizeTextarea() {
    messageInput.style.height = "auto";
    messageInput.style.height = Math.min(messageInput.scrollHeight, 120) + "px";
  }

  // ─── Sidebar Toggle ───
  function openSidebar() {
    sidebar.classList.add("open");
    sidebarOverlay.classList.add("active");
  }

  function closeSidebar() {
    sidebar.classList.remove("open");
    sidebarOverlay.classList.remove("active");
  }

  // ─── Clear Chat Confirmation ───
  function showClearConfirmation() {
    const txt = UI_TEXT[selectedLang];
    const overlay = document.createElement("div");
    overlay.className = "confirm-overlay";
    overlay.innerHTML = `
      <div class="confirm-dialog">
        <h3>${txt.dialogTitle}</h3>
        <p>${txt.dialogDesc}</p>
        <div class="confirm-actions">
          <button class="btn-cancel" id="cancelClear">${txt.cancelDeleteBtn}</button>
          <button class="btn-confirm-delete" id="confirmClear">${txt.confirmDeleteBtn}</button>
        </div>
      </div>
    `;
    document.body.appendChild(overlay);

    document.getElementById("cancelClear").addEventListener("click", () => {
      overlay.remove();
    });

    document.getElementById("confirmClear").addEventListener("click", () => {
      // Clear everything
      history.clearHistory();
      gemini.clearHistory();

      // Remove all messages
      chatMessages.innerHTML = "";

      // Clear the sidebar session items
      renderSessionsList();

      // Reset to a fresh chat
      startNewChat();

      overlay.remove();
      closeSidebar();
    });
  }

  // ─── Bind Chip / Quick Link Click Events ───
  function bindChipEvents() {
    // Welcome cards and chips
    document.querySelectorAll(".welcome-card[data-query], .chip[data-query]").forEach(card => {
      card.addEventListener("click", () => {
        sendMessage(card.dataset.query);
      });
    });
  }

  // ─── Event Listeners ───

  // New Chat button
  newChatBtn.addEventListener("click", () => startNewChat());

  // Send button
  sendBtn.addEventListener("click", () => sendMessage());

  // Mic button (Voice typing)
  micBtn.addEventListener("click", () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  });

  // Voice toggle button (Speech output)
  voiceToggleBtn.addEventListener("click", () => {
    isVoiceOutputEnabled = !isVoiceOutputEnabled;
    localStorage.setItem("saarthi_voice_output", isVoiceOutputEnabled);
    
    if (isVoiceOutputEnabled) {
      voiceToggleBtn.classList.add("voice-on");
      voiceToggleBtn.querySelector(".vt-icon").textContent = "🔊";
      speakText("सारथी वॉयस मोड चालू है");
    } else {
      voiceToggleBtn.classList.remove("voice-on");
      voiceToggleBtn.querySelector(".vt-icon").textContent = "🔈";
      stopSpeaking();
    }
  });

  // Enter to send, Shift+Enter for new line
  messageInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  });

  // Auto-resize & enable/disable send button
  messageInput.addEventListener("input", () => {
    autoResizeTextarea();
    sendBtn.disabled = !messageInput.value.trim() || isWaitingForResponse;
  });

  // Sidebar
  menuBtn.addEventListener("click", openSidebar);
  sidebarClose.addEventListener("click", closeSidebar);
  sidebarOverlay.addEventListener("click", closeSidebar);

  // Quick links in sidebar
  document.querySelectorAll(".quick-link-btn[data-query]").forEach(btn => {
    btn.addEventListener("click", () => {
      sendMessage(btn.dataset.query);
    });
  });

  // Clear chat
  clearChatBtn.addEventListener("click", showClearConfirmation);

  // Welcome chips
  bindChipEvents();

  // ─── Initialize ───
  loadSavedHistory();
  messageInput.focus();
});
