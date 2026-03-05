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
      sender: "Stuart Grant",
      senderRole: "agent",
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
        <div className="bg-card-bg rounded-xl border border-border shadow-2xl w-96 mb-3 flex flex-col" style={{ height: "460px" }}>
          <div className="bg-primary text-white px-4 py-3 rounded-t-xl flex items-center justify-between">
            <div>
              <p className="font-bold text-sm">Chat with {vendorName}</p>
              <p className="text-xs text-accent-light">Campaign Discussion</p>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-white/70 hover:text-white text-xl leading-none">
              x
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.length === 0 && (
              <p className="text-sm text-muted text-center mt-8">No messages yet. Start the conversation.</p>
            )}
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.senderRole === "agent" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[75%] rounded-lg px-3 py-2 text-sm ${
                    msg.senderRole === "agent"
                      ? "bg-primary text-white"
                      : "bg-background border border-border"
                  }`}
                >
                  <p className="font-medium text-xs mb-1 opacity-70">{msg.sender}</p>
                  <p>{msg.message}</p>
                  <p className="text-xs mt-1 opacity-50">{formatTime(msg.timestamp)}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="p-3 border-t border-border">
            <div className="flex gap-2">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Type a message..."
                className="flex-1 text-sm border border-border rounded-lg px-3 py-2 focus:outline-none focus:border-primary"
              />
              <button
                onClick={handleSend}
                className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-light transition-colors"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-primary text-white w-14 h-14 rounded-full shadow-lg hover:bg-primary-light transition-colors flex items-center justify-center text-xl"
      >
        {isOpen ? "x" : "?"}
      </button>
    </div>
  );
}
