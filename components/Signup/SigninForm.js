"use client";
import React, { useState } from "react";
import { Label } from "@/components/Signup/label";
import { Input } from "@/components/Signup/input";
import { cn } from "@/lib/utils";
import { signIn, getSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import {
  IconBrandGithub,
  IconBrandGoogle,
  IconLoader2,
  IconShield,
  IconMail,
  IconLock,
  IconEye,
  IconEyeOff,
} from "@tabler/icons-react";

export function FormalSigninForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const router = useRouter();

  React.useEffect(() => {
    setIsVisible(true);
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    setIsLoading(true);
    setMessage("");
    
    try {
      const result = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (result?.error) {
        setMessage("Invalid credentials. Please check your email and password.");
        setMessageType("error");
      } else if (result?.ok) {
        setMessage("Welcome back! Redirecting to dashboard...");
        setMessageType("success");
        
        setTimeout(() => {
          router.push("/");
        }, 1500);
      }
    } catch (error) {
      setMessage("An unexpected error occurred. Please try again.");
      setMessageType("error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialSignIn = async (provider) => {
    setIsLoading(true);
    try {
      const result = await signIn(provider, { 
        callbackUrl: "/",
        redirect: false 
      });
      
      if (result?.url) {
        window.location.href = result.url;
      }
    } catch (error) {
      setMessage(`Failed to sign in with ${provider}. Please try again.`);
      setMessageType("error");
      setIsLoading(false);
    }
  };

  return (
    <div className={cn(
      "max-w-md w-full mx-auto backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8 shadow-2xl",
      "transform transition-all duration-1000 ease-out",
      isVisible 
        ? "translate-y-0 opacity-100 scale-100" 
        : "translate-y-12 opacity-0 scale-95"
    )}>
      {/* Header with animation */}
      <div className="text-center mb-8">
        <div className={cn(
          "inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl mb-4 shadow-lg",
          "transform transition-all duration-700 delay-300",
          isVisible ? "rotate-0 scale-100" : "rotate-180 scale-0"
        )}>
          <IconShield className="w-8 h-8 text-white" />
        </div>
        
        <h1 className={cn(
          "text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-2",
          "transform transition-all duration-700 delay-500",
          isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
        )}>
          Welcome Back
        </h1>
        
        <p className={cn(
          "text-gray-400 text-sm",
          "transform transition-all duration-700 delay-700",
          isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
        )}>
          Sign in to access your Skill Sarthi account
        </p>
      </div>

      {/* Status Message */}
      {message && (
        <div className={cn(
          "mb-6 p-4 rounded-xl text-sm font-medium border backdrop-blur-sm",
          "animate-in slide-in-from-top-2 duration-300",
          messageType === "success" 
            ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
            : "bg-red-500/10 border-red-500/20 text-red-400"
        )}>
          <div className="flex items-center gap-2">
            {messageType === "success" ? "✓" : "⚠"} {message}
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Email Field */}
        <div className={cn(
          "transform transition-all duration-700 delay-900",
          isVisible ? "translate-x-0 opacity-100" : "translate-x-4 opacity-0"
        )}>
          <Label htmlFor="email" className="text-gray-300 font-medium mb-2 block">
            Email Address
          </Label>
          <div className="relative group">
            <IconMail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-blue-400 transition-colors duration-200" />
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              disabled={isLoading}
              className={cn(
                "pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400",
                "focus:border-blue-400/50 focus:bg-white/10 transition-all duration-200",
                "hover:border-white/20 hover:bg-white/5",
                errors.email && "border-red-400/50 focus:border-red-400/50"
              )}
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Please enter a valid email address",
                },
              })}
            />
          </div>
          {errors.email && (
            <p className="text-red-400 text-xs mt-2 animate-in slide-in-from-left-1 duration-200">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Password Field */}
        <div className={cn(
          "transform transition-all duration-700 delay-1000",
          isVisible ? "translate-x-0 opacity-100" : "translate-x-4 opacity-0"
        )}>
          <Label htmlFor="password" className="text-gray-300 font-medium mb-2 block">
            Password
          </Label>
          <div className="relative group">
            <IconLock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-blue-400 transition-colors duration-200" />
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              disabled={isLoading}
              className={cn(
                "pl-12 pr-12 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400",
                "focus:border-blue-400/50 focus:bg-white/10 transition-all duration-200",
                "hover:border-white/20 hover:bg-white/5",
                errors.password && "border-red-400/50 focus:border-red-400/50"
              )}
              {...register("password", {
                required: "Password is required",
              })}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors duration-200"
            >
              {showPassword ? <IconEyeOff className="w-5 h-5" /> : <IconEye className="w-5 h-5" />}
            </button>
          </div>
          {errors.password && (
            <p className="text-red-400 text-xs mt-2 animate-in slide-in-from-left-1 duration-200">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Sign In Button */}
        <div className={cn(
          "transform transition-all duration-700 delay-1100",
          isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
        )}>
          <button
            type="submit"
            disabled={isLoading || isSubmitting}
            className={cn(
              "w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl",
              "hover:from-blue-700 hover:to-purple-700 transform hover:scale-[1.02] active:scale-[0.98]",
              "transition-all duration-200 shadow-lg hover:shadow-xl",
              "disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none",
              "relative overflow-hidden group"
            )}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 opacity-0 group-hover:opacity-20 transition-opacity duration-200"></div>
            <div className="relative flex items-center justify-center gap-2">
              {isLoading && <IconLoader2 className="w-4 h-4 animate-spin" />}
              <span>{isLoading ? "Signing in..." : "Sign In"}</span>
              {!isLoading && <IconShield className="w-4 h-4" />}
            </div>
          </button>
        </div>

        {/* Divider */}
        <div className={cn(
          "relative my-8",
          "transform transition-all duration-700 delay-1200",
          isVisible ? "scale-100 opacity-100" : "scale-95 opacity-0"
        )}>
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-600"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 text-gray-400">
              Or continue with
            </span>
          </div>
        </div>

        {/* Social Login Buttons */}
        <div className={cn(
          "grid grid-cols-2 gap-4",
          "transform transition-all duration-700 delay-1300",
          isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
        )}>
          <button
            type="button"
            onClick={() => handleSocialSignIn("github")}
            disabled={isLoading}
            className={cn(
              "flex items-center justify-center gap-3 py-3 px-4 bg-white/5 border border-white/10 rounded-xl text-gray-300 font-medium",
              "hover:bg-white/10 hover:border-white/20 transform hover:scale-105 active:scale-95",
              "transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            )}
          >
            <IconBrandGithub className="w-5 h-5" />
            <span className="text-sm">GitHub</span>
          </button>

          <button
            type="button"
            onClick={() => handleSocialSignIn("google")}
            disabled={isLoading}
            className={cn(
              "flex items-center justify-center gap-3 py-3 px-4 bg-white/5 border border-white/10 rounded-xl text-gray-300 font-medium",
              "hover:bg-white/10 hover:border-white/20 transform hover:scale-105 active:scale-95",
              "transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            )}
          >
            <IconBrandGoogle className="w-5 h-5" />
            <span className="text-sm">Google</span>
          </button>
        </div>

        {/* Sign Up Link */}
        <div className={cn(
          "text-center pt-6 border-t border-gray-700",
          "transform transition-all duration-700 delay-1400",
          isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
        )}>
          <p className="text-gray-400 text-sm">
            Don't have an account?{" "}
            <button
              type="button"
              onClick={() => router.push("/auth/signup")}
              className="text-blue-400 hover:text-blue-300 font-medium hover:underline transition-colors duration-200"
            >
              Create one now
            </button>
          </p>
        </div>
      </form>
    </div>
  );
}