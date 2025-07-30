import React, { useEffect, useRef } from "react";
import Markdown from "./markdown";
import { Bot, User2 } from "lucide-react";

const Messages = ({ messages, isLoading }) => {
  const chatboxRef = useRef(null); // Create a ref for the chatbox

  // Scroll to the bottom whenever a new message is added
  useEffect(() => {
    if (chatboxRef.current) {
      chatboxRef.current.scrollTop = chatboxRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div
      id="chatbox"
      ref={chatboxRef} // Attach ref to the chatbox div
      className="flex flex-col w-full text-left mt-4 gap-4 flex-1 h-0  justify-end  overflow-y-auto no-scrollbar pt-12 "
    >
      {messages.map((m, index) => (
        <div
          key={index} // Add a key for each message to avoid React warnings
          className={`p-4 shadow-md rounded-full ml-10 relative ${
            m.role === "user" ? "bg-neutral-500" : ""
          }`}
        >
          <Markdown text={m.content} />
          {m.role === "user" ? (
            <User2 className="absolute -left-10 top-4 border rounded-full p-1 shadow-lg" />
          ) : (
            <Bot
              className={`absolute top-4 -left-10 border rounded-full p-1 shadow-lg stroke-[#0842A0] ${
                isLoading && index === messages.length - 1
                  ? "animate-bounce"
                  : ""
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default Messages;
