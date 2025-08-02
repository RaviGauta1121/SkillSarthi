import Link from "next/link";
// Fixed import for NextAuth
import { useSession, signIn, signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import { createPortal } from "react-dom";
import { 
  Menu, 
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
  ChevronDown,
  User,
  LogOut,
  X,
  Sparkles,
  Lock
} from "lucide-react";
import { useState, useEffect } from "react";

const Products = [
  {
    title: "Memory Matrix",
    href: "/games/memory-matrix",
    description: "Challenge your mind and master patterns and enhance cognitive agility with Memory Matrix!",
    icon: Brain,
    requiresAuth: true
  },
  {
    title: "Code Editor",
    href: "/code-editor",
    description: "We provide instant, accurate, and personalized solutions to doubts.",
    icon: Code,
    requiresAuth: true
  },
  {
    title: "Syntax Slayer",
    href: "/games/syntax-slayer",
    description: "Syntax Slayer is a fast-paced coding game where players sharpen debugging skills by battling coding errors.",
    icon: Sword,
    requiresAuth: true
  },
  {
    title: "Pomodoro Timer",
    href: "/pomodoro-timer",
    description: "The Pomodoro Timer enhances focus, productivity, and time management through structured work-break intervals.",
    icon: Clock,
    requiresAuth: true
  },
  {
    title: "Todo",
    href: "/todo",
    description: "A to-do list helps manage tasks by organizing priorities, increasing focus, and tracking progress efficiently.",
    icon: CheckSquare,
    requiresAuth: true
  },
  {
    title: "Mentorship",
    href: "/mentorship",
    description: "We provide mentorship through personalized guidance, problem-solving, and continuous support using AI insights.",
    icon: Users,
    requiresAuth: true
  },
  {
    title: "Doubts",
    href: "/doubts",
    description: "A unique code editor offers real-time collaboration, error detection, and intelligent suggestions.",
    icon: HelpCircle,
    requiresAuth: true
  },
  {
    title: "Articles",
    href: "/articles",
    description: "A unique chatbot offers instant responses, personalized interactions, and 24/7 support.",
    icon: BookMarked,
    requiresAuth: false
  },
];

// Protected Link Component
const ProtectedLink = ({ href, children, onClick, className, user, requiresAuth = true, ...props }) => {
  const [showPrompt, setShowPrompt] = useState(false);

  const handleClick = (e) => {
    if (requiresAuth && !user) {
      e.preventDefault();
      setShowPrompt(true);
      setTimeout(() => setShowPrompt(false), 2000);
      return;
    }
    onClick?.(e);
  };

  if (requiresAuth && !user) {
    return (
      <div className="relative">
        <button
          onClick={handleClick}
          className={`${className} opacity-60 cursor-not-allowed w-full text-left`}
          {...props}
        >
          <div className="flex items-center justify-between">
            {children}
            <Lock className="w-4 h-4 text-yellow-500 ml-2" />
          </div>
        </button>
        {showPrompt && (
          <div className="absolute top-full left-0 right-0 mt-1 px-2 py-1 bg-red-500/20 border border-red-500/30 rounded text-xs text-red-300 text-center">
            Login required
          </div>
        )}
      </div>
    );
  }

  return (
    <Link href={href} onClick={handleClick} className={className} {...props}>
      {children}
    </Link>
  );
};

function MobileMenuContent({ isOpen, onClose, user, pathname }) {
  const [isStudentToolsOpen, setIsStudentToolsOpen] = useState(false);

  const isActivePath = (href) => pathname === href;

  // Close menu on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  const handleLinkClick = () => {
    setTimeout(() => {
      onClose();
    }, 100);
  };

  const handleSignIn = async () => {
    try {
      await signIn();
      handleLinkClick();
    } catch (error) {
      console.error("Sign in error:", error);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      handleLinkClick();
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black/60"
        onClick={onClose}
        style={{ 
          backdropFilter: 'blur(6px)',
          zIndex: 999998,
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0
        }}
      />

      {/* Mobile Menu */}
      <div 
        className="fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-gray-900/95 backdrop-blur-xl border-l border-gray-700/50 transform transition-transform duration-300 ease-in-out"
        style={{ 
          boxShadow: '-4px 0 20px rgba(0, 0, 0, 0.5)',
          zIndex: 999999,
          position: 'fixed',
          top: 0,
          right: 0,
          height: '100vh',
          width: '320px',
          maxWidth: '85vw'
        }}
      >
        <div className="flex flex-col h-full overflow-hidden">
          {/* Header with Close Button */}
          <div className="flex justify-between items-center p-6 border-b border-gray-700/50 flex-shrink-0">
            <h2 className="text-lg font-semibold text-white">Menu</h2>
            <button
              onClick={onClose}
              className="p-2 bg-gray-800/80 hover:bg-gray-700 border border-gray-600/50 rounded-lg text-white transition-colors focus:outline-none focus:ring-2 focus:ring-violet-500"
              aria-label="Close menu"
            >
              <X size={20} />
            </button>
          </div>

          {/* Auth Section */}
          <div className="p-6 border-b border-gray-700/50 flex-shrink-0">
            {user ? (
              <div className="flex items-center space-x-3 bg-gray-800/60 backdrop-blur-sm rounded-xl px-4 py-3 border border-gray-700/30">
                <img
                  src={user.image || "/default-avatar.png"}
                  alt={`${user.name || user.email}'s profile picture`}
                  className="w-10 h-10 rounded-full border-2 border-violet-400 object-cover"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate">{user.name || user.email}</p>
                  <p className="text-xs text-gray-400 truncate">{user.email}</p>
                </div>
              </div>
            ) : (
              <div className="text-center">
                <p className="text-gray-400 text-sm mb-3">Not logged in</p>
                <button
                  onClick={handleSignIn}
                  className="inline-flex w-full items-center justify-center rounded-xl px-4 py-2.5 text-sm font-semibold bg-blue-600 text-white hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <User className="w-4 h-4 mr-2" />
                  Log in
                </button>
              </div>
            )}
          </div>

          {/* Navigation Items - Scrollable */}
          <div className="flex-1 p-6 space-y-2 overflow-y-auto">
            {/* Home */}
            <Link
              href="/"
              onClick={handleLinkClick}
              className={`flex items-center gap-3 rounded-xl p-3 transition-colors focus:outline-none focus:ring-2 focus:ring-violet-500 ${
                isActivePath("/")
                  ? "bg-violet-600 text-white"
                  : "text-gray-300 hover:text-white hover:bg-gray-800/60"
              }`}
            >
              <Home className="w-5 h-5 flex-shrink-0" />
              <span className="font-medium">Home</span>
            </Link>

            {/* AI Chatbot - Protected */}
            <ProtectedLink
              href="/bot"
              onClick={handleLinkClick}
              user={user}
              requiresAuth={true}
              className={`flex items-center gap-3 rounded-xl p-3 transition-all duration-200 border focus:outline-none focus:ring-2 focus:ring-violet-500 ${
                isActivePath("/bot")
                  ? "bg-gradient-to-r from-violet-600 to-cyan-600 text-white border-violet-500"
                  : "text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-violet-800/30 hover:to-cyan-800/30 border-gray-700/50 hover:border-violet-500/50"
              }`}
            >
              <div className="relative flex-shrink-0">
                <Bot className="w-5 h-5" />
                <Sparkles className="w-2 h-2 absolute -top-1 -right-1 text-yellow-300 animate-pulse" />
              </div>
              <span className="font-medium">AI Assistant</span>
              <div className="ml-auto text-xs bg-violet-500 text-white px-2 py-1 rounded-full flex-shrink-0">
                New
              </div>
            </ProtectedLink>

            {/* Meeting - Protected */}
            <ProtectedLink
              href="/meeting"
              onClick={handleLinkClick}
              user={user}
              requiresAuth={true}
              className={`flex items-center gap-3 rounded-xl p-3 transition-colors focus:outline-none focus:ring-2 focus:ring-violet-500 ${
                isActivePath("/meeting")
                  ? "bg-violet-600 text-white"
                  : "text-gray-300 hover:text-white hover:bg-gray-800/60"
              }`}
            >
              <Video className="w-5 h-5 flex-shrink-0" />
              <span className="font-medium">Meeting</span>
            </ProtectedLink>

            {/* Diary - Protected */}
            <ProtectedLink
              href="/diaryEditor"
              onClick={handleLinkClick}
              user={user}
              requiresAuth={true}
              className={`flex items-center gap-3 rounded-xl p-3 transition-colors focus:outline-none focus:ring-2 focus:ring-violet-500 ${
                isActivePath("/diaryEditor")
                  ? "bg-violet-600 text-white"
                  : "text-gray-300 hover:text-white hover:bg-gray-800/60"
              }`}
            >
              <BookOpen className="w-5 h-5 flex-shrink-0" />
              <span className="font-medium">Diary</span>
            </ProtectedLink>

            {/* Student Tools Dropdown */}
            <div>
              <button
                onClick={() => setIsStudentToolsOpen(!isStudentToolsOpen)}
                className="flex items-center justify-between w-full gap-3 rounded-xl p-3 text-gray-300 hover:text-white hover:bg-gray-800/60 transition-colors focus:outline-none focus:ring-2 focus:ring-violet-500"
                aria-expanded={isStudentToolsOpen}
              >
                <div className="flex items-center gap-3">
                  <GraduationCap className="w-5 h-5 flex-shrink-0" />
                  <span className="font-medium">Student Tools</span>
                  {!user && <Lock className="w-4 h-4 text-yellow-500" />}
                </div>
                <ChevronDown className={`w-4 h-4 flex-shrink-0 transition-transform duration-300 ${
                  isStudentToolsOpen ? "rotate-180" : ""
                }`} />
              </button>
              
              {/* Collapsible Content */}
              <div className={`ml-8 space-y-1 mt-2 overflow-hidden transition-all duration-300 ${
                isStudentToolsOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
              }`}>
                {Products.map((product) => (
                  <ProtectedLink
                    key={product.title}
                    href={product.href}
                    onClick={handleLinkClick}
                    user={user}
                    requiresAuth={product.requiresAuth}
                    className={`flex items-center gap-3 rounded-lg p-2.5 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-violet-500 ${
                      isActivePath(product.href)
                        ? "bg-violet-600 text-white"
                        : "text-gray-400 hover:text-white hover:bg-gray-800/60"
                    }`}
                  >
                    <product.icon className="w-4 h-4 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="font-medium truncate">{product.title}</div>
                      <div className="text-xs text-gray-500 truncate">{product.description}</div>
                    </div>
                  </ProtectedLink>
                ))}
              </div>
            </div>

            {/* Resume - Protected */}
            <ProtectedLink
              href="/Select"
              onClick={handleLinkClick}
              user={user}
              requiresAuth={true}
              className={`flex items-center gap-3 rounded-xl p-3 transition-colors focus:outline-none focus:ring-2 focus:ring-violet-500 ${
                isActivePath("/Select")
                  ? "bg-violet-600 text-white"
                  : "text-gray-300 hover:text-white hover:bg-gray-800/60"
              }`}
            >
              <FileText className="w-5 h-5 flex-shrink-0" />
              <span className="font-medium">Resume</span>
            </ProtectedLink>
          </div>

          {/* Footer with Logout */}
          {user && (
            <div className="p-6 border-t border-gray-700/50 flex-shrink-0">
              <button
                onClick={handleSignOut}
                className="flex items-center gap-3 rounded-xl p-3 text-gray-300 hover:text-white hover:bg-red-800/60 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 w-full"
              >
                <LogOut className="w-5 h-5 flex-shrink-0" />
                <span className="font-medium">Log Out</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export function Mobilenav() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { data: session, status } = useSession();
  const pathname = usePathname();

  const user = session?.user;

  // Ensure component is mounted before rendering portal
  useEffect(() => {
    setMounted(true);
  }, []);

  // Close menu when pathname changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* Menu Button */}
      <button 
        onClick={toggleMenu}
        className="relative p-2 bg-gray-800/80 hover:bg-gray-700 border border-gray-600/50 rounded-lg text-white transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-violet-500"
        style={{ minWidth: '40px', minHeight: '40px' }}
        aria-label="Toggle menu"
        aria-expanded={isOpen}
      >
        <Menu size={20} />
      </button>

      {/* Portal for Mobile Menu */}
      {mounted && typeof document !== 'undefined' && createPortal(
        <MobileMenuContent 
          isOpen={isOpen} 
          onClose={closeMenu} 
          user={user} 
          pathname={pathname} 
        />,
        document.body
      )}
    </>
  );
}