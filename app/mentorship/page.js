'use client'

import React, { useState } from 'react';
import { Star, Clock, Users, Award, Calendar, MessageCircle, Video, FileText, CheckCircle, User, ChevronRight, Heart, Shield, Zap, Code, BookOpen } from 'lucide-react';

const MentorshipPlatform = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [showPayment, setShowPayment] = useState(false);
  const [user, setUser] = useState(null);

  // Mock data for mentors
  const mentors = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Senior Software Engineer at Google",
      experience: "8 years",
      rating: 4.9,
      reviews: 127,
      image: "https://via.placeholder.com/150x150?text=SJ",
      expertise: ["React", "Node.js", "System Design", "Career Growth"],
      price: 2500,
      description: "Former FAANG engineer helping developers level up their careers"
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Tech Lead at Microsoft",
      experience: "10 years",
      rating: 4.8,
      reviews: 89,
      image: "https://via.placeholder.com/150x150?text=MC",
      expertise: ["Python", "ML", "Leadership", "Architecture"],
      price: 3000,
      description: "Passionate about mentoring next-gen tech leaders"
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      role: "Product Manager at Spotify",
      experience: "6 years",
      rating: 4.9,
      reviews: 156,
      image: "https://via.placeholder.com/150x150?text=ER",
      expertise: ["Product Strategy", "UX", "Data Analytics", "Growth"],
      price: 2800,
      description: "Helping professionals transition into product management"
    }
  ];

  const plans = [
    {
      id: 'basic',
      name: 'One Time Mentorship',
      price: 255,
      duration: 'Single Session',
      features: [
        'Chat session',
        'Audio/video session',
        'Resume review session',
        '24/7 support'
      ],
      popular: false,
      color: 'from-blue-500 to-teal-500'
    },
    {
      id: 'premium',
      name: 'Full Time Mentorship',
      price: 700,
      duration: 'Monthly',
      features: [
        'Unlimited Chat with Mentor',
        'Multiple Audio/Video Sessions',
        'Multiple Resume Review Sessions',
        'Multiple Mock Interview Sessions',
        'Job Referral From Mentor',
        'Priority support'
      ],
      popular: true,
      color: 'from-purple-500 to-pink-500'
    },
    {
      id: 'bootcamp',
      name: 'Bootcamps',
      price: 1000,
      duration: '3 Months',
      features: [
        'Multiple Live Interactive Sessions',
        'Multiple Ask Me Anything Sessions',
        'Strong Peer Network with Mentor',
        'Certificate of Completion',
        'Exclusive Preparation Resources',
        'Career placement assistance'
      ],
      popular: false,
      color: 'from-teal-500 to-cyan-500'
    }
  ];

  const Meteors = ({ number = 20 }) => {
    const meteors = Array.from({ length: number }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      animationDelay: Math.random() * 0.6 + 0.2,
      animationDuration: Math.random() * 0.8 + 0.8
    }));

    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {meteors.map((meteor) => (
          <span
            key={meteor.id}
            className="absolute h-0.5 w-0.5 rotate-[215deg] animate-meteor rounded-full bg-slate-500 shadow-[0_0_0_1px_#ffffff10]"
            style={{
              top: 0,
              left: `${meteor.left}%`,
              animationDelay: `${meteor.animationDelay}s`,
              animationDuration: `${meteor.animationDuration}s`,
            }}
          >
            <div className="absolute top-1/2 -z-10 h-[1px] w-[50px] -translate-y-1/2 bg-gradient-to-r from-slate-500 to-transparent" />
          </span>
        ))}
      </div>
    );
  };

  const ParticleField = () => {
    return <Meteors number={30} />;
  };

  const InteractiveButton = ({ children, onClick, variant = "primary", className = "" }) => {
    const variants = {
      primary: "bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 shadow-2xl hover:shadow-blue-500/25",
      secondary: "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 shadow-2xl hover:shadow-pink-500/25",
      glass: "bg-white/10 backdrop-blur-lg border border-white/20 hover:bg-white/20 shadow-2xl"
    };

    return (
      <button
        onClick={onClick}
        className={`px-6 py-3 rounded-xl font-semibold text-white transition-all duration-300 hover:scale-105 transform ${variants[variant]} ${className}`}
      >
        {children}
      </button>
    );
  };

  const HomePage = () => (
    <div className="min-h-screen bg-gray-950 text-white relative overflow-hidden">
      <ParticleField />
      
      {/* Hero Section */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-teal-500/10" />
        <div className="relative max-w-7xl mx-auto px-6 py-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black leading-tight mb-6">
              <span className="text-white">Transform Your</span>
              <span className="block mt-4 bg-gradient-to-r from-violet-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                Career Journey
              </span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              Connect with industry experts and accelerate your professional growth through personalized mentorship
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <InteractiveButton onClick={() => setCurrentPage('plans')} variant="primary">
                Explore Plans
                <ChevronRight className="w-5 h-5 ml-2" />
              </InteractiveButton>
              <InteractiveButton onClick={() => setCurrentPage('mentors')} variant="glass">
                Find Mentors
                <Users className="w-5 h-5 ml-2" />
              </InteractiveButton>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-6 py-20 relative">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            Why Choose Our{" "}
            <span className="bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">
              Platform?
            </span>
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">Get the guidance you need to succeed</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { 
              icon: <Users className="w-12 h-12" />, 
              title: "Expert Mentors", 
              desc: "Learn from industry leaders with proven track records",
              color: "from-blue-500 to-teal-500"
            },
            { 
              icon: <Zap className="w-12 h-12" />, 
              title: "Personalized Growth", 
              desc: "Tailored guidance based on your goals and experience",
              color: "from-purple-500 to-pink-500"
            },
            { 
              icon: <Shield className="w-12 h-12" />, 
              title: "Guaranteed Results", 
              desc: "100% satisfaction guarantee or money back",
              color: "from-teal-500 to-cyan-500"
            }
          ].map((feature, index) => (
            <div key={index} className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-teal-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative bg-gray-900 backdrop-blur-lg rounded-3xl p-8 text-center border border-gray-800 hover:border-blue-500/50 transition-all duration-300 hover:scale-105 overflow-hidden">
                <Meteors number={15} />
                <div className={`w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-r ${feature.color} flex items-center justify-center text-white relative z-10`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-4 relative z-10">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed relative z-10">{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="max-w-7xl mx-auto px-6 pb-20">
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <InteractiveButton onClick={() => setCurrentPage('plans')} variant="primary" className="text-lg px-8 py-4">
            View All Plans
          </InteractiveButton>
          <InteractiveButton onClick={() => setCurrentPage('mentors')} variant="secondary" className="text-lg px-8 py-4">
            Meet Our Mentors
          </InteractiveButton>
        </div>
      </div>
    </div>
  );

  const PlansPage = () => (
    <div className="min-h-screen bg-gray-950 py-20 relative overflow-hidden">
      <ParticleField />
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-teal-500/10" />
      
      <div className="max-w-7xl mx-auto px-6 relative">
        <div className="text-center mb-16">
          <button 
            onClick={() => setCurrentPage('home')}
            className="mb-8 text-violet-400 hover:text-violet-300 flex items-center mx-auto transition-colors"
          >
            ← Back to Home
          </button>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6">
            Choose Your{" "}
            <span className="bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">
              Plan
            </span>
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">Select the perfect mentorship package for your goals</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div 
              key={plan.id}
              className={`group relative ${plan.popular ? 'scale-105' : ''}`}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-violet-600/20 to-cyan-600/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className={`relative bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-lg rounded-3xl p-8 border ${plan.popular ? 'border-violet-500/50' : 'border-slate-700/50'} hover:border-violet-500/50 transition-all duration-300 hover:scale-105`}>
              
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-blue-500 to-teal-500 text-white px-6 py-2 rounded-full text-sm font-bold">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <div className="text-center mb-8 relative z-10">
                  <div className={`w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-r ${plan.color} flex items-center justify-center`}>
                    <Award className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">{plan.name}</h3>
                  <div className="text-4xl font-bold text-white mb-2">
                    ₹{plan.price}
                    <span className="text-lg text-gray-400">/{plan.duration}</span>
                  </div>
                </div>

                <ul className="space-y-4 mb-8 relative z-10">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-gray-300">
                      <CheckCircle className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <InteractiveButton
                  onClick={() => {
                    setSelectedPlan(plan);
                    setShowPayment(true);
                  }}
                  variant="primary"
                  className="w-full relative z-10"
                >
                  Get Started
                </InteractiveButton>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const MentorsPage = () => (
    <div className="min-h-screen bg-gray-950 py-20 relative overflow-hidden">
      <ParticleField />
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-teal-500/10" />
      
      <div className="max-w-7xl mx-auto px-6 relative">
        <div className="text-center mb-16">
          <button 
            onClick={() => setCurrentPage('home')}
            className="mb-8 text-violet-400 hover:text-violet-300 flex items-center mx-auto transition-colors"
          >
            ← Back to Home
          </button>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6">
            Meet Our{" "}
            <span className="bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">
              Mentors
            </span>
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">Connect with industry experts who will guide your journey</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mentors.map((mentor, index) => (
            <div 
              key={mentor.id}
              className="group relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-violet-600/20 to-cyan-600/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-lg rounded-3xl p-6 border border-slate-700/50 hover:border-violet-500/50 transition-all duration-300 hover:scale-105">
                <div className="text-center mb-6">
                  <div className="w-24 h-24 rounded-full mx-auto mb-4 bg-gradient-to-r from-violet-500 to-purple-500 flex items-center justify-center text-white text-2xl font-bold">
                    {mentor.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{mentor.name}</h3>
                  <p className="text-violet-400 text-sm mb-3">{mentor.role}</p>
                  <div className="flex items-center justify-center gap-2">
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-white ml-1">{mentor.rating}</span>
                    </div>
                    <span className="text-slate-400">({mentor.reviews} reviews)</span>
                  </div>
                </div>

                <p className="text-slate-300 text-sm mb-6 text-center leading-relaxed">{mentor.description}</p>

                <div className="mb-6">
                  <div className="flex flex-wrap gap-2 justify-center">
                    {mentor.expertise.slice(0, 3).map((skill, idx) => (
                      <span key={idx} className="bg-violet-600/20 text-violet-300 px-3 py-1 rounded-full text-xs border border-violet-500/30">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="text-center">
                  <div className="text-2xl font-bold text-white mb-4">₹{mentor.price}/month</div>
                  <InteractiveButton variant="primary" className="w-full">
                    Book Session
                  </InteractiveButton>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const PaymentModal = () => (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-8 max-w-md w-full border border-violet-500/50 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-600/10 to-cyan-600/10 rounded-3xl" />
        
        <div className="relative text-center mb-6">
          <h2 className="text-2xl font-bold text-white mb-2">Complete Payment</h2>
          <p className="text-slate-400">You selected: {selectedPlan?.name}</p>
          <div className="text-3xl font-bold bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent mt-2">
            ₹{selectedPlan?.price}
          </div>
        </div>

        <div className="space-y-4 relative">
          <div>
            <label className="block text-white text-sm font-medium mb-2">Full Name</label>
            <input 
              type="text" 
              className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-3 text-white focus:border-violet-500 outline-none backdrop-blur-lg"
              placeholder="Enter your full name"
            />
          </div>
          <div>
            <label className="block text-white text-sm font-medium mb-2">Email</label>
            <input 
              type="email" 
              className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-3 text-white focus:border-violet-500 outline-none backdrop-blur-lg"
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label className="block text-white text-sm font-medium mb-2">Phone</label>
            <input 
              type="tel" 
              className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-3 text-white focus:border-violet-500 outline-none backdrop-blur-lg"
              placeholder="Enter your phone number"
            />
          </div>
        </div>

        <div className="flex gap-4 mt-6 relative">
          <InteractiveButton 
            onClick={() => setShowPayment(false)}
            variant="glass"
            className="flex-1"
          >
            Cancel
          </InteractiveButton>
          <InteractiveButton 
            onClick={() => {
              setShowPayment(false);
              setUser({ name: 'John Doe', plan: selectedPlan });
              setCurrentPage('dashboard');
            }}
            variant="primary"
            className="flex-1"
          >
            Pay Now
          </InteractiveButton>
        </div>
      </div>
    </div>
  );

  const Dashboard = () => (
    <div className="min-h-screen bg-slate-950 py-20 relative overflow-hidden">
      <ParticleField />
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-violet-950/20 to-cyan-950/20" />
      
      <div className="max-w-7xl mx-auto px-6 relative">
        <div className="mb-8">
          <button 
            onClick={() => setCurrentPage('home')}
            className="mb-6 text-violet-400 hover:text-violet-300 flex items-center transition-colors"
          >
            ← Back to Home
          </button>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-4">
            Welcome back,{" "}
            <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
              {user?.name}!
            </span>
          </h1>
          <p className="text-slate-300 text-lg">Your mentorship journey continues</p>
        </div>

        <div className="grid md:grid-cols-4 gap-6 mb-8">
          {[
            { icon: <MessageCircle className="w-6 h-6" />, title: "Messages", count: "3 new", color: "from-violet-500 to-purple-500" },
            { icon: <Video className="w-6 h-6" />, title: "Sessions", count: "2 upcoming", color: "from-purple-500 to-pink-500" },
            { icon: <FileText className="w-6 h-6" />, title: "Resources", count: "12 available", color: "from-pink-500 to-cyan-500" },
            { icon: <Award className="w-6 h-6" />, title: "Progress", count: "78% complete", color: "from-cyan-500 to-blue-500" }
          ].map((stat, index) => (
            <div key={index} className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-violet-600/20 to-cyan-600/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-lg rounded-2xl p-6 border border-slate-700/50 hover:border-violet-500/50 transition-all duration-300 hover:scale-105">
                <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${stat.color} mb-4 text-white`}>
                  {stat.icon}
                </div>
                <h3 className="text-white font-semibold mb-1">{stat.title}</h3>
                <p className="text-slate-400 text-sm">{stat.count}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-br from-violet-600/20 to-cyan-600/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-lg rounded-2xl p-6 border border-slate-700/50">
              <h2 className="text-xl font-bold text-white mb-4">Upcoming Sessions</h2>
              <div className="space-y-4">
                {[
                  { title: "Resume Review", mentor: "Sarah Johnson", time: "Today, 3:00 PM" },
                  { title: "Mock Interview", mentor: "Michael Chen", time: "Tomorrow, 10:00 AM" }
                ].map((session, index) => (
                  <div key={index} className="flex items-center justify-between bg-slate-700/30 rounded-lg p-4 backdrop-blur-lg border border-slate-600/30">
                    <div>
                      <h3 className="text-white font-medium">{session.title}</h3>
                      <p className="text-slate-400 text-sm">with {session.mentor}</p>
                      <p className="text-violet-400 text-sm">{session.time}</p>
                    </div>
                    <InteractiveButton variant="primary" className="text-sm px-4 py-2">
                      Join
                    </InteractiveButton>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-br from-violet-600/20 to-cyan-600/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-lg rounded-2xl p-6 border border-slate-700/50">
              <h2 className="text-xl font-bold text-white mb-4">Recent Activity</h2>
              <div className="space-y-4">
                {[
                  { action: "Completed mock interview", time: "2 hours ago", icon: <CheckCircle className="w-5 h-5 text-green-400" /> },
                  { action: "Received resume feedback", time: "1 day ago", icon: <FileText className="w-5 h-5 text-blue-400" /> },
                  { action: "Started new course", time: "3 days ago", icon: <Award className="w-5 h-5 text-violet-400" /> }
                ].map((activity, index) => (
                  <div key={index} className="flex items-center gap-3">
                    {activity.icon}
                    <div>
                      <p className="text-white text-sm">{activity.action}</p>
                      <p className="text-slate-400 text-xs">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="relative">
      {currentPage === 'home' && <HomePage />}
      {currentPage === 'plans' && <PlansPage />}
      {currentPage === 'mentors' && <MentorsPage />}
      {currentPage === 'dashboard' && user && <Dashboard />}
      {showPayment && <PaymentModal />}
      
      <style jsx>{`
        @keyframes meteor {
          0% {
            transform: rotate(215deg) translateX(0);
            opacity: 1;
          }
          70% {
            opacity: 1;
          }
          100% {
            transform: rotate(215deg) translateX(-500px);
            opacity: 0;
          }
        }
        
        .animate-meteor {
          animation: meteor linear infinite;
        }
      `}</style>
    </div>
  );
};

export default MentorshipPlatform;