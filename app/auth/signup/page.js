import { FormalSignupForm } from "../../../components/Signup/SignupForm";

export default function FormalSignUpPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '0.5s' }}></div>
        <div className="absolute top-1/4 right-1/3 w-64 h-64 bg-indigo-500/5 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1.5s' }}></div>
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: `
          linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
        `,
        backgroundSize: '50px 50px'
      }}></div>

      {/* Floating particles */}
      {[...Array(25)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-white/20 rounded-full animate-pulse"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${2 + Math.random() * 2}s`
          }}
        />
      ))}

      {/* Geometric patterns */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-32 h-32 border border-white/20 rotate-45 animate-spin" style={{ animationDuration: '25s' }}></div>
        <div className="absolute bottom-20 right-20 w-24 h-24 border border-blue-400/20 rotate-12 animate-pulse"></div>
        <div className="absolute top-1/3 right-1/4 w-16 h-16 border border-indigo-400/20 -rotate-12 animate-bounce" style={{ animationDuration: '4s' }}></div>
        <div className="absolute bottom-1/3 left-1/4 w-20 h-20 border border-blue-400/20 rotate-45 animate-spin" style={{ animationDuration: '15s' }}></div>
      </div>

      {/* Gradient orbs */}
      <div className="absolute top-10 right-10 w-40 h-40 bg-gradient-to-r from-blue-400/10 to-indigo-400/10 rounded-full blur-xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      <div className="absolute bottom-10 left-10 w-32 h-32 bg-gradient-to-r from-indigo-400/10 to-blue-400/10 rounded-full blur-xl animate-pulse" style={{ animationDelay: '3s' }}></div>

      {/* Main content */}
      <div className="relative z-10 w-full">
        <FormalSignupForm />
      </div>
    </div>
  );
}