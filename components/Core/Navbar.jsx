"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { StaticNav } from "./Static-nav";
import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import { LogOut, Loader2 } from "lucide-react";

// Loading Spinner Component
const LoadingSpinner = ({ size = "sm" }) => {
  const sizeClasses = {
    xs: "w-3 h-3",
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6"
  };

  return (
    <Loader2 className={cn("animate-spin", sizeClasses[size])} />
  );
};

// Enhanced Auth Button Component
const AuthButton = ({ 
  children, 
  isLoading = false, 
  variant = "login",
  onClick,
  size = "default",
  ...props 
}) => {
  const [isClicked, setIsClicked] = React.useState(false);

  const handleClick = async (e) => {
    if (!isLoading) {
      setIsClicked(true);
      
      try {
        if (variant === "login") {
          await signIn(undefined, { callbackUrl: "/" });
        } else {
          await signOut({ callbackUrl: "/" });
        }
      } catch (error) {
        console.error("Auth error:", error);
      } finally {
        setTimeout(() => {
          setIsClicked(false);
        }, 2000);
      }
      
      onClick?.(e);
    }
  };

  const variants = {
    login: "bg-gradient-to-r from-sky-600/90 to-sky-700/90 text-white hover:from-sky-600 hover:to-sky-700 hover:shadow-sky-500/25 border-sky-400/30",
    logout: "bg-gradient-to-r from-red-600/90 to-red-700/90 text-white hover:from-red-600 hover:to-red-700 hover:shadow-red-500/25 border-red-400/30"
  };

  const sizeClasses = {
    small: "h-8 px-3 py-1.5 text-xs font-medium",
    default: "h-9 px-4 py-2 text-sm font-medium",
    large: "h-10 px-5 py-2.5 text-sm font-medium"
  };

  const loading = isLoading || isClicked;

  return (
    <button 
      onClick={handleClick}
      className={cn(
        "inline-flex w-max items-center justify-center rounded-lg transition-all duration-300 ease-out",
        sizeClasses[size],
        variants[variant],
        "shadow-md hover:shadow-lg transform hover:scale-105",
        "border border-transparent hover:border-opacity-30",
        "disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none",
        loading && "cursor-wait"
      )}
      disabled={loading}
      {...props}
    >
      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            className="flex items-center gap-2"
          >
            <LoadingSpinner size="xs" />
            <span className="whitespace-nowrap">
              {variant === "login" ? "Signing in..." : "Signing out..."}
            </span>
          </motion.div>
        ) : (
          <motion.div
            key="text"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            className="flex items-center gap-2"
          >
            {variant === "logout" && <LogOut className="w-4 h-4" />}
            <span className="whitespace-nowrap">{children}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  );
};

// User Profile Component
const UserProfile = ({ user, isLoading }) => {
  if (isLoading) {
    return (
      <div className="flex items-center space-x-3 bg-slate-900/60 backdrop-blur-xl border border-slate-700/60 rounded-lg px-4 py-2 shadow-md">
        <div className="w-8 h-8 rounded-full bg-slate-700 animate-pulse" />
        <div className="hidden sm:block w-20 h-4 bg-slate-700 rounded animate-pulse" />
        <div className="w-16 h-8 bg-slate-700 rounded-lg animate-pulse" />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="flex items-center space-x-3 bg-slate-900/60 backdrop-blur-xl border border-slate-700/60 rounded-lg px-4 py-2 shadow-md"
    >
      <motion.img
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        src={user.image || "/default-avatar.png"}
        alt={`${user.name || user.email}'s profile picture`}
        className="w-8 h-8 rounded-full border-2 border-violet-400/40 object-cover"
      />
      <motion.span
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
        className="text-sm font-medium text-slate-200 hidden sm:block max-w-24 truncate"
      >
        {user.name || user.email}
      </motion.span>
      <AuthButton
        variant="logout"
        size="small"
      >
        Logout
      </AuthButton>
    </motion.div>
  );
};

export const FloatingNav = ({ className, currentPath = "/" }) => {
  const [visible, setVisible] = useState(true);
  const { data: session, status } = useSession();

  const user = session?.user;
  const isLoading = status === "loading";

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: -100 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className={cn(
            "w-full z-[99999999999] fixed top-0 left-0 right-0",
            className
          )}
        >
          {/* Single container with background */}
          <div className="border border-transparent dark:border-white/[0.2] rounded-b-3xl bg-white/05 backdrop-blur-sm shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]">
            {/* Enhanced Background with better gradients */}
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-violet-950/30 to-cyan-950/30 rounded-b-3xl" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-950/50 to-transparent rounded-b-3xl" />
            
            {/* Navigation container */}
            <nav className="w-full max-w-full flex justify-between items-center py-3 px-6 relative z-10">
              {/* Left Side - Logo/Brand Space (Optional) */}
              <div className="flex-shrink-0 w-0 lg:w-auto">
                {/* You can add a logo here if needed */}
              </div>

              {/* Center - Main Navigation */}
              <div className="flex-1 flex justify-center max-w-4xl mx-auto">
                <StaticNav 
                  color={"red-600"} 
                  currentPath={currentPath}
                  user={user}
                  isLoading={isLoading}
                  className="relative z-0" // Remove fixed positioning from StaticNav
                />
              </div>
              
              {/* Right Side - Auth section */}
              <div className="flex-shrink-0 flex items-center justify-end min-w-0">
                {isLoading ? (
                  <div className="flex items-center space-x-3 bg-slate-900/60 backdrop-blur-xl border border-slate-700/60 rounded-lg px-4 py-2 shadow-md">
                    <LoadingSpinner size="sm" />
                    <span className="text-sm text-slate-300 hidden sm:inline">Loading...</span>
                  </div>
                ) : user ? (
                  <UserProfile user={user} isLoading={isLoading} />
                ) : (
                  <div className="flex items-center space-x-3">
                    <div className="text-sm text-slate-400 hidden lg:block whitespace-nowrap">
                      Login for all features
                    </div>
                    <AuthButton
                      variant="login"
                      size="default"
                    >
                      Sign In
                    </AuthButton>
                  </div>
                )}
              </div>
            </nav>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};