"use client";

import { useState } from "react";
import { ChatMessage } from "@/lib/types";

interface ChatProps {
  messages: ChatMessage[];
  vendorName: string;
}

export default function Chat({ messages: initialMessages, vendorName }: ChatProps) {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [newMessage, setNewMessage] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleSend = () => {
    if (!newMessage.trim()) return;

    const msg: ChatMessage = {
      id: `m${Date.now()}`,
      sender: vendorName,
      senderRole: "vendor",
      message: newMessage.trim(),
      timestamp: new Date().toISOString(),
    };

    setMessages([...messages, msg]);
    setNewMessage("");
  };

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleString("en-AU", {
      day: "numeric",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen && (
        <div
          className="bg-white rounded-2xl border border-border-light mb-3 flex flex-col overflow-hidden"
          style={{
            height: "480px",
            width: "380px",
            boxShadow: "0 20px 60px -12px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(0, 0, 0, 0.03)",
          }}
        >
          {/* Header */}
          <div className="bg-background-secondary px-5 py-3.5 flex items-center justify-between border-b border-border-light">
            <div>
              <p className="font-semibold text-sm text-foreground">Stuart Grant</p>
              <p className="text-[11px] text-muted">Your Agent · Grants Estate Agents</p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="w-7 h-7 rounded-full bg-border-light/80 hover:bg-border flex items-center justify-center transition-colors duration-150"
            >
              <svg className="w-3 h-3 text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
            {messages.length === 0 && (
              <div className="text-center mt-16">
                <p className="text-sm text-muted">No messages yet</p>
                <p className="text-xs text-border mt-1">Start a conversation</p>
              </div>
            )}
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.senderRole === "agent" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm ${
                    msg.senderRole === "agent"
                      ? "bg-primary text-white"
                      : "bg-background-secondary text-foreground"
                  }`}
                >
                  <p>{msg.message}</p>
                  <p className={`text-[10px] mt-1 ${msg.senderRole === "agent" ? "text-white/50" : "text-muted"}`}>
                    {formatTime(msg.timestamp)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="px-4 py-3 border-t border-border-light">
            <div className="flex gap-2">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Message..."
                className="flex-1 text-sm bg-background-secondary rounded-full px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-200"
              />
              <button
                onClick={handleSend}
                className="bg-primary text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-primary-hover transition-colors duration-150"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toggle button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-foreground text-white w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-105"
        style={{ boxShadow: "0 4px 14px rgba(0, 0, 0, 0.15)" }}
      >
        {isOpen ? (
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        )}
      </button>
    </div>
  );
}
