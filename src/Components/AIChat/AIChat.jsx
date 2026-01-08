import { useState } from "react";
import axios from "axios"; // 1. Import Axios
import styles from "./AIChat.module.css";

// 2. Accept 'user' as a prop to get the tenantId
function AIChat({ user }) {
//     // 👇 GRAB USER FROM CONTEXT
//   const { user } = useOutletContext();
  const [messages, setMessages] = useState([
    { role: "ai", content: "Hi 👋 Ask me anything about your documents." }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    // 1. Add User Message to UI instantly
    const newMessages = [...messages, { role: "user", content: input }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      // 2. Make the API Call
      // The backend expects query parameters: ?query=...&tenantId=...
      console.log("ai details to user",{query: input,tenantId: user?.tenantId  })
      const response = await axios.post(
        "http://localhost:8080/openai/ask", 
        null, // No JSON body needed since we use params below
       
        {
          params: {
            query: input,
            tenantId: user?.tenantId || "PUBLIC" 
          }
        }
      );

      // 3. Add AI Response to UI
      setMessages((prev) => [
        ...prev,
        { role: "ai", content: response.data } // The string answer from Java
      ]);

    } catch (error) {
      console.error("Chat Error:", error);
      setMessages((prev) => [
        ...prev,
        { role: "ai", content: "⚠️ Error: Could not reach the Vault." }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.chatContainer}>
      <div className={styles.chatHeader}>
        <h3>Vault AI Assistant</h3>
        <span>Secure • Smart • Fast</span>
      </div>

      <div className={styles.chatMessages}>
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`${styles.message} ${
              msg.role === "user" ? styles.user : styles.ai
            }`}
          >
            {msg.content}
          </div>
        ))}
        {/* Show a "Thinking..." bubble while loading */}
        {loading && <div className={`${styles.message} ${styles.ai}`}>Thinking... </div>}
      </div>

      <div className={styles.chatInput}>
        <input
          type="text"
          placeholder="Ask something about your documents..."
          value={input}
          disabled={loading} // Disable input while waiting
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button onClick={sendMessage} disabled={loading}>
          {loading ? "..." : "Send"}
        </button>
      </div>
    </div>
  );
}

export default AIChat;