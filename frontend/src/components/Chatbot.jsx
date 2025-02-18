import React, { useState, useRef, useEffect } from "react";
import "./Chatbot.css"; // Ensure you have the CSS file

const keywordResponses = [
  { keywords: ["savings", "account"], response: "A savings account allows you to deposit money and earn interest over time." },
  { keywords: ["checking", "account"], response: "A checking account is used for daily transactions and bill payments." },
  { keywords: ["interest", "rate"], response: "An interest rate is the cost of borrowing money, expressed as a percentage." },
  { keywords: ["credit", "card"], response: "A credit card lets you borrow money up to a certain limit, which you must repay." },
  { keywords: ["fixed", "deposit"], response: "A fixed deposit locks your money for a specific period at a fixed interest rate." },
  { keywords: ["money", "transfer"], response: "You can transfer money using online banking, mobile apps, or bank branches." },
  { keywords: ["online", "banking"], response: "Online banking allows you to perform transactions over the internet." },
  { keywords: ["loan", "approval"], response: "The loan approval process involves applying, document verification, and credit check." },
  { keywords: ["mortgage", "loan"], response: "A mortgage loan is used to buy property and requires repayment with interest." },
  { keywords: ["foreign", "exchange"], response: "Foreign exchange services allow you to convert one currency into another." },
];

const findKeywordMatch = (input) => {
  input = input.toLowerCase();
  for (const item of keywordResponses) {
    if (item.keywords.some((keyword) => input.includes(keyword))) {
      return item.response;
    }
  }
  return "Sorry, I don't understand. Could you rephrase?";
};

const Chatbot = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  const toggleChat = () => setIsChatOpen(!isChatOpen);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    const botMessage = { sender: "bot", text: "Loading..." };
    setMessages((prev) => [...prev, botMessage]);

    try {
      const response = await fetch("http://localhost:5000/api/chatbot/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input.toLowerCase().trim() }),
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const data = await response.json();
      let botResponse = data.response;

      // If backend response is unclear, use keyword-based matching
      if (!botResponse || botResponse.toLowerCase().includes("i don't understand")) {
        botResponse = findKeywordMatch(input);
      }

      setMessages((prev) =>
        prev.map((msg, idx) =>
          idx === prev.length - 1 ? { ...msg, text: botResponse } : msg
        )
      );
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) =>
        prev.map((msg, idx) =>
          idx === prev.length - 1
            ? { ...msg, text: "An error occurred. Please try again." }
            : msg
        )
      );
    }
  };

  // Auto-scroll to the latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="chatbot-container">
      <div className="chatbot-icon" onClick={toggleChat}>
        💬
      </div>
      {isChatOpen && (
        <div className="chatbox">
          <div className="chatbox-header">
            <span>Banking Chatbot</span>
            <button onClick={toggleChat}>&times;</button>
          </div>
          <div className="chatbox-messages">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`chatbox-message ${
                  msg.sender === "bot" ? "bot" : "user"
                }`}
              >
                {msg.text}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <div className="chatbox-footer">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              onKeyPress={(e) => e.key === "Enter" && sendMessage()}
            />
            <button onClick={sendMessage} disabled={!input.trim()}>
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;