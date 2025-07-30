'use client';

import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ChevronRight, Star, Sparkles, Code, Users, BookOpen, Zap, ArrowRight, Play, Pause } from 'lucide-react';
import NewSection from '@/components/Shared/NewSection';
import CallToAction from '@/components/Shared/call-to-action';
import FooterCurve from '@/components/Shared/footer-curve';

const InteractiveButton = ({ children, className = "", onClick, variant = "primary" }) => {
  const [isHovered, setIsHovered] = useState(false);

  const variants = {
    primary: "bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700",
    secondary: "bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700",
    glass: "bg-white/10 backdrop-blur-lg border border-white/20 hover:bg-white/20"
  };

  return (
    <motion.button
      className={`px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-semibold text-white transition-all duration-300 relative overflow-hidden text-sm sm:text-base ${variants[variant]} ${className}`}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={onClick}
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
        initial={{ x: '-100%' }}
        animate={{ x: isHovered ? '100%' : '-100%' }}
        transition={{ duration: 0.6 }}
      />
      <span className="relative z-10 flex items-center gap-2">
        {children}
      </span>
    </motion.button>
  );
};

const FloatingElement = ({ children, delay = 0 }) => (
  <motion.div
    animate={{ 
      y: [0, -10, 0],
      rotate: [0, 1, -1, 0] 
    }}
    transition={{ 
      duration: 4,
      delay,
      repeat: Infinity,
      ease: "easeInOut" 
    }}
  >
    {children}
  </motion.div>
);

const ParticleField = () => {
  const particles = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    delay: Math.random() * 2
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute w-1 h-1 bg-gradient-to-r from-violet-400 to-cyan-400 rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
          }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
            y: [0, -50]
          }}
          transition={{
            duration: 3,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeOut"
          }}
        />
      ))}
    </div>
  );
};

const FeatureCard = ({ number, title, description, delay = 0, icon: Icon }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ y: -5, scale: 1.02 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group relative w-full max-w-sm mx-auto"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-violet-600/20 to-cyan-600/20 rounded-2xl sm:rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="relative w-full h-80 sm:h-96 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border border-slate-700/50 shadow-2xl overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 to-cyan-500/5" />
        
        <motion.div
          animate={{ rotate: isHovered ? 5 : 0 }}
          transition={{ duration: 0.3 }}
          className="absolute top-4 sm:top-6 right-4 sm:right-6"
        >
          <Icon className="w-6 h-6 sm:w-8 sm:h-8 text-violet-400" />
        </motion.div>

        <div className="p-4 sm:p-6 h-full flex flex-col">
          <motion.div
            animate={{ 
              backgroundPosition: isHovered ? '200% 0%' : '0% 0%' 
            }}
            transition={{ duration: 0.8 }}
            className="text-6xl sm:text-8xl font-black bg-gradient-to-r from-violet-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent mb-3 sm:mb-4"
            style={{ backgroundSize: '200% 100%' }}
          >
            {number}
          </motion.div>

          <h3 className="text-lg sm:text-xl font-bold text-white mb-3 sm:mb-4 leading-tight">
            {title}
          </h3>

          <p className="text-slate-400 text-xs sm:text-sm leading-relaxed flex-1">
            {description}
          </p>

          <motion.div
            initial={{ width: 0 }}
            animate={{ width: isHovered ? '100%' : '30%' }}
            transition={{ duration: 0.3 }}
            className="h-1 bg-gradient-to-r from-violet-500 to-cyan-500 rounded-full mt-3 sm:mt-4"
          />
        </div>
      </div>
    </motion.div>
  );
};

export default function Home() {
  const { scrollYProgress } = useScroll();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isPlaying, setIsPlaying] = useState(true);

  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  useEffect(() => {
    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', updateMousePosition);
    return () => window.removeEventListener('mousemove', updateMousePosition);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-hidden mt-5">
      {/* Animated background gradient */}
      <div className="fixed inset-0 bg-gradient-to-br from-slate-950 via-violet-950/20 to-cyan-950/20" />
      
      {/* Mouse follower effect - only on larger screens */}
      <motion.div
        className="fixed inset-0 pointer-events-none z-0 hidden sm:block"
        animate={{
          background: `radial-gradient(400px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(139, 92, 246, 0.1), transparent 40%)`
        }}
        transition={{ type: "tween", ease: "backOut", duration: 0.5 }}
      />

      <main className="relative z-10">
        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center relative overflow-hidden px-4 sm:px-6">
          <ParticleField />
          
          <motion.div
            style={{ y: backgroundY }}
            className="absolute inset-0 bg-gradient-to-br from-violet-600/10 via-transparent to-cyan-600/10"
          />

          <div className="container mx-auto max-w-7xl grid lg:grid-cols-2 gap-8 lg:gap-12 items-center relative z-10">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-6 sm:space-y-8 text-center lg:text-left"
            >
              <motion.div variants={itemVariants} className="space-y-4">
                <motion.h1 
                  className="text-3xl sm:text-5xl lg:text-7xl font-black leading-tight"
                  style={{ y: textY }}
                >
                  <span className="text-white">Up skill with</span>
                  <motion.span 
                    className="block mt-2 sm:mt-4 bg-gradient-to-r from-violet-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent"
                    animate={{ 
                      backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                    }}
                    transition={{ 
                      duration: 3, 
                      repeat: Infinity,
                      ease: "linear"
                    }}
                    style={{ backgroundSize: '200% 100%' }}
                  >
                    SKILL SARTHI !
                  </motion.span>
                </motion.h1>

                <motion.p 
                  variants={itemVariants}
                  className="text-slate-300 text-base sm:text-lg lg:text-xl leading-relaxed max-w-lg mx-auto lg:mx-0"
                >
                  Learning new skills doesn't have to be boring now! With our fun
                  and simple paths, you can level up fast, crush your goals while
                  enjoying the journey along the way.
                </motion.p>
              </motion.div>

              <motion.div 
                variants={itemVariants}
                className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 justify-center lg:justify-start"
              >
                <InteractiveButton variant="primary" className="w-full sm:w-auto">
                  Check out
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    <ChevronRight size={18} />
                  </motion.div>
                </InteractiveButton>

                <InteractiveButton variant="glass" className="w-full sm:w-auto">
                  <Sparkles size={18} />
                  Gallery
                </InteractiveButton>
              </motion.div>

              {/* Stats */}
              <motion.div 
                variants={itemVariants}
                className="grid grid-cols-3 gap-4 sm:gap-6 pt-6 sm:pt-8 max-w-md mx-auto lg:mx-0"
              >
                {[
                  { number: "10K+", label: "Students" },
                  { number: "95%", label: "Success Rate" },
                  { number: "500+", label: "Projects" }
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.1 }}
                    className="text-center"
                  >
                    <div className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
                      {stat.number}
                    </div>
                    <div className="text-slate-400 text-xs sm:text-sm">{stat.label}</div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="relative mt-8 lg:mt-0"
            >
              <FloatingElement>
                <div className="relative mx-auto max-w-sm lg:max-w-none">
                  <div className="absolute inset-0 bg-gradient-to-r from-violet-500 to-cyan-500 rounded-2xl sm:rounded-3xl blur-2xl sm:blur-3xl opacity-30 animate-pulse" />
                  <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 p-4 sm:p-8 rounded-2xl sm:rounded-3xl border border-slate-700/50 backdrop-blur-lg">
                    <div className="w-full h-48 sm:h-64 bg-gradient-to-br from-violet-500/20 to-cyan-500/20 rounded-xl sm:rounded-2xl flex items-center justify-center">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                      >
                        <Code size={48} className="text-violet-400 sm:w-16 sm:h-16" />
                      </motion.div>
                    </div>
                  </div>
                </div>
              </FloatingElement>
            </motion.div>
          </div>
        </section>

        {/* Features Preview Section */}
        <motion.section 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="py-12 sm:py-20 px-4 sm:px-6 lg:px-16 relative"
        >
          <div className="container mx-auto max-w-7xl">
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12 sm:mb-16"
            >
              <h2 className="text-2xl sm:text-3xl lg:text-5xl font-bold mb-4 sm:mb-6">
                Ready to{" "}
                <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
                  level up?
                </span>
              </h2>
              <p className="text-lg sm:text-xl text-slate-300 max-w-4xl mx-auto leading-relaxed px-4">
                Create resumes, chat with AI, book mentorship sessions, play games, 
                and host meetings—all in one platform!
              </p>
            </motion.div>

            {/* Interactive feature cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
              {[
                { icon: BookOpen, title: "Smart Learning", color: "from-violet-500 to-purple-500" },
                { icon: Users, title: "Mentorship", color: "from-purple-500 to-pink-500" },
                { icon: Zap, title: "AI Assistant", color: "from-pink-500 to-cyan-500" },
                { icon: Star, title: "Achievements", color: "from-cyan-500 to-blue-500" }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -5, scale: 1.05 }}
                  className="group cursor-pointer"
                >
                  <div className="relative p-3 sm:p-6 rounded-xl sm:rounded-2xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 backdrop-blur-lg hover:border-violet-500/50 transition-all duration-300">
                    <div className={`w-8 h-8 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-gradient-to-r ${feature.color} flex items-center justify-center mb-2 sm:mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <feature.icon size={16} className="text-white sm:w-6 sm:h-6" />
                    </div>
                    <h3 className="text-sm sm:text-lg font-semibold text-white group-hover:text-violet-300 transition-colors duration-300">
                      {feature.title}
                    </h3>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Why Choose Us Section */}
        <section className="py-12 sm:py-20 px-4 sm:px-6 lg:px-16 relative">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12 sm:mb-16"
          >
            <div className="relative inline-block">
              <motion.div
                className="absolute -left-8 sm:-left-20 top-1/2 w-8 sm:w-16 h-0.5 bg-gradient-to-r from-transparent to-violet-500 hidden sm:block"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              />
              <h2 className="text-2xl sm:text-4xl lg:text-6xl font-black">
                Why{" "}
                <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-violet-400 bg-clip-text text-transparent">
                  choose
                </span>{" "}
                us?
              </h2>
              <motion.div
                className="absolute -right-8 sm:-right-20 top-1/2 w-8 sm:w-16 h-0.5 bg-gradient-to-l from-transparent to-cyan-500 hidden sm:block"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              />
            </div>
          </motion.div>

          <div className="container mx-auto max-w-7xl">
            <div className="flex flex-col lg:flex-row justify-center items-center gap-6 sm:gap-8 lg:gap-12">
              <FeatureCard
                number="01"
                title="Expert-Crafted Learning"
                description="Our team of accomplished engineers, with impressive coding profiles across various programming platforms, hails from top tech companies like Google, Amazon, Meta, and Microsoft. They also boast a proven track record of successful teaching."
                delay={0}
                icon={Code}
              />
              <FeatureCard
                number="02"
                title="Structured Learning Path"
                description="Master Data Structures & Algorithms (DSA), System Design, core subjects, and practical projects - all through premium blog posts and in-depth video solutions."
                delay={0.2}
                icon={BookOpen}
              />
              <FeatureCard
                number="03"
                title="Unmatched Content Depth"
                description="We prioritize quality content; offering in-depth explanations and a wider range of solved problems in both free and paid courses. Our focus is on developing problem-solving skills through intuitive video explanations."
                delay={0.4}
                icon={Star}
              />
            </div>
          </div>
        </section>

        {/* Call to Action Section */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="py-12 sm:py-20 px-4 sm:px-6 lg:px-16 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-violet-600/10 to-cyan-600/10" />
          <ParticleField />
          
          <div className="container mx-auto max-w-7xl text-center relative z-10">
            <motion.h2
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="text-2xl sm:text-4xl lg:text-6xl font-black mb-4 sm:mb-6"
            >
              Ready to{" "}
              <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
                transform
              </span>{" "}
              your career?
            </motion.h2>
            
            <motion.p
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg sm:text-xl text-slate-300 mb-8 sm:mb-12 max-w-2xl mx-auto px-4"
            >
              Join thousands of learners who have already started their journey to success.
            </motion.p>

            <motion.div
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6"
            >
              <InteractiveButton variant="primary" className="text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 w-full sm:w-auto">
                Start Learning Now
                <ArrowRight size={20} />
              </InteractiveButton>
              
              <InteractiveButton variant="glass" className="text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 w-full sm:w-auto">
                Watch Demo
                <Play size={20} />
              </InteractiveButton>
            </motion.div>
          </div>
        </motion.section>
      </main>

       <NewSection/>

      <CallToAction/>
      <FooterCurve/>
    </div>
  );
}