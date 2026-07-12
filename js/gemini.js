// =====================================================
// Gemini API Integration
// Google Gemini 2.0 Flash — Free, Fast AI Responses
// =====================================================

const GEMINI_CONFIG = {
  apiKeys: [
    atob("QVEuQWI4Uk42S0haWkJmNWdqRjlIWExBLURJb3VKZm1GQ1hyZUxxTC1WZkZSR0FrRjY1a3c="), // Key 3 (Active)
    atob("QVEuQWI4Uk42STYyeHBSRTA4bTBnbUxvSm1VUnQxR0E0dDBSUnRVNzBZcERCQWpRUDZuWnc="), // Key 1 (Backup)
    atob("QVEuQWI4Uk42Snl2RUZ1bnJOV2Y5N0ZsZVg2RFA0NldlVGdfb3EtUldPTlZxeXQ2QWJyNVE=")  // Key 2 (Backup)
  ],
  currentKeyIndex: 0,
  model: "gemini-2.5-flash",
  apiUrl: "https://generativelanguage.googleapis.com/v1beta/models"
};

class GeminiChat {
  constructor() {
    this.conversationHistory = [];
    this.maxHistoryLength = 20; // Last 20 messages for context
  }

  /**
   * Send a message to Gemini API and get a response
   * @param {string} userMessage - The user's message
   * @returns {Promise<string>} - The AI response text
   */
  async sendMessage(userMessage) {
    // Add user message to history
    this.conversationHistory.push({
      role: "user",
      parts: [{ text: userMessage }]
    });

    // Trim history if too long
    if (this.conversationHistory.length > this.maxHistoryLength) {
      this.conversationHistory = this.conversationHistory.slice(-this.maxHistoryLength);
    }

    let attempts = 0;
    const maxAttempts = GEMINI_CONFIG.apiKeys.length;

    while (attempts < maxAttempts) {
      const activeKey = GEMINI_CONFIG.apiKeys[GEMINI_CONFIG.currentKeyIndex];
      const url = `${GEMINI_CONFIG.apiUrl}/${GEMINI_CONFIG.model}:generateContent?key=${activeKey}`;

      const requestBody = {
        system_instruction: {
          parts: [{ text: SYSTEM_PROMPT }]
        },
        contents: this.conversationHistory,
        generationConfig: {
          temperature: 0.7,
          topP: 0.9,
          topK: 40,
          maxOutputTokens: 1024,
        },
        safetySettings: [
          { category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_NONE" },
          { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_NONE" },
          { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: "BLOCK_NONE" },
          { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_NONE" }
        ]
      };

      try {
        console.log(`Using API Key index: ${GEMINI_CONFIG.currentKeyIndex}`);
        const response = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(requestBody)
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          console.warn(`API Key ${GEMINI_CONFIG.currentKeyIndex} failed:`, response.status, errorData);
          
          // If it's a rate limit or auth error, try next key
          if (response.status === 429 || response.status === 403 || response.status === 401 || response.status === 503) {
            console.log("Rotating API key due to rate limit/error...");
            GEMINI_CONFIG.currentKeyIndex = (GEMINI_CONFIG.currentKeyIndex + 1) % GEMINI_CONFIG.apiKeys.length;
            attempts++;
            continue;
          }

          if (response.status === 400) {
            return "⚠️ API request error। कृपया दोबारा कोशिश करें।";
          }
          return "❌ सर्वर से जवाब नहीं मिला। कृपया इंटरनेट कनेक्शन जांचें और दोबारा कोशिश करें।";
        }

        const data = await response.json();

        // Extract text from response
        const aiText = data?.candidates?.[0]?.content?.parts?.[0]?.text;

        if (!aiText) {
          console.error("Empty response from Gemini:", data);
          return "🤔 मुझे इस सवाल का जवाब नहीं मिला। कृपया दूसरे शब्दों में पूछें।";
        }

        // Add AI response to history
        this.conversationHistory.push({
          role: "model",
          parts: [{ text: aiText }]
        });

        return aiText;

      } catch (error) {
        console.error(`Network Error with API Key ${GEMINI_CONFIG.currentKeyIndex}:`, error);
        
        // Try next key on network error too
        GEMINI_CONFIG.currentKeyIndex = (GEMINI_CONFIG.currentKeyIndex + 1) % GEMINI_CONFIG.apiKeys.length;
        attempts++;
      }
    }

    // If we reach here, all keys failed
    return "⏳ सभी बैकअप API keys सीमा पार कर चुकी हैं या काम नहीं कर रही हैं। कृपया कुछ मिनट बाद दोबारा कोशिश करें।";
  }

  /**
   * Load conversation history (from localStorage restore)
   * @param {Array} history - Array of message objects
   */
  loadHistory(history) {
    this.conversationHistory = history.map(msg => ({
      role: msg.sender === "user" ? "user" : "model",
      parts: [{ text: msg.text }]
    }));

    // Keep only last N for API context
    if (this.conversationHistory.length > this.maxHistoryLength) {
      this.conversationHistory = this.conversationHistory.slice(-this.maxHistoryLength);
    }
  }

  /**
   * Clear conversation history
   */
  clearHistory() {
    this.conversationHistory = [];
  }
}
