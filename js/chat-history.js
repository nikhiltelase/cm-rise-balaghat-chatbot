// =====================================================
// Chat History Manager — Multi-session localStorage based
// Handles multiple chat histories like ChatGPT/Gemini
// =====================================================

class ChatHistoryManager {
  constructor() {
    this.sessionsListKey = "cmrise_sessions_list";
    this.maxMessagesPerSession = 100;
  }

  /**
   * Get all active sessions
   * @returns {Array} Array of session metadata objects: [{ id, title, timestamp }]
   */
  getSessions() {
    try {
      const data = localStorage.getItem(this.sessionsListKey);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error("Error reading sessions list:", error);
      return [];
    }
  }

  /**
   * Get messages for a specific session
   * @param {string} sessionId 
   * @returns {Array} Array of message objects: [{ sender, text, timestamp }]
   */
  getSessionMessages(sessionId) {
    if (!sessionId) return [];
    try {
      const data = localStorage.getItem(`cmrise_session_msg_${sessionId}`);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error(`Error reading messages for session ${sessionId}:`, error);
      return [];
    }
  }

  /**
   * Create a new session metadata
   * @param {string} sessionId 
   * @param {string} title 
   * @returns {Object} The created session
   */
  createSession(sessionId, title = "नया चैट (New Chat)") {
    try {
      const sessions = this.getSessions();
      
      // Check if session already exists
      const existing = sessions.find(s => s.id === sessionId);
      if (existing) return existing;

      const newSession = {
        id: sessionId,
        title: title,
        timestamp: Date.now()
      };

      sessions.unshift(newSession); // Add to beginning (latest first)
      localStorage.setItem(this.sessionsListKey, JSON.stringify(sessions));
      return newSession;
    } catch (error) {
      console.error("Error creating session:", error);
      return null;
    }
  }

  /**
   * Save a message to a specific session
   * @param {string} sessionId 
   * @param {Object} message - { sender: 'user'|'bot', text: string, timestamp: number }
   */
  saveMessage(sessionId, message) {
    if (!sessionId) return;
    try {
      // 1. Save message to session-specific storage
      const messages = this.getSessionMessages(sessionId);
      const isFirstMessage = messages.length === 0;

      messages.push({
        sender: message.sender,
        text: message.text,
        timestamp: message.timestamp || Date.now()
      });

      // Trim if too many messages
      if (messages.length > this.maxMessagesPerSession) {
        messages.splice(0, messages.length - this.maxMessagesPerSession);
      }

      localStorage.setItem(`cmrise_session_msg_${sessionId}`, JSON.stringify(messages));

      // 2. Auto-generate title if it's the first user message
      if (isFirstMessage && message.sender === "user") {
        let title = message.text.trim();
        // Limit title length and clean up
        if (title.length > 28) {
          title = title.substring(0, 26) + "...";
        }
        this.updateSessionTitle(sessionId, title);
      } else {
        // Just update the timestamp of the session to push it to the top
        this.touchSession(sessionId);
      }
    } catch (error) {
      console.error(`Error saving message to session ${sessionId}:`, error);
    }
  }

  /**
   * Update session title
   * @param {string} sessionId 
   * @param {string} title 
   */
  updateSessionTitle(sessionId, title) {
    try {
      const sessions = this.getSessions();
      const sessionIndex = sessions.findIndex(s => s.id === sessionId);
      
      if (sessionIndex !== -1) {
        sessions[sessionIndex].title = title;
        sessions[sessionIndex].timestamp = Date.now();
        
        // Move to top
        const [session] = sessions.splice(sessionIndex, 1);
        sessions.unshift(session);
        
        localStorage.setItem(this.sessionsListKey, JSON.stringify(sessions));
      }
    } catch (error) {
      console.error("Error updating session title:", error);
    }
  }

  /**
   * Update timestamp of session to make it active/recent
   * @param {string} sessionId 
   */
  touchSession(sessionId) {
    try {
      const sessions = this.getSessions();
      const sessionIndex = sessions.findIndex(s => s.id === sessionId);
      if (sessionIndex !== -1) {
        sessions[sessionIndex].timestamp = Date.now();
        const [session] = sessions.splice(sessionIndex, 1);
        sessions.unshift(session);
        localStorage.setItem(this.sessionsListKey, JSON.stringify(sessions));
      }
    } catch (error) {}
  }

  /**
   * Delete a single session
   * @param {string} sessionId 
   */
  deleteSession(sessionId) {
    if (!sessionId) return;
    try {
      // Remove messages
      localStorage.removeItem(`cmrise_session_msg_${sessionId}`);
      
      // Remove from list
      const sessions = this.getSessions().filter(s => s.id !== sessionId);
      localStorage.setItem(this.sessionsListKey, JSON.stringify(sessions));
    } catch (error) {
      console.error(`Error deleting session ${sessionId}:`, error);
    }
  }

  /**
   * Clear all sessions and history
   */
  clearHistory() {
    try {
      const sessions = this.getSessions();
      sessions.forEach(s => {
        localStorage.removeItem(`cmrise_session_msg_${s.id}`);
      });
      localStorage.removeItem(this.sessionsListKey);
    } catch (error) {
      console.error("Error clearing history:", error);
    }
  }

  /**
   * Get formatted time string from timestamp
   * @param {number} timestamp 
   * @returns {string}
   */
  static formatTime(timestamp) {
    const date = new Date(timestamp);
    return date.toLocaleTimeString("hi-IN", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true
    });
  }

  /**
   * Check if there are any active sessions
   * @returns {boolean}
   */
  hasHistory() {
    return this.getSessions().length > 0;
  }
}
