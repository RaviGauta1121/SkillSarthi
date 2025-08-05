"use client";

import * as React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/UI2/navigation-menu";
import {
  ChevronDown,
  Home,
  Video,
  BookOpen,
  GraduationCap,
  FileText,
  Bot,
  Brain,
  Code,
  Sword,
  Clock,
  CheckSquare,
  Users,
  HelpCircle,
  BookMarked,
  Lock,
} from "lucide-react";

// Import your existing Loader component
import Loader from "../../components/loader/loader"; // Adjust path as needed

const Products = [
  {
    title: "Memory Matrix",
    href: "/games/memory-matrix",
    description:
      "Challenge your mind and master patterns and enhance cognitive agility with Memory Matrix!",
    icon: Brain,
    requiresAuth: true,
  },
  {
    title: "Code Editor",
    href: "/code-editor",
    description:
      "We provide instant, accurate, and personalized solutions to doubts.",
    icon: Code,
    requiresAuth: true,
  },
  {
    title: "Syntax Slayer",
    href: "/games/syntax-slayer",
    description:
      "Syntax Slayer is a fast-paced coding game where players sharpen debugging skills by battling coding errors.",
    icon: Sword,
    requiresAuth: true,
  },
  {
    title: "Pomodoro Timer",
    href: "/pomodoro-timer",
    description:
      "The Pomodoro Timer enhances focus, productivity, and time management through structured work-break intervals.",
    icon: Clock,
    requiresAuth: true,
  },
  {
    title: "Todo",
    href: "/todo",
    description:
      "A to-do list helps manage tasks by organizing priorities, increasing focus, and tracking progress efficiently.",
    icon: CheckSquare,
    requiresAuth: true,
  },
  {
    title: "Mentorship",
    href: "/mentorship",
    description:
      "We provide mentorship through personalized guidance, problem-solving, and continuous support using AI insights.",
    icon: Users,
    requiresAuth: true,
  },
  {
    title: "Doubts",
    href: "/doubts",
    description:
      "A unique code editor offers real-time collaboration, error detection, and intelligent suggestions.",
    icon: HelpCircle,
    requiresAuth: true,
  },
  {
    title: "Articles",
    href: "/articles",
    description:
      "A unique chatbot offers instant responses, personalized interactions, and 24/7 support.",
    icon: BookMarked,
    requiresAuth: false, // Articles can be public
  },
];

// Enhanced Protected Link Component with Loader
const ProtectedLink = ({
  href,
  children,
  className,
  user,
  requiresAuth = true,
  showTooltip = true,
  onNavigate,
  ...props
}) => {
  const [showLoginPrompt, setShowLoginPrompt] = React.useState(false);

  const handleClick = (e) => {
    if (requiresAuth && !user) {
      e.preventDefault();
      setShowLoginPrompt(true);
      setTimeout(() => setShowLoginPrompt(false), 3000);
      return;
    }
    
    // Trigger loader when navigating
    if (onNavigate) {
      onNavigate(href);
    }
  };

  if (requiresAuth && !user) {
    return (
      <div className="relative">
        <button
          onClick={handleClick}
          className={cn(
            className,
            "opacity-60 cursor-not-allowed relative group"
          )}
          {...props}
        >
          {children}
          <Lock className="w-3 h-3 absolute -top-1 -right-1 text-yellow-500" />
        </button>

        {/* Login prompt tooltip */}
        <AnimatePresence>
          {showLoginPrompt && showTooltip && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 10 }}
              className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-3 py-2 bg-slate-800 border border-slate-600 rounded-lg text-xs text-slate-200 whitespace-nowrap z-50 shadow-lg"
            >
              Please log in to access this feature
              <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-slate-800 border-l border-t border-slate-600 rotate-45"></div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <Link href={href} className={className} onClick={handleClick} {...props}>
      {children}
    </Link>
  );
};

export function StaticNav({
  color = "white",
  currentPath = "/",
  className,
  user = null, // Accept user prop from parent
  isLoading = false, // Accept loading state from parent
}) {
  const [mounted, setMounted] = React.useState(false);
  const [showLoader, setShowLoader] = React.useState(false);
  const [loadingMessage, setLoadingMessage] = React.useState("Loading...");

  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Handle navigation with loader
  const handleNavigation = (href) => {
    const messages = {
      "/": "Loading Home...",
      "/meeting": "Joining Meeting...",
      "/diaryEditor": "Opening Diary...",
      "/Select": "Loading Resume Builder...",
      "/bot": "Starting AI Chatbot...",
      "/games/memory-matrix": "Loading Memory Matrix...",
      "/code-editor": "Opening Code Editor...",
      "/games/syntax-slayer": "Loading Syntax Slayer...",
      "/pomodoro-timer": "Starting Pomodoro Timer...",
      "/todo": "Loading Todo List...",
      "/mentorship": "Connecting to Mentorship...",
      "/doubts": "Loading Doubts Section...",
      "/articles": "Loading Articles...",
    };

    setLoadingMessage(messages[href] || "Loading...");
    setShowLoader(true);

    // Simulate loading time (you can remove this and handle it with actual navigation)
    setTimeout(() => {
      setShowLoader(false);
    }, 1500);
  };

  if (!mounted) return null;

  const isActivePath = (href) => currentPath === href;

  return (
    <>
      {/* Loader Component */}
      {showLoader && (
        <Loader 
          variant="wave" 
          message={loadingMessage}
          showMessage={true}
        />
      )}

      <div className={cn("relative", className)}>
        <NavigationMenu>
          <NavigationMenuList className="flex-wrap justify-center gap-1">
            {/* Home Button - Always accessible */}
            <NavigationMenuItem>
              <Link
                href="/"
                onClick={() => handleNavigation("/")}
                className={cn(
                  "inline-flex h-11 w-max items-center justify-center rounded-xl px-5 py-2.5 text-sm font-semibold transition-all duration-300 ease-out",
                  isActivePath("/")
                    ? "bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-lg shadow-violet-500/30 scale-105"
                    : "bg-gradient-to-r from-violet-600/80 to-purple-600/80 text-white hover:from-violet-600 hover:to-purple-600 hover:shadow-lg hover:shadow-violet-500/25 hover:scale-105",
                  "border border-transparent hover:border-violet-400/30 transform gap-2"
                )}
              >
                <Home className="w-4 h-4" />
                <span className="hidden sm:inline">Home</span>
              </Link>
            </NavigationMenuItem>

            {/* Protected Meeting Button */}
            <NavigationMenuItem>
              <ProtectedLink
                href="/meeting"
                user={user}
                requiresAuth={true}
                onNavigate={handleNavigation}
                className={cn(
                  "inline-flex h-11 w-max items-center justify-center rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-300 ease-out",
                  isActivePath("/meeting")
                    ? "text-white bg-white/15 border-violet-400/40"
                    : "text-slate-200 hover:text-white hover:bg-white/10",
                  "border border-transparent hover:border-violet-400/40 backdrop-blur-sm group"
                )}
              >
                <span className="relative flex items-center gap-2">
                  <Video className="w-4 h-4" />
                  <span className="hidden sm:inline">Meeting</span>
                  <span
                    className={cn(
                      "absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-violet-400 via-purple-400 to-cyan-400 transition-all duration-300 ease-out rounded-full",
                      isActivePath("/meeting")
                        ? "w-full"
                        : "w-0 group-hover:w-full"
                    )}
                  />
                </span>
              </ProtectedLink>
            </NavigationMenuItem>

            {/* Protected Diary Button */}
            <NavigationMenuItem>
              <ProtectedLink
                href="/diaryEditor"
                user={user}
                requiresAuth={true}
                onNavigate={handleNavigation}
                className={cn(
                  "inline-flex h-11 w-max items-center justify-center rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-300 ease-out",
                  isActivePath("/diaryEditor")
                    ? "text-white bg-white/15 border-violet-400/40"
                    : "text-slate-200 hover:text-white hover:bg-white/10",
                  "border border-transparent hover:border-violet-400/40 backdrop-blur-sm group"
                )}
              >
                <span className="relative flex items-center gap-2">
                  <BookOpen className="w-4 h-4" />
                  <span className="hidden sm:inline">Diary</span>
                  <span
                    className={cn(
                      "absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-violet-400 via-purple-400 to-cyan-400 transition-all duration-300 ease-out rounded-full",
                      isActivePath("/diaryEditor")
                        ? "w-full"
                        : "w-0 group-hover:w-full"
                    )}
                  />
                </span>
              </ProtectedLink>
            </NavigationMenuItem>

            {/* Student Tools Dropdown - Mixed access */}
            <NavigationMenuItem>
              <NavigationMenuTrigger className="gap-2 px-4">
                <GraduationCap className="w-4 h-4" />
                <span className="hidden md:inline">Student Tools</span>
                <span className="md:hidden">Tools</span>
                {!user && <Lock className="w-3 h-3 text-yellow-500 ml-1" />}
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="grid w-[500px] gap-1 p-4 md:w-[600px] md:grid-cols-2 lg:w-[700px] bg-slate-900/95 backdrop-blur-xl border border-slate-700/50 rounded-xl shadow-2xl">
                  {Products.map((product) => (
                    <ListItem
                      key={product.title}
                      title={product.title}
                      href={product.href}
                      icon={product.icon}
                      isActive={isActivePath(product.href)}
                      user={user}
                      requiresAuth={product.requiresAuth}
                      showTooltip={false}
                      onNavigate={handleNavigation}
                    >
                      {product.description}
                    </ListItem>
                  ))}
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>

            {/* Protected Resume Button */}
            <NavigationMenuItem>
              <ProtectedLink
                href="/Select"
                user={user}
                requiresAuth={true}
                onNavigate={handleNavigation}
                className={cn(
                  "inline-flex h-11 w-max items-center justify-center rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-300 ease-out",
                  isActivePath("/Select")
                    ? "text-white bg-white/15 border-violet-400/40"
                    : "text-slate-200 hover:text-white hover:bg-white/10",
                  "border border-transparent hover:border-violet-400/40 backdrop-blur-sm group"
                )}
              >
                <span className="relative flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  <span className="hidden sm:inline">Resume</span>
                  <span
                    className={cn(
                      "absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-violet-400 via-purple-400 to-cyan-400 transition-all duration-300 ease-out rounded-full",
                      isActivePath("/Select")
                        ? "w-full"
                        : "w-0 group-hover:w-full"
                    )}
                  />
                </span>
              </ProtectedLink>
            </NavigationMenuItem>

            {/* Protected AI Chatbot Button */}
            <NavigationMenuItem>
              <ProtectedLink
                href="/bot"
                user={user}
                requiresAuth={true}
                onNavigate={handleNavigation}
                className={cn(
                  "inline-flex h-11 w-max items-center justify-center rounded-xl px-5 py-2.5 text-sm font-semibold transition-all duration-300 ease-out",
                  isActivePath("/bot")
                    ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/30 scale-105"
                    : "bg-gradient-to-r from-cyan-500/80 to-blue-600/80 text-white hover:from-cyan-500 hover:to-blue-600 hover:shadow-lg hover:shadow-cyan-500/25 hover:scale-105",
                  "border border-transparent hover:border-cyan-400/30 transform gap-2"
                )}
              >
                <Bot className="w-4 h-4" />
                <span className="hidden sm:inline">AI Chatbot</span>
                <span className="sm:hidden">AI</span>
              </ProtectedLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </>
  );
}

// Enhanced ListItem component with protection and loader
const ListItem = React.forwardRef(
  (
    {
      className,
      title,
      children,
      icon: IconComponent,
      isActive,
      user,
      requiresAuth = true,
      showTooltip = true,
      onNavigate,
      href,
      ...props
    },
    ref
  ) => {
    const [showLoginPrompt, setShowLoginPrompt] = React.useState(false);

    const handleClick = (e) => {
      if (requiresAuth && !user) {
        e.preventDefault();
        setShowLoginPrompt(true);
        setTimeout(() => setShowLoginPrompt(false), 2000);
        return;
      }
      
      // Trigger loader when navigating
      if (onNavigate && href) {
        onNavigate(href);
      }
    };

    const isLocked = requiresAuth && !user;

    return (
      <li className="relative">
        <NavigationMenuLink asChild>
          <a
            ref={ref}
            href={href}
            onClick={handleClick}
            className={cn(
              "block select-none space-y-2 rounded-xl p-4 leading-none no-underline outline-none transition-all duration-300 ease-out",
              isActive && !isLocked
                ? "bg-gradient-to-r from-violet-600/20 to-cyan-600/20 text-white border-violet-400/40"
                : !isLocked
                ? "hover:bg-gradient-to-r hover:from-violet-600/10 hover:to-cyan-600/10 hover:text-white"
                : "opacity-60 cursor-not-allowed",
              "focus:bg-gradient-to-r focus:from-violet-600/10 focus:to-cyan-600/10 focus:text-white",
              "border border-transparent hover:border-violet-400/30 hover:shadow-lg hover:shadow-violet-500/10",
              "group bg-slate-800/40 backdrop-blur-sm transform",
              !isLocked && "hover:scale-[1.02] cursor-pointer",
              className
            )}
            {...props}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <IconComponent
                  className={cn(
                    "w-4 h-4 transition-colors duration-300",
                    isLocked
                      ? "text-slate-500"
                      : "text-violet-400 group-hover:text-violet-300"
                  )}
                />
                <div
                  className={cn(
                    "text-sm font-semibold leading-none transition-colors duration-300",
                    isLocked
                      ? "text-slate-400"
                      : "text-white group-hover:text-violet-300"
                  )}
                >
                  {title}
                </div>
                {isLocked && <Lock className="w-3 h-3 text-yellow-500 ml-2" />}
              </div>
              <div
                className={cn(
                  "h-0.5 bg-gradient-to-r from-violet-400 to-cyan-400 transition-all duration-300 rounded-full",
                  isActive && !isLocked ? "w-6" : "w-0",
                  !isLocked && "group-hover:w-6"
                )}
              />
            </div>
            <p
              className={cn(
                "line-clamp-2 text-xs leading-relaxed transition-colors duration-300 pl-7",
                isLocked
                  ? "text-slate-500"
                  : "text-slate-400 group-hover:text-slate-300"
              )}
            >
              {children}
            </p>
          </a>
        </NavigationMenuLink>

        {/* Login prompt for dropdown items */}
        <AnimatePresence>
          {showLoginPrompt && showTooltip && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 10 }}
              className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-3 py-2 bg-slate-800 border border-slate-600 rounded-lg text-xs text-slate-200 whitespace-nowrap z-50 shadow-lg"
            >
              Please log in to access this feature
              <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-slate-800 border-l border-t border-slate-600 rotate-45"></div>
            </motion.div>
          )}
        </AnimatePresence>
      </li>
    );
  }
);

ListItem.displayName = "ListItem";