"use client";

import React, { useState, useEffect, useRef } from 'react';
import { 
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
  Sparkles,
  Star,
  Zap,
  Atom,
  Globe,
  Lightbulb
} from 'lucide-react';
import ProtectedRoute from '@/components/ProtectedRoute';

const SkillSarthiLanding = () => {
  const [mounted, setMounted] = useState(false);
  const [hoveredIcon, setHoveredIcon] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [time, setTime] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    setMounted(true);
    setTimeout(() => setIsLoaded(true), 100);

    // Mouse tracking for interactive effects
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    // Animation timer
    const timer = setInterval(() => {
      setTime(prev => prev + 1);
    }, 50);

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearInterval(timer);
    };
  }, []);

  // Navigation items with enhanced styling
  const navigationItems = [
    { icon: Home, label: 'Home', href: '/', color: 'from-violet-500 via-purple-500 to-pink-500', glow: 'shadow-violet-500/50' },
    { icon: Video, label: 'Meeting', href: '/meeting', color: 'from-blue-500 via-cyan-500 to-teal-500', glow: 'shadow-blue-500/50' },
    { icon: BookOpen, label: 'Diary', href: '/diaryEditor', color: 'from-green-500 via-emerald-500 to-lime-500', glow: 'shadow-green-500/50' },
    { icon: Bot, label: 'AI Chatbot', href: '/bot', color: 'from-cyan-500 via-blue-600 to-indigo-600', glow: 'shadow-cyan-500/50' },
    { icon: FileText, label: 'Resume', href: '/Select', color: 'from-orange-500 via-red-500 to-pink-500', glow: 'shadow-orange-500/50' },
    { icon: Brain, label: 'Memory Matrix', href: '/games/memory-matrix', color: 'from-pink-500 via-rose-500 to-red-500', glow: 'shadow-pink-500/50' },
    { icon: Code, label: 'Code Editor', href: '/code-editor', color: 'from-indigo-500 via-purple-500 to-violet-500', glow: 'shadow-indigo-500/50' },
    { icon: Sword, label: 'Syntax Slayer', href: '/games/syntax-slayer', color: 'from-red-500 via-pink-500 to-rose-500', glow: 'shadow-red-500/50' },
    { icon: Clock, label: 'Pomodoro Timer', href: '/pomodoro-timer', color: 'from-yellow-500 via-orange-500 to-red-500', glow: 'shadow-yellow-500/50' },
    { icon: CheckSquare, label: 'Todo', href: '/todo', color: 'from-teal-500 via-cyan-500 to-blue-500', glow: 'shadow-teal-500/50' },
    { icon: Users, label: 'Mentorship', href: '/mentorship', color: 'from-purple-500 via-indigo-500 to-blue-500', glow: 'shadow-purple-500/50' },
    { icon: HelpCircle, label: 'Doubts', href: '/doubts', color: 'from-lime-500 via-green-500 to-emerald-500', glow: 'shadow-lime-500/50' },
    { icon: BookMarked, label: 'Articles', href: '/articles', color: 'from-amber-500 via-yellow-500 to-orange-500', glow: 'shadow-amber-500/50' }
  ];

  // Enhanced decorative elements
  const decorativeElements = [
    { icon: Sparkles, delay: 0, radius: 200, speed: 1 },
    { icon: Star, delay: 2, radius: 250, speed: 0.8 },
    { icon: Zap, delay: 4, radius: 180, speed: 1.2 },
    { icon: Atom, delay: 1, radius: 300, speed: 0.6 },
    { icon: Globe, delay: 3, radius: 160, speed: 1.1 },
    { icon: Lightbulb, delay: 5, radius: 220, speed: 0.9 },
    { icon: Sparkles, delay: 6, radius: 280, speed: 0.7 },
    { icon: Star, delay: 7, radius: 140, speed: 1.3 }
  ];

  // Fixed navigation handler - multiple fallback methods
  const handleIconClick = (href) => {
    console.log(`Attempting to navigate to: ${href}`);
    
    try {
      // Method 1: Try Next.js router if available
      if (typeof window !== 'undefined' && window.next && window.next.router) {
        window.next.router.push(href);
        return;
      }
      
      // Method 2: Try window.location for client-side navigation
      if (typeof window !== 'undefined') {
        // For external URLs or when router fails
        if (href.startsWith('http')) {
          window.open(href, '_blank');
        } else {
          // For internal routes
          window.location.href = href;
        }
        return;
      }
      
      // Method 3: Create and click a link element
      const link = document.createElement('a');
      link.href = href;
      link.click();
      
    } catch (error) {
      console.error('Navigation error:', error);
      
      // Final fallback: Alert with URL for debugging
      alert(`Navigation to: ${href}\n\nIf this keeps happening, check:\n1. Your routing setup\n2. Make sure pages exist\n3. Verify Next.js configuration`);
      
      // Still try basic navigation
      if (typeof window !== 'undefined') {
        window.location.href = href;
      }
    }
  };

  if (!mounted) return null;

  return (
<ProtectedRoute>
    
    <div 
      ref={containerRef}
      className="min-h-screen bg-gradient-to-br from-slate-950 via-violet-950/30 to-cyan-950/30 relative overflow-hidden"
    >
      {/* Dynamic animated background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-violet-950/20 to-cyan-950/20 animate-pulse" />
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(124, 58, 237, 0.15), transparent 40%)`
          }}
        />
      </div>

      {/* Enhanced floating decorative elements */}
      {decorativeElements.map((element, index) => {
        const angle = (time * element.speed + index * 45) * Math.PI / 180;
        const x = Math.cos(angle) * element.radius + (typeof window !== 'undefined' ? window.innerWidth / 2 : 400);
        const y = Math.sin(angle) * element.radius + (typeof window !== 'undefined' ? window.innerHeight / 2 : 400);
        
        return (
          <div
            key={index}
            className="absolute text-slate-400/30 transition-all duration-1000"
            style={{
              left: x,
              top: y,
              transform: `rotate(${time * element.speed}deg) scale(${1 + Math.sin(time * 0.1 + index) * 0.2})`,
            }}
          >
            <element.icon className="w-6 h-6 md:w-8 md:h-8" />
          </div>
        );
      })}

      {/* Matrix-style background particles */}
      {[...Array(50)].map((_, i) => (
        <div
          key={i}
          className="absolute w-0.5 h-0.5 bg-cyan-400/20 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animation: `twinkle ${2 + Math.random() * 3}s infinite ${Math.random() * 2}s`,
            transform: `scale(${0.5 + Math.random() * 1.5})`
          }}
        />
      ))}

      {/* Main content container */}
      <div className="relative z-10 flex items-center justify-center min-h-screen p-8">
        
        {/* Central content */}
        <div className="text-center relative">
          
          {/* Animated title */}
          <div className={`mb-4 transition-all duration-2000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-violet-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent mb-2 animate-pulse">
              SkillSarthi
            </h1>
            <div className="h-1 w-32 md:w-48 mx-auto bg-gradient-to-r from-violet-500 to-cyan-500 rounded-full animate-shimmer" />
          </div>
          
          {/* Enhanced subtitle */}
          <p className={`text-xl md:text-2xl text-slate-300 mb-8 font-light transition-all duration-2000 delay-500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            Your Digital Learning Companion
            <span className="block text-sm text-slate-400 mt-2 animate-fade-in-up">
              Empowering minds, one skill at a time ✨
            </span>
          </p>

          {/* Enhanced floating navigation icons */}
          <div className="relative w-96 h-96 md:w-[500px] md:h-[500px] mx-auto">
            
            {/* Central glow effect */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-violet-500/10 to-cyan-500/10 animate-pulse pointer-events-none" />
            <div className="absolute inset-0 rounded-full border border-violet-500/20 animate-spin-slow pointer-events-none" />
            <div className="absolute inset-0 rounded-full border border-cyan-500/20 animate-spin-reverse pointer-events-none" />
            
            {navigationItems.map((item, index) => {
              const angle = (index * 360 / navigationItems.length + time * 0.3) * Math.PI / 180;
              const radius = 180 + Math.sin(time * 0.1 + index) * 10;
              const x = Math.cos(angle) * radius;
              const y = Math.sin(angle) * radius;
              
              return (
                <div
                  key={item.label}
                  className={`absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2 group transition-all duration-1000 z-20 ${isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`}
                  style={{
                    left: '50%',
                    top: '50%',
                    transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) ${hoveredIcon === item.label ? 'scale(1.2)' : 'scale(1)'}`,
                    transitionDelay: `${index * 100 + 1000}ms`,
                    zIndex: 20
                  }}
                  onMouseEnter={() => setHoveredIcon(item.label)}
                  onMouseLeave={() => setHoveredIcon(null)}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    console.log(`Clicked on ${item.label} - ${item.href}`);
                    handleIconClick(item.href);
                  }}
                >
                  <div 
                    className={`relative w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-r ${item.color} p-4 ${item.glow} hover:shadow-2xl flex items-center justify-center backdrop-blur-sm border border-white/20 transition-all duration-500 hover:scale-110 group-hover:rotate-12`}
                    style={{
                      boxShadow: hoveredIcon === item.label ? `0 0 30px rgba(124, 58, 237, 0.5)` : '',
                      animation: `float ${3 + (index * 0.2)}s ease-in-out infinite ${index * 0.1}s`
                    }}
                  >
                    <item.icon className="w-8 h-8 md:w-10 md:h-10 text-white group-hover:scale-110 transition-transform duration-300" />
                    
                    {/* Ripple effect on hover */}
                    {hoveredIcon === item.label && (
                      <div className="absolute inset-0 rounded-full border-2 border-white/50 animate-ping" />
                    )}
                  </div>
                  
                  {/* Enhanced tooltip */}
                  {hoveredIcon === item.label && (
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-4 px-4 py-2 bg-slate-800/95 backdrop-blur-xl border border-slate-600/50 rounded-xl text-sm text-white whitespace-nowrap z-50 shadow-2xl animate-bounce-in pointer-events-none">
                      <div className="font-medium text-violet-300">{item.label}</div>
                      <div className="text-xs text-slate-400 mt-1">Click to explore</div>
                      <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-slate-800 border-l border-t border-slate-600/50 rotate-45 rounded-tl"></div>
                    </div>
                  )}

                  {/* Orbiting particles for hovered icon */}
                  {hoveredIcon === item.label && [...Array(3)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-2 h-2 bg-white/60 rounded-full animate-orbit"
                      style={{
                        animation: `orbit 2s linear infinite ${i * 0.7}s`,
                        left: '50%',
                        top: '50%'
                      }}
                    />
                  ))}
                </div>
              );
            })}
          </div>

          {/* Enhanced call to action */}
          <div className={`mt-12 transition-all duration-2000 delay-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <p className="text-sm md:text-base text-slate-400 mb-6 animate-pulse">
              ✨ Click on any icon to explore our features ✨
            </p>
            
            {/* Debug info */}
            <div className="text-xs text-slate-500 mb-4">
              Navigation Status: Ready | Click any icon to test routing
            </div>
            
            {/* Multiple pulsing ring animations */}
            <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
              {[...Array(4)].map((_, i) => (
                <div 
                  key={i}
                  className="absolute inset-0 rounded-full border-2 border-violet-400/20 animate-ping pointer-events-none"
                  style={{
                    animationDuration: '4s',
                    animationDelay: `${i * 1}s`,
                    width: `${400 + i * 50}px`,
                    height: `${400 + i * 50}px`,
                    left: '50%',
                    top: '50%',
                    transform: 'translate(-50%, -50%)'
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced particle system */}
      {[...Array(30)].map((_, i) => (
        <div
          key={i}
          className="absolute bg-gradient-to-r from-violet-400 to-cyan-400 rounded-full opacity-20"
          style={{
            width: `${2 + Math.random() * 4}px`,
            height: `${2 + Math.random() * 4}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animation: `float-random ${5 + Math.random() * 10}s ease-in-out infinite ${Math.random() * 5}s`
          }}
        />
      ))}

      <style jsx>{`
        @keyframes shimmer {
          0%, 100% { transform: translateX(-100%); }
          50% { transform: translateX(100%); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(5deg); }
        }
        
        @keyframes float-random {
          0%, 100% { transform: translate(0px, 0px) scale(1); }
          25% { transform: translate(10px, -15px) scale(1.2); }
          50% { transform: translate(-5px, -10px) scale(0.8); }
          75% { transform: translate(-10px, 5px) scale(1.1); }
        }
        
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes spin-reverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        
        @keyframes bounce-in {
          0% { opacity: 0; transform: translateX(-50%) translateY(10px) scale(0.8); }
          100% { opacity: 1; transform: translateX(-50%) translateY(0px) scale(1); }
        }
        
        @keyframes orbit {
          0% { transform: translate(-50%, -50%) rotate(0deg) translateX(50px) rotate(0deg); }
          100% { transform: translate(-50%, -50%) rotate(360deg) translateX(50px) rotate(-360deg); }
        }
        
        @keyframes twinkle {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.5); }
        }
        
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-shimmer {
          animation: shimmer 3s ease-in-out infinite;
        }
        
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
        
        .animate-spin-reverse {
          animation: spin-reverse 25s linear infinite;
        }
        
        .animate-bounce-in {
          animation: bounce-in 0.5s ease-out;
        }
        
        .animate-orbit {
          animation: orbit 2s linear infinite;
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 1s ease-out 1s both;
        }
      `}</style>
    </div>
    </ProtectedRoute>
  ) ;
};

export default SkillSarthiLanding;