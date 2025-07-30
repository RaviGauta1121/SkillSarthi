import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  GraduationCap, 
  BookOpen, 
  Award, 
  MapPin, 
  Lightbulb,
  Sparkles,
  ArrowRight,
  Users
} from "lucide-react";

const InteractiveButton = ({ children, className = "", onClick, variant = "primary" }) => {
  const [isHovered, setIsHovered] = useState(false);

  const variants = {
    primary: "bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700",
    secondary: "bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700",
    glass: "bg-white/10 backdrop-blur-lg border border-white/20 hover:bg-white/20"
  };

  return (
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
};

const FeatureCard = ({ icon: Icon, title, description, delay = 0, imageUrl }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ y: -10, scale: 1.02 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group relative w-full max-w-xs mx-auto"
    >
      {/* Glow effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-violet-600/20 to-cyan-600/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="relative min-h-[280px] rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border border-slate-700/50 shadow-2xl overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 to-cyan-500/5" />
        
        {/* Header with image and icon */}
        <div className="p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="relative">
              <img
                src={imageUrl}
                alt={title}
                className="w-12 h-12 rounded-lg object-cover border border-slate-600"
              />
              <motion.div
                animate={{ rotate: isHovered ? 360 : 0 }}
                transition={{ duration: 0.5 }}
                className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-violet-500 to-cyan-500 rounded-full flex items-center justify-center"
              >
                <Icon className="w-3 h-3 text-white" />
              </motion.div>
            </div>
            
            <motion.div
              animate={{ 
                backgroundPosition: isHovered ? '200% 0%' : '0% 0%' 
              }}
              transition={{ duration: 0.8 }}
              className="flex-1"
            >
              <h3 className="text-lg font-bold text-white leading-tight">
                {title}
              </h3>
            </motion.div>
          </div>

          <p className="text-slate-400 text-sm leading-relaxed mb-4">
            {description}
          </p>

          {/* Animated progress bar */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: isHovered ? '100%' : '40%' }}
            transition={{ duration: 0.3 }}
            className="h-1 bg-gradient-to-r from-violet-500 to-cyan-500 rounded-full"
          />
        </div>

        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {Array.from({ length: 5 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-gradient-to-r from-violet-400 to-cyan-400 rounded-full"
              animate={{
                x: [0, 100, 0],
                y: [0, -50, 0],
                opacity: [0, 1, 0]
              }}
              transition={{
                duration: 3,
                delay: i * 0.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              style={{
                left: `${20 + i * 15}%`,
                top: `${60 + i * 5}%`
              }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default function NewSection() {
  const features = [
    {
      icon: Users,
      title: "Best Tutor",
      description: "We have the best tutor, the AI-powered mentor providing personalized guidance, real-time feedback, and customized learning paths for student success.",
      imageUrl: "https://plus.unsplash.com/premium_photo-1678565999588-08fdd0b1410b?q=80&w=1894&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      icon: BookOpen,
      title: "Best Curriculum",
      description: "The curriculum is adaptive, personalized, and skill-based, offering engaging content, practical exercises, and real-world applications for students.",
      imageUrl: "https://plus.unsplash.com/premium_vector-1711987806081-f2228e240180?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      icon: Award,
      title: "Certificate",
      description: "Upon completion, students receive industry-recognized certifications, validating their skills and boosting career prospects through credible achievements.",
      imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      icon: MapPin,
      title: "Best Guide",
      description: "The best guide through personalized learning, instant support, and clear explanations tailored to your needs, ensuring progress and understanding.",
      imageUrl: "https://th.bing.com/th/id/OIP.uCpewbBBr7qksW_IM73gSQHaEA?rs=1&pid=ImgDetMain"
    },
    {
      icon: Lightbulb,
      title: "Creative Thinking",
      description: "We foster creative thinking through interactive challenges, brainstorming sessions, project-based learning, and diverse problem-solving activities that inspire innovation.",
      imageUrl: "https://www.thecodinghub.com/wp-content/uploads/2023/05/CodingGamesForKidsFree-980x551.png"
    }
  ];

  return (
    <section className="py-20 px-6 lg:px-16 relative bg-slate-950 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-violet-950/20 via-transparent to-cyan-950/20" />
      
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 30 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-gradient-to-r from-violet-400 to-cyan-400 rounded-full"
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
              y: [0, -100]
            }}
            transition={{
              duration: 4,
              delay: i * 0.2,
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

      <div className="container mx-auto relative z-10">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row gap-12 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6 lg:max-w-md"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h3 className="text-4xl lg:text-5xl font-black leading-tight">
                <span className="text-white">Why we are </span>
                <motion.span 
                  className="bg-gradient-to-r from-violet-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent block"
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
                  different
                </motion.span>
                <span className="text-white">than others?</span>
              </h3>
            </motion.div>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-slate-300 text-lg leading-relaxed"
            >
              Our platform offers personalized, AI-driven learning with gamification, 
              integrated tools, and career mentorship, providing an immersive, job-ready experience.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <InteractiveButton variant="primary">
                Get Started
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  <ArrowRight size={18} />
                </motion.div>
              </InteractiveButton>
            </motion.div>
          </motion.div>

          {/* Feature highlight */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex-1 flex justify-center lg:justify-end"
          >
            <div className="relative">
              <motion.div
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="relative bg-gradient-to-br from-slate-800 to-slate-900 p-8 rounded-3xl border border-slate-700/50 backdrop-blur-lg"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-violet-500/10 to-cyan-500/10 rounded-3xl" />
                <div className="relative w-64 h-48 bg-gradient-to-br from-violet-500/20 to-cyan-500/20 rounded-2xl flex items-center justify-center">
                  <motion.div
                    animate={{ 
                      scale: [1, 1.1, 1],
                      rotate: [0, 180, 360]
                    }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  >
                    <Sparkles size={48} className="text-violet-400" />
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              imageUrl={feature.imageUrl}
              delay={index * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}