"use client";

import ProtectedRoute from "@/components/ProtectedRoute";
import { useState } from "react";

export default function ChatBotPage() {
  const [input, setInput] = useState("");
  const [chat, setChat] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    const newChat = [...chat, { type: "user", text: userMessage }];
    setChat(newChat);
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/genai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || `HTTP error! status: ${res.status}`);
      }

      setChat([...newChat, { type: "bot", text: data.text }]);
    } catch (err) {
      console.error("Error:", err);
      let errorMessage = "Sorry, something went wrong. Please try again.";

      if (err.message.includes("API key")) {
        errorMessage =
          "🔑 API key issue. Please check your environment variables.";
      } else if (err.message.includes("Failed to fetch")) {
        errorMessage = "🌐 Network error. Please check your connection.";
      }

      setChat([...newChat, { type: "bot", text: errorMessage, isError: true }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <ProtectedRoute>
      <div className="max-w-4xl mx-auto p-6 mt-20">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4">
            <h1 className="text-2xl font-bold text-white flex items-center gap-2">
              🤖 Gemini AI ChatBot
            </h1>
          </div>

          <div className="h-96 overflow-y-auto p-4 bg-gray-50">
            {chat.length === 0 ? (
              <div className="text-center text-gray-500 mt-20">
                <div className="text-4xl mb-4">💬</div>
                <p>Start a conversation with Gemini AI!</p>
                <p className="text-sm mt-2">
                  Ask questions, get creative ideas, or just chat.
                </p>
              </div>
            ) : (
              chat.map((msg, index) => (
                <div
                  key={index}
                  className={`mb-4 ${
                    msg.type === "user" ? "text-right" : "text-left"
                  }`}
                >
                  <div
                    className={`inline-block max-w-xs md:max-w-md lg:max-w-lg px-4 py-2 rounded-lg ${
                      msg.type === "user"
                        ? "bg-blue-600 text-white rounded-br-none"
                        : msg.isError
                        ? "bg-red-100 text-red-800 border border-red-200 rounded-bl-none"
                        : "bg-stone-500 text-black shadow-md rounded-bl-none border border-gray-300"
                    }`}
                  >
                    <div className="whitespace-pre-wrap text-sm">
                      {msg.text}
                    </div>
                  </div>
                  <div
                    className={`text-xs text-gray-600 mt-1 ${
                      msg.type === "user" ? "text-right" : "text-left"
                    }`}
                  >
                    {msg.type === "user" ? "You" : "Gemini"}
                  </div>
                </div>
              ))
            )}

            {isLoading && (
              <div className="text-left mb-4">
                <div className="inline-block bg-white shadow-md px-4 py-2 rounded-lg rounded-bl-none">
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                    </div>
                    <span className="text-gray-500 text-sm">
                      Gemini is thinking...
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="p-4 bg-white border-t">
            <div className="flex gap-2">
              <textarea
                className="flex-1 border border-gray-300 rounded-lg p-3 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message... (Press Enter to send)"
                onKeyDown={handleKeyPress}
                rows="1"
                disabled={isLoading}
                style={{ minHeight: "44px" }}
              />
              <button
                className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                  isLoading || !input.trim()
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700 text-white"
                }`}
                onClick={sendMessage}
                disabled={isLoading || !input.trim()}
              >
                {isLoading ? "⏳" : "📤"}
              </button>
            </div>
            <div className="text-xs text-gray-500 mt-2">
              Powered by Google Gemini AI
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
