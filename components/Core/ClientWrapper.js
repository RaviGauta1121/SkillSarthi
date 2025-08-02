"use client";
import { Provider } from "react-redux";
import store from "../../redux/store";
import SessionWrapper from "@/components/SessionWrapper";
import { FloatingNav } from "@/components/Core/Navbar";
import { IssueButton } from "@/components/Core/IssueButton";
import { Mobilenav } from "../Shared/MobileNav";
import Link from "next/link";
import { Bot, Sparkles } from "lucide-react";

export default function ClientWrapper({ children }) {
  return (
    <Provider store={store}>
      <SessionWrapper>
        <IssueButton />
        <div className="hidden md:flex">
          <FloatingNav />
        </div>

        {/* Mobile Navigation Header */}
        <div className="md:hidden flex items-center justify-between px-4 py-3 bg-gray-900/80 backdrop-blur-md border-b border-gray-700/50 sticky top-0 z-40">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="block transition-transform duration-200 hover:scale-105">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 via-blue-500 to-cyan-500 flex items-center justify-center relative shadow-lg hover:shadow-violet-500/25">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="white" className="relative z-10">
                  <path d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z"/>
                  <path d="M19 15L20.09 18.26L24 19L20.09 19.74L19 23L17.91 19.74L14 19L17.91 18.26L19 15Z"/>
                  <path d="M5 15L6.09 18.26L10 19L6.09 19.74L5 23L3.91 19.74L0 19L3.91 18.26L5 15Z"/>
                </svg>
                {/* Subtle glow effect */}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-violet-500 via-blue-500 to-cyan-500 opacity-0 hover:opacity-30 blur-md transition-opacity duration-300"></div>
              </div>
            </Link>
          </div>

          {/* Center AI Button */}
          <div className="flex-1 flex justify-center px-4">
            <Link
              href="/bot"
              className="group relative flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-700 hover:to-cyan-700 rounded-full text-white font-medium text-sm transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-violet-500"
            >
              <div className="relative">
                <Bot className="w-4 h-4" />
                <Sparkles className="w-2 h-2 absolute -top-1 -right-1 text-yellow-300 animate-pulse" />
              </div>
              <span>AI Assistant</span>

              {/* Animated glow effect */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-violet-600 to-cyan-600 opacity-0 group-hover:opacity-30 blur-md transition-opacity duration-300"></div>
            </Link>
          </div>

          {/* Menu Button */}
          <div className="flex-shrink-0">
            <Mobilenav />
          </div>
        </div>

        <main className="h-full w-full">{children}</main>
      </SessionWrapper>
    </Provider>
  );
}
