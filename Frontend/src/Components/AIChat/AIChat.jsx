import { useState, useRef, useEffect } from "react";
import axios from "axios";
import styles from "./AIChat.module.css";

function AIChat({ user }) {
  const [messages, setMessages] = useState([
    { role: "ai", content: "Hi there! I'm your Vault Assistant. Ask me anything about your secure documents." }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  
  // Ref for auto-scrolling
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { role: "user", content: input }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      // Simulate API delay for realism if testing locally, otherwise remove timeout
      // await new Promise(r => setTimeout(r, 800)); 

      const response = await axios.post(
        "http://localhost:8080/openai/ask", 
        null, 
        {
          params: {
            query: input,
            tenantId: user?.tenantId || "PUBLIC" 
          }
        }
      );

      setMessages((prev) => [
        ...prev,
        { role: "ai", content: response.data }
      ]);

    } catch (error) {
      console.error("Chat Error:", error);
      setMessages((prev) => [
        ...prev,
        { role: "ai", content: "⚠️ I'm having trouble connecting to the Vault. Please try again later." }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <div className={styles.chatContainer}>
      {/* Header */}
      <div className={styles.chatHeader}>
        <div className={styles.headerInfo}>
            <div className={styles.statusDot}></div>
            <div>
                <h3>Vault AI</h3>
                <span className={styles.statusText}>Online • Secure Environment</span>
            </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className={styles.chatMessages}>
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`${styles.messageWrapper} ${
              msg.role === "user" ? styles.userWrapper : styles.aiWrapper
            }`}
          >
            {/* Avatar Logic */}
            <div className={styles.avatar}>
               {msg.role === 'ai' ? (
                 <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 0 1 7 7h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v1a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-1H2a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h1a7 7 0 0 1 7-7h1V5.73c-.6-.34-1-.99-1-1.73a2 2 0 0 1 2-2z"></path></svg>
               ) : (
                 <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
               )}
            </div>

            <div className={`${styles.message} ${msg.role === "user" ? styles.user : styles.ai}`}>
              {msg.content}
            </div>
          </div>
        ))}

        {/* Typing Indicator */}
        {loading && (
          <div className={`${styles.messageWrapper} ${styles.aiWrapper}`}>
             <div className={styles.avatar}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 0 1 7 7h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v1a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-1H2a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h1a7 7 0 0 1 7-7h1V5.73c-.6-.34-1-.99-1-1.73a2 2 0 0 1 2-2z"></path></svg>
             </div>
             <div className={`${styles.message} ${styles.ai} ${styles.typing}`}>
                <span></span><span></span><span></span>
             </div>
          </div>
        )}
        
        {/* Invisible element to scroll to */}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className={styles.chatInputContainer}>
        <div className={styles.inputWrapper}>
            <input
            type="text"
            placeholder="Ask about your documents..."
            value={input}
            disabled={loading}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            />
            <button onClick={sendMessage} disabled={loading || !input.trim()}>
                {/* Send Icon */}
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
            </button>
        </div>
        <div className={styles.footerNote}>
            AI can make mistakes. Please verify sensitive Vault data.
        </div>
      </div>
    </div>
  );
}

export default AIChat;