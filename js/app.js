// =====================================================
// CM Rise School Balaghat — Saarthi Chatbot
// Main Application Logic
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
    if (messageInput) messageInput.placeholder = "अपना सवाल यहाँ लिखें... (हिंदी या English में)";
    updateStatus("ऑनलाइन • जवाब देने को तैयार", false);
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
    
    // Clear chat display and insert a fresh copy of welcomeSection HTML
    chatMessages.innerHTML = `
      <div class="welcome-section" id="welcomeSection">
        <div class="welcome-avatar">🤖</div>
        <h2 class="welcome-title">
          नमस्ते! मैं <span class="gradient-text">सारथी</span> हूँ
        </h2>
        <p class="welcome-subtitle">
          CM Rise School Balaghat का AI Help Desk Assistant। मैं आज आपकी क्या सहायता कर सकता हूँ?
        </p>
        
        <div class="welcome-grid">
          <div class="welcome-card" data-query="स्कूल का समय क्या है?">
            <div class="card-icon">🕐</div>
            <div class="card-title">स्कूल का समय व कैलेंडर</div>
            <div class="card-desc">समय सारणी, छुट्टियां और परीक्षा तिथियां जानें</div>
          </div>
          <div class="welcome-card" data-query="एडमिशन की प्रक्रिया बताओ">
            <div class="card-icon">📝</div>
            <div class="card-title">प्रवेश प्रक्रिया व नियम</div>
            <div class="card-desc">दाखिला पात्रता, 1-3 किमी नियम और दस्तावेज देखें</div>
          </div>
          <div class="welcome-card" data-query="अटल टिंकरिंग लैब का चित्र बनाओ">
            <div class="card-icon">🎨</div>
            <div class="card-title">एआई इमेज जनरेशन</div>
            <div class="card-desc">स्कूल लैब या रचनात्मक प्रोजेक्ट्स का एआई चित्र बनवाएं</div>
          </div>
          <div class="welcome-card" data-query="अटल टिंकरिंग लैब के बारे में बताओ">
            <div class="card-icon">🏗️</div>
            <div class="card-title">स्मार्ट लैब व सुविधाएं</div>
            <div class="card-desc">अटल टिंकरिंग लैब, कंप्यूटर लैब और कोडिंग की जानकारी</div>
          </div>
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
    updateStatus("टाइप कर रहा है...", true);

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

    updateStatus("ऑनलाइन • जवाब देने को तैयार", false);
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
    const overlay = document.createElement("div");
    overlay.className = "confirm-overlay";
    overlay.innerHTML = `
      <div class="confirm-dialog">
        <h3>🗑️ चैट मिटाएं?</h3>
        <p>क्या आप सारी चैट हिस्ट्री डिलीट करना चाहते हैं? यह वापस नहीं आएगी।</p>
        <div class="confirm-actions">
          <button class="btn-cancel" id="cancelClear">रहने दो</button>
          <button class="btn-confirm-delete" id="confirmClear">हाँ, मिटाओ</button>
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
