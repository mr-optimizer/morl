"use client";
import { useState, useEffect, useRef } from "react";
import styles from "./ChatBox.module.css";
// import SendIcon from "@mui/icons-material/Send";

interface Message {
  id: number;
  username: string;
  content: string;
}

const ChatBox = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState<string>("");
  const [username, setUsername] = useState<string>("Mohak Harish Gidwani ");
  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage: Message = {
        id: messages.length + 1,
        username,
        content: message,
      };
      setMessages([...messages, newMessage]);
      setMessage(""); // Clear the input field after sending the message
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <div className={styles.ChatBox_Container}>
      <div className={styles.chatContainer}>
        <div className={styles.chatBox}>
          {messages.map((msg) => (
            <div key={msg.id} className={styles.message}>
              <strong>{msg.username}: </strong>
              <span>{msg.content}</span>
            </div>
          ))}
          {/* Invisible div to track end of messages for auto-scroll */}
          <div ref={chatEndRef} />
        </div>
        <div className={styles.inputContainer}>
          <input
            type="text"
            placeholder="Keep Chatting"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress} // Detect Enter key press
            className={styles.messageInput}
          />
        </div>
      </div>
    </div>
  );
};

export default ChatBox;
