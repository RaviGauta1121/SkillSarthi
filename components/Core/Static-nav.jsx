"use client";

import * as React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useUser } from "@auth0/nextjs-auth0/client";
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
  Loader2,
  LogOut,
  Lock
} from "lucide-react";
import Loader from "../../components/loader/loader";

const Products = [
  {
    title: "Memory Matrix",
    href: "/games/memory-matrix",
    description:
      "Challenge your mind and master patterns and enhance cognitive agility with Memory Matrix!",
    icon: Brain,
    requiresAuth: true
  },
  {
    title: "Code Editor",
    href: "/code-editor",
    description:
      "We provide instant, accurate, and personalized solutions to doubts.",
    icon: Code,
    requiresAuth: true
  },
  {
    title: "Syntax Slayer",
    href: "/games/syntax-slayer",
    description:
      "Syntax Slayer is a fast-paced coding game where players sharpen debugging skills by battling coding errors.",
    icon: Sword,
    requiresAuth: true
  },
  {
    title: "Pomodoro Timer",
    href: "/pomodoro-timer",
    description:
      "The Pomodoro Timer enhances focus, productivity, and time management through structured work-break intervals.",
    icon: Clock,
    requiresAuth: true
  },
  {
    title: "Todo",
    href: "/todo",
    description:
      "A to-do list helps manage tasks by organizing priorities, increasing focus, and tracking progress efficiently.",
    icon: CheckSquare,
    requiresAuth: true
  },
  {
    title: "Mentorship",
    href: "/mentorship",
    description:
      "We provide mentorship through personalized guidance, problem-solving, and continuous support using AI insights.",
    icon: Users,
    requiresAuth: true
  },
  {
    title: "Doubts",
    href: "/doubts",
    description:
      "A unique code editor offers real-time collaboration, error detection, and intelligent suggestions.",
    icon: HelpCircle,
    requiresAuth: true
  },
  {
    title: "Articles",
    href: "/articles",
    description:
      "A unique chatbot offers instant responses, personalized interactions, and 24/7 support.",
    icon: BookMarked,
    requiresAuth: false // Articles can be public
  },
];

// Protected navigation items
const protectedRoutes = ["/meeting", "/diaryEditor", "/Select", "/bot"];

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

// Protected Link Component
const ProtectedLink = ({ href, children, className, user, requiresAuth = true, showTooltip = true, ...props }) => {
  const [showLoginPrompt, setShowLoginPrompt] = React.useState(false);
  
  const handleClick = (e) => {
    if (requiresAuth && !user) {
      e.preventDefault();
      setShowLoginPrompt(true);
      setTimeout(() => setShowLoginPrompt(false), 3000);
      return;
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
    <Link href={href} className={className} {...props}>
      {children}
    </Link>
  );
};

// Enhanced Auth Button Component - MADE COMPACT
const AuthButton = ({ 
  href, 
  children, 
  isLoading = false, 
  variant = "login",
  onClick,
  showFullLoader = false,
  size ="compact", // Changed default to compact
  ...props 
}) => {
  const [isClicked, setIsClicked] = React.useState(false);

  const handleClick = (e) => {
    if (!isLoading) {
      setIsClicked(true);
      onClick?.(e);
      
      // Reset loading state after a delay to prevent infinite loading
      setTimeout(() => {
        setIsClicked(false);
      }, 3000);
    }
  };

  const variants = {
    login: "bg-gradient-to-r from-sky-600/90 to-sky-700/90 text-white hover:from-sky-600 hover:to-sky-700 hover:shadow-sky-500/25 border-sky-400/30",
    logout: "bg-gradient-to-r from-red-600/90 to-red-700/90 text-white hover:from-red-600 hover:to-red-700 hover:shadow-red-500/25 border-red-400/30"
  };

  const sizeClasses = {
    small: "h-7 px-2 py-1 text-xs font-medium", // Made even smaller
    compact: "h-8 px-3 py-1.5 text-xs font-medium", // Reduced from original
    default: "h-9 px-4 py-2 text-sm font-medium", // Smaller than original
  };

  const loading = isLoading || isClicked;

  // Show full screen loader for major auth operations
  if (loading && showFullLoader) {
    return (
      <>
        <Loader />
        <button 
          className={cn(
            "inline-flex w-max items-center justify-center rounded-lg transition-all duration-300 ease-out", // Changed to rounded-lg
            sizeClasses[size],
            variants[variant],
            "shadow-md hover:shadow-lg transform hover:scale-105", // Reduced shadow
            "border border-transparent hover:border-opacity-30",
            "opacity-70 cursor-not-allowed"
          )}
          disabled={true}
          {...props}
        >
          {children}
        </button>
      </>
    );
  }

  return (
    <Link href={href} onClick={handleClick}>
      <button 
        className={cn(
          "inline-flex w-max items-center justify-center rounded-lg transition-all duration-300 ease-out", // Changed to rounded-lg
          sizeClasses[size],
          variants[variant],
          "shadow-md hover:shadow-lg transform hover:scale-105", // Reduced shadow
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
              className="flex items-center gap-1"
            >
              <LoadingSpinner size="xs" />
              <span className="whitespace-nowrap text-xs">
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
              className="flex items-center gap-1"
            >
              {variant === "logout" && <LogOut className="w-3 h-3" />} {/* Smaller icon */}
              <span className="whitespace-nowrap text-xs">{children}</span> {/* Smaller text */}
            </motion.div>
          )}
        </AnimatePresence>
      </button>
    </Link>
  );
};

// Enhanced User Profile Component - MADE COMPACT
const UserProfile = ({ user, isLoading }) => {
  if (isLoading) {
    return (
      <div className="flex items-center space-x-2 bg-slate-900/60 backdrop-blur-xl border border-slate-700/60 rounded-lg px-3 py-1.5 shadow-md"> {/* Reduced padding and spacing */}
        <div className="w-6 h-6 rounded-full bg-slate-700 animate-pulse" /> {/* Smaller avatar */}
        <div className="hidden sm:block w-16 h-3 bg-slate-700 rounded animate-pulse" /> {/* Smaller name placeholder */}
        <div className="w-12 h-6 bg-slate-700 rounded-lg animate-pulse" /> {/* Smaller button placeholder */}
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="flex items-center space-x-2 bg-slate-900/60 backdrop-blur-xl border border-slate-700/60 rounded-lg px-3 py-1.5 shadow-md" // Reduced padding and spacing
    >
      <motion.img
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        src={user.picture}
        alt={`${user.name}'s profile picture`}
        className="w-6 h-6 rounded-full border-2 border-violet-400/40 object-cover" // Smaller avatar
      />
      <motion.span
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
        className="text-xs font-medium text-slate-200 hidden sm:block max-w-20 truncate" // Smaller text and max width
      >
        {user.name}
      </motion.span>
      <AuthButton
        href="/api/auth/logout"
        variant="logout"
        size="small" // Use smallest size
        showFullLoader={true}
      >
        Out
      </AuthButton>
    </motion.div>
  );
};

export function StaticNav({ 
  color = "white", 
  currentPath = "/",
  className 
}) {
  const [mounted, setMounted] = React.useState(false);
  const [visible, setVisible] = React.useState(true);
  const { user, error, isLoading } = useUser();

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isActivePath = (href) => currentPath === href;
  const isProtected = (href) => protectedRoutes.includes(href);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: -100 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className={cn(
            "flex w-full z-[9999999999] fixed top-0 inset-x-0 border border-transparent dark:border-white/[0.2] rounded-b-3xl bg-white/05 backdrop-blur-sm shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] pr-2 pl-8 py-2 items-center justify-between",
            className
          )}
        >
          <nav className="w-full flex justify-between items-center py-3 px-4 relative"> {/* Reduced padding */}
            {/* Enhanced Background with better gradients */}
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-violet-950/30 to-cyan-950/30" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-950/50 to-transparent" />
            
            {/* Main Navigation - Centered */}
            <div className="flex-1 flex justify-center relative z-10">
              <NavigationMenu>
                <NavigationMenuList>
                  {/* Home Button - Always accessible */}
                  <NavigationMenuItem>
                    <Link
                      href="/"
                      className={cn(
                        "inline-flex h-11 w-max items-center justify-center rounded-xl px-6 py-2.5 text-sm font-semibold transition-all duration-300 ease-out",
                        isActivePath("/") 
                          ? "bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-lg shadow-violet-500/30 scale-105" 
                          : "bg-gradient-to-r from-violet-600/80 to-purple-600/80 text-white hover:from-violet-600 hover:to-purple-600 hover:shadow-lg hover:shadow-violet-500/25 hover:scale-105",
                        "border border-transparent hover:border-violet-400/30 transform gap-2"
                      )}
                    >
                      <Home className="w-4 h-4" />
                      Home
                    </Link>
                  </NavigationMenuItem>

                  {/* Protected Meeting Button */}
                  <NavigationMenuItem>
                    <ProtectedLink
                      href="/meeting"
                      user={user}
                      requiresAuth={true}
                      className={cn(
                        "inline-flex h-11 w-max items-center justify-center rounded-xl px-5 py-2.5 text-sm font-medium transition-all duration-300 ease-out",
                        isActivePath("/meeting")
                          ? "text-white bg-white/15 border-violet-400/40"
                          : "text-slate-200 hover:text-white hover:bg-white/10",
                        "border border-transparent hover:border-violet-400/40 backdrop-blur-sm group"
                      )}
                    >
                      <span className="relative flex items-center gap-2">
                        <Video className="w-4 h-4" />
                        Meeting
                        <span className={cn(
                          "absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-violet-400 via-purple-400 to-cyan-400 transition-all duration-300 ease-out rounded-full",
                          isActivePath("/meeting") ? "w-full" : "w-0 group-hover:w-full"
                        )} />
                      </span>
                    </ProtectedLink>
                  </NavigationMenuItem>

                  {/* Protected Diary Button */}
                  <NavigationMenuItem>
                    <ProtectedLink
                      href="/diaryEditor"
                      user={user}
                      requiresAuth={true}
                      className={cn(
                        "inline-flex h-11 w-max items-center justify-center rounded-xl px-5 py-2.5 text-sm font-medium transition-all duration-300 ease-out",
                        isActivePath("/diaryEditor")
                          ? "text-white bg-white/15 border-violet-400/40"
                          : "text-slate-200 hover:text-white hover:bg-white/10",
                        "border border-transparent hover:border-violet-400/40 backdrop-blur-sm group"
                      )}
                    >
                      <span className="relative flex items-center gap-2">
                        <BookOpen className="w-4 h-4" />
                        Diary
                        <span className={cn(
                          "absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-violet-400 via-purple-400 to-cyan-400 transition-all duration-300 ease-out rounded-full",
                          isActivePath("/diaryEditor") ? "w-full" : "w-0 group-hover:w-full"
                        )} />
                      </span>
                    </ProtectedLink>
                  </NavigationMenuItem>

                  {/* Student Tools Dropdown - Mixed access */}
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="gap-2">
                      <GraduationCap className="w-4 h-4" />
                      Student Tools
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
                            showTooltip={false} // Don't show tooltip in dropdown
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
                      className={cn(
                        "inline-flex h-11 w-max items-center justify-center rounded-xl px-5 py-2.5 text-sm font-medium transition-all duration-300 ease-out",
                        isActivePath("/Select")
                          ? "text-white bg-white/15 border-violet-400/40"
                          : "text-slate-200 hover:text-white hover:bg-white/10",
                        "border border-transparent hover:border-violet-400/40 backdrop-blur-sm group"
                      )}
                    >
                      <span className="relative flex items-center gap-2">
                        <FileText className="w-4 h-4" />
                        Resume
                        <span className={cn(
                          "absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-violet-400 via-purple-400 to-cyan-400 transition-all duration-300 ease-out rounded-full",
                          isActivePath("/Select") ? "w-full" : "w-0 group-hover:w-full"
                        )} />
                      </span>
                    </ProtectedLink>
                  </NavigationMenuItem>

                  {/* Protected AI Chatbot Button */}
                  <NavigationMenuItem>
                    <ProtectedLink
                      href="/bot"
                      user={user}
                      requiresAuth={true}
                      className={cn(
                        "inline-flex h-11 w-max items-center justify-center rounded-xl px-6 py-2.5 text-sm font-semibold transition-all duration-300 ease-out",
                        isActivePath("/bot")
                          ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/30 scale-105"
                          : "bg-gradient-to-r from-cyan-500/80 to-blue-600/80 text-white hover:from-cyan-500 hover:to-blue-600 hover:shadow-lg hover:shadow-cyan-500/25 hover:scale-105",
                        "border border-transparent hover:border-cyan-400/30 transform gap-2"
                      )}
                    >
                      <Bot className="w-4 h-4" />
                      AI Chatbot
                    </ProtectedLink>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </div>

            {/* Enhanced Auth Section - Right Side - MADE COMPACT */}
            <div className="relative z-10 flex items-center space-x-2"> {/* Reduced spacing */}
              {isLoading ? (
                // Show full screen loader for initial auth check
                <>
                  <Loader />
                  <div className="flex items-center space-x-2 bg-slate-900/60 backdrop-blur-xl border border-slate-700/60 rounded-lg px-3 py-1.5 shadow-md opacity-70"> {/* Compact loading state */}
                    <LoadingSpinner size="xs" />
                    <span className="text-xs text-slate-300">Loading...</span>
                  </div>
                </>
              ) : user ? (
                // User is logged in
                <UserProfile user={user} isLoading={isLoading} />
              ) : (
                // User is not logged in
                <div className="flex items-center space-x-2"> {/* Reduced spacing */}
                  <div className="text-xs text-slate-400 hidden sm:block">
                    Login for all features
                  </div>
                  <AuthButton
                    href="/api/auth/login"
                    variant="login"
                    size="small" // Use smallest size
                    showFullLoader={true}
                  >
                    Log in
                  </AuthButton>
                </div>
              )}

              {/* Error handling */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-red-500/20 border border-red-500/30 rounded-lg px-2 py-1" // Smaller error display
                >
                  <span className="text-xs text-red-300">Auth Error</span>
                </motion.div>
              )}
            </div>
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Enhanced ListItem component with protection
const ListItem = React.forwardRef(
  ({ className, title, children, icon: IconComponent, isActive, user, requiresAuth = true, showTooltip = true, ...props }, ref) => {
    const [showLoginPrompt, setShowLoginPrompt] = React.useState(false);
    
    const handleClick = (e) => {
      if (requiresAuth && !user) {
        e.preventDefault();
        setShowLoginPrompt(true);
        setTimeout(() => setShowLoginPrompt(false), 2000);
        return;
      }
    };

    const isLocked = requiresAuth && !user;

    return (
      <li className="relative">
        <NavigationMenuLink asChild>
          <a
            ref={ref}
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
                <IconComponent className={cn(
                  "w-4 h-4 transition-colors duration-300",
                  isLocked ? "text-slate-500" : "text-violet-400 group-hover:text-violet-300"
                )} />
                <div className={cn(
                  "text-sm font-semibold leading-none transition-colors duration-300",
                  isLocked ? "text-slate-400" : "text-white group-hover:text-violet-300"
                )}>
                  {title}
                </div>
                {isLocked && <Lock className="w-3 h-3 text-yellow-500 ml-2" />}
              </div>
              <div className={cn(
                "h-0.5 bg-gradient-to-r from-violet-400 to-cyan-400 transition-all duration-300 rounded-full",
                isActive && !isLocked ? "w-6" : "w-0",
                !isLocked && "group-hover:w-6"
              )} />
            </div>
            <p className={cn(
              "line-clamp-2 text-xs leading-relaxed transition-colors duration-300 pl-7",
              isLocked ? "text-slate-500" : "text-slate-400 group-hover:text-slate-300"
            )}>
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