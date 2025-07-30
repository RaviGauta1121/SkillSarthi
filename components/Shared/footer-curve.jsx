import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  ArrowRight, 
  Instagram, 
  Linkedin, 
  X, 
  Mail,
  Users,
  Sparkles,
  ExternalLink
} from "lucide-react";

const InteractiveButton = ({ children, className = "", onClick, variant = "primary", href }) => {
  const [isHovered, setIsHovered] = useState(false);

  const variants = {
    primary: "bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700",
    secondary: "bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700",
    glass: "bg-white/10 backdrop-blur-lg border border-white/20 hover:bg-white/20",
    danger: "bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700"
  };

  const ButtonContent = (
    <motion.button
      className={`px-6 py-3 rounded-xl font-semibold text-white transition-all duration-300 relative overflow-hidden ${variants[variant]} ${className}`}
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

  if (href) {
    return <a href={href}>{ButtonContent}</a>;
  }

  return ButtonContent;
};

const SocialIcon = ({ Icon, href, delay = 0 }) => (
  <motion.a
    href={href}
    initial={{ opacity: 0, scale: 0 }}
    whileInView={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5, delay }}
    whileHover={{ scale: 1.2, rotate: 10 }}
    whileTap={{ scale: 0.9 }}
    className="relative group"
  >
    <div className="absolute inset-0 bg-gradient-to-r from-violet-500 to-cyan-500 rounded-full blur-lg opacity-0 group-hover:opacity-50 transition-opacity duration-300" />
    <div className="relative w-12 h-12 bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700/50 rounded-full flex items-center justify-center group-hover:border-violet-500/50 transition-colors duration-300">
      <Icon className="w-6 h-6 text-slate-400 group-hover:text-violet-400 transition-colors duration-300" />
    </div>
  </motion.a>
);

const FooterLink = ({ children, href }) => (
  <motion.li
    whileHover={{ x: 5 }}
    className="text-slate-400 hover:text-violet-400 transition-colors duration-300 cursor-pointer"
  >
    <a href={href} className="flex items-center gap-2 group">
      {children}
      <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </a>
  </motion.li>
);

export default function FooterCurve() {
  const [email] = useState("skillsarthi33@gmail.com");
  const [isConnectHovered, setIsConnectHovered] = useState(false);

  return (
    <section className="relative z-20 mt-8 w-full flex flex-col justify-center items-center p-4 bg-slate-950 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-violet-950/10 via-transparent to-cyan-950/10" />
      
      {/* Animated particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-gradient-to-r from-violet-400 to-cyan-400 rounded-full"
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
              y: [0, -50]
            }}
            transition={{
              duration: 3,
              delay: i * 0.3,
              repeat: Infinity,
              ease: "easeOut"
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`
            }}
          />
        ))}
      </div>

      {/* Contact Bar - Desktop Only */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative hidden md:flex h-24 w-full max-w-2xl py-4 px-6 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border border-slate-700/50 shadow-2xl backdrop-blur-lg z-10 mb-8"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-violet-500/5 to-cyan-500/5 rounded-3xl" />
        
        <div className="relative w-full flex items-center bg-slate-800/50 border border-slate-600/50 rounded-2xl overflow-hidden">
          <div className="flex items-center px-4 py-3 flex-1">
            <Mail className="w-5 h-5 text-violet-400 mr-3" />
            <span className="text-slate-300 font-medium">{email}</span>
          </div>
          
          <motion.button
            className="relative h-12 w-48 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 rounded-xl mr-1 font-semibold text-white overflow-hidden group"
            onHoverStart={() => setIsConnectHovered(true)}
            onHoverEnd={() => setIsConnectHovered(false)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-600"
              initial={{ x: '-100%' }}
              animate={{ x: isConnectHovered ? '0%' : '-100%' }}
              transition={{ duration: 0.3 }}
            />
            <span className="relative z-10 flex items-center justify-center gap-2">
              Connect
              <motion.div
                animate={{ x: isConnectHovered ? 5 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ArrowRight className="w-4 h-4" />
              </motion.div>
            </span>
          </motion.button>
        </div>

        {/* Decorative curves */}
        <div className="absolute -left-6 top-10 h-8 w-6">
          <div className="h-6 w-full bg-slate-900 mt-2 rounded-tr-3xl border-t border-r border-slate-700/50" />
        </div>
        <div className="absolute -right-6 top-10 h-8 w-6">
          <div className="h-6 w-full bg-slate-900 mt-2 rounded-tl-3xl border-t border-l border-slate-700/50" />
        </div>
      </motion.div>

      {/* Main Footer Content */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="relative w-full rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border border-slate-700/50 shadow-2xl backdrop-blur-lg overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 to-cyan-500/5" />
        
        <div className="relative p-8 flex flex-col md:flex-row justify-between items-start gap-8">
          {/* Left Section - Info & Links */}
          <div className="flex-1 space-y-8">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-center md:text-left"
            >
              <h2 className="text-3xl md:text-4xl font-black leading-tight">
                You can{" "}
                <motion.span
                  className="bg-gradient-to-r from-orange-400 via-red-500 to-pink-500 bg-clip-text text-transparent"
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
                  find everything
                </motion.span>
                <br />
                you need, right here
              </h2>
            </motion.div>

            {/* Links and Social */}
            <div className="flex flex-col md:flex-row gap-8 md:gap-16">
              {/* Company Links */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <h3 className="text-white font-bold text-lg mb-4">Company</h3>
                <ul className="space-y-3">
                  <FooterLink href="/about">Why Us</FooterLink>
                  <FooterLink href="/about">About</FooterLink>
                  <FooterLink href="/privacy">Privacy Policy</FooterLink>
                  <FooterLink href="/terms">Terms</FooterLink>
                </ul>
              </motion.div>

              {/* Product Links */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <h3 className="text-white font-bold text-lg mb-4">Product</h3>
                <ul className="space-y-3">
                  <FooterLink href="/tracking">Tracking</FooterLink>
                  <FooterLink href="/credit">Credit</FooterLink>
                  <FooterLink href="/filing">Filing</FooterLink>
                  <FooterLink href="/analytics">Analytics</FooterLink>
                </ul>
              </motion.div>

              {/* Social & Team */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="flex flex-col items-center md:items-start space-y-6"
              >
                {/* Social Icons */}
                <div className="flex gap-4">
                  <SocialIcon Icon={Instagram} href="#" delay={0.1} />
                  <SocialIcon Icon={Linkedin} href="#" delay={0.2} />
                  <SocialIcon Icon={X} href="#" delay={0.3} />
                </div>

                {/* Team Button */}
                <InteractiveButton variant="danger" href="/team">
                  <Users className="w-4 h-4" />
                  Our Team
                </InteractiveButton>
              </motion.div>
            </div>
          </div>

          {/* Right Section - CTA Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            <div className="relative group">
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-pink-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Main card */}
              <div className="relative w-80 bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-6 border border-slate-700/50 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-pink-500/5" />
                
                {/* Floating icon */}
                <motion.div
                  animate={{ 
                    rotate: [0, 10, -10, 0],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -top-6 -right-6 w-12 h-12 bg-gradient-to-r from-violet-500 to-cyan-500 rounded-full flex items-center justify-center border-4 border-slate-800"
                >
                  <Sparkles className="w-6 h-6 text-white" />
                </motion.div>

                {/* Image */}
                <div className="relative h-40 mb-4 rounded-2xl overflow-hidden">
                  <img
                    src="https://img.freepik.com/free-vector/organic-flat-blog-post-illustration-with-people_23-2148955260.jpg"
                    alt="Grow with guidance"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent" />
                </div>

                {/* Content */}
                <div className="relative space-y-4">
                  <h3 className="text-xl font-bold text-white">Grow with guidance</h3>
                  
                  <InteractiveButton variant="primary" href="/mentorship" className="w-full">
                    Talk to expert
                    <ArrowRight className="w-4 h-4" />
                  </InteractiveButton>
                </div>

                {/* Decorative elements */}
                <div className="absolute -bottom-4 -right-6 w-32 h-32 bg-slate-900/50 rounded-2xl border border-slate-700/50 -z-10" />
                <div className="absolute -top-2 -left-4 w-48 h-16 bg-slate-900/50 rounded-2xl border border-slate-700/50 -z-10" />
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}