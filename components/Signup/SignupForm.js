"use client";
import React, { useState } from "react";
import { Label } from "@/components/Signup/label";
import { Input } from "@/components/Signup/input";
import { cn } from "@/lib/utils";
import { useSession, signIn, signOut } from "next-auth/react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import {
  IconBrandGithub,
  IconBrandGoogle,
  IconLoader2,
  IconUserPlus,
  IconMail,
  IconLock,
  IconUser,
  IconEye,
  IconEyeOff,
  IconCheck,
  IconX,
} from "@tabler/icons-react";

export function FormalSignupForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const router = useRouter();

  React.useEffect(() => {
    setIsVisible(true);
  }, []);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  const watchPassword = watch("password", "");

  React.useEffect(() => {
    const calculateStrength = (password) => {
      let strength = 0;
      if (password.length >= 8) strength++;
      if (/[A-Z]/.test(password)) strength++;
      if (/[a-z]/.test(password)) strength++;
      if (/\d/.test(password)) strength++;
      if (/[^A-Za-z0-9]/.test(password)) strength++;
      return strength;
    };
    setPasswordStrength(calculateStrength(watchPassword));
  }, [watchPassword]);

  const onSubmit = async (data) => {
    setIsLoading(true);
    setMessage("");
    
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Registration failed");
      }

      setMessage("Account created successfully! Signing you in...");
      setMessageType("success");
      
      setTimeout(async () => {
        const signInResult = await signIn("credentials", {
          email: data.email,
          password: data.password,
          redirect: false,
        });

        if (signInResult?.ok) {
          router.push("/");
        }
      }, 2000);

    } catch (error) {
      setMessage(error.message);
      setMessageType("error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialSignIn = async (provider) => {
    setIsLoading(true);
    try {
      await signIn(provider, { 
        callbackUrl: "/",
        redirect: true 
      });
    } catch (error) {
      setMessage(`Failed to sign up with ${provider}. Please try again.`);
      setMessageType("error");
      setIsLoading(false);
    }
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrength <= 1) return "bg-red-500";
    if (passwordStrength <= 2) return "bg-orange-500";
    if (passwordStrength <= 3) return "bg-yellow-500";
    if (passwordStrength <= 4) return "bg-blue-500";
    return "bg-green-500";
  };

  const getPasswordStrengthText = () => {
    if (passwordStrength <= 1) return "Weak";
    if (passwordStrength <= 2) return "Fair";
    if (passwordStrength <= 3) return "Good";
    if (passwordStrength <= 4) return "Strong";
    return "Very Strong";
  };

  return (
    <div className={cn(
      "w-full max-w-md sm:max-w-lg mx-auto backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-6 md:p-8 shadow-2xl",
      "transform transition-all duration-1000 ease-out",
      isVisible 
        ? "translate-y-0 opacity-100 scale-100" 
        : "translate-y-12 opacity-0 scale-95"
    )}>
      {/* Header with animation */}
      <div className="text-center mb-6 sm:mb-8">
        <div className={cn(
          "inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl mb-3 sm:mb-4 shadow-lg",
          "transform transition-all duration-700 delay-300",
          isVisible ? "rotate-0 scale-100" : "rotate-180 scale-0"
        )}>
          <IconUserPlus className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
        </div>
        
        <h1 className={cn(
          "text-2xl sm:text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-2",
          "transform transition-all duration-700 delay-500",
          isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
        )}>
          Join Skill Sarthi
        </h1>
        
        <p className={cn(
          "text-gray-400 text-xs sm:text-sm",
          "transform transition-all duration-700 delay-700",
          isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
        )}>
          Create your account to unlock all features
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

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 sm:space-y-6">
        {/* Name Fields */}
        <div className={cn(
          "grid grid-cols-1 sm:grid-cols-2 gap-4",
          "transform transition-all duration-700 delay-900",
          isVisible ? "translate-x-0 opacity-100" : "translate-x-4 opacity-0"
        )}>
          <div>
            <Label htmlFor="firstName" className="text-gray-300 font-medium mb-2 block">
              First Name
            </Label>
            <div className="relative group">
              <IconUser className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-blue-400 transition-colors duration-200" />
              <Input
                id="firstName"
                type="text"
                placeholder="First name"
                disabled={isLoading}
                className={cn(
                  "pl-10 sm:pl-12 pr-4 py-2.5 sm:py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 text-sm sm:text-base",
                  "focus:border-blue-400/50 focus:bg-white/10 transition-all duration-200",
                  "hover:border-white/20 hover:bg-white/5",
                  errors.firstName && "border-red-400/50 focus:border-red-400/50"
                )}
                {...register("firstName", {
                  required: "First name is required",
                  minLength: {
                    value: 2,
                    message: "First name must be at least 2 characters"
                  }
                })}
              />
            </div>
            {errors.firstName && (
              <p className="text-red-400 text-xs mt-2 animate-in slide-in-from-left-1 duration-200">
                {errors.firstName.message}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="lastName" className="text-gray-300 font-medium mb-2 block">
              Last Name
            </Label>
            <div className="relative group">
              <IconUser className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-blue-400 transition-colors duration-200" />
              <Input
                id="lastName"
                type="text"
                placeholder="Last name"
                disabled={isLoading}
                className={cn(
                  "pl-10 sm:pl-12 pr-4 py-2.5 sm:py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 text-sm sm:text-base",
                  "focus:border-blue-400/50 focus:bg-white/10 transition-all duration-200",
                  "hover:border-white/20 hover:bg-white/5",
                  errors.lastName && "border-red-400/50 focus:border-red-400/50"
                )}
                {...register("lastName", {
                  required: "Last name is required",
                  minLength: {
                    value: 2,
                    message: "Last name must be at least 2 characters"
                  }
                })}
              />
            </div>
            {errors.lastName && (
              <p className="text-red-400 text-xs mt-2 animate-in slide-in-from-left-1 duration-200">
                {errors.lastName.message}
              </p>
            )}
          </div>
        </div>

        {/* Email Field */}
        <div className={cn(
          "transform transition-all duration-700 delay-1000",
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
                "pl-10 sm:pl-12 pr-4 py-2.5 sm:py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 text-sm sm:text-base",
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
          "transform transition-all duration-700 delay-1100",
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
              placeholder="Create a strong password"
              disabled={isLoading}
              className={cn(
                "pl-10 sm:pl-12 pr-10 sm:pr-12 py-2.5 sm:py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 text-sm sm:text-base",
                "focus:border-blue-400/50 focus:bg-white/10 transition-all duration-200",
                "hover:border-white/20 hover:bg-white/5",
                errors.password && "border-red-400/50 focus:border-red-400/50"
              )}
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters long",
                },
                pattern: {
                  value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/,
                  message: "Password must contain at least one letter and one number",
                },
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
          
          {/* Password Strength Indicator */}
          {watchPassword && (
            <div className="mt-3 space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-400">Password Strength</span>
                <span className={cn(
                  "text-xs font-medium",
                  passwordStrength <= 2 ? "text-red-400" : 
                  passwordStrength <= 3 ? "text-yellow-400" : "text-green-400"
                )}>
                  {getPasswordStrengthText()}
                </span>
              </div>
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className={cn(
                      "h-1 flex-1 rounded-full transition-all duration-300",
                      i < passwordStrength ? getPasswordStrengthColor() : "bg-gray-600"
                    )}
                  />
                ))}
              </div>
            </div>
          )}
          
          {errors.password && (
            <p className="text-red-400 text-xs mt-2 animate-in slide-in-from-left-1 duration-200">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Sign Up Button */}
        <div className={cn(
          "transform transition-all duration-700 delay-1200",
          isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
        )}>
          <button
            type="submit"
            disabled={isLoading || isSubmitting}
            className={cn(
              "w-full py-2.5 sm:py-3 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl text-sm sm:text-base",
              "hover:from-blue-700 hover:to-indigo-700 transform hover:scale-[1.02] active:scale-[0.98]",
              "transition-all duration-200 shadow-lg hover:shadow-xl",
              "disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none",
              "relative overflow-hidden group"
            )}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-400 opacity-0 group-hover:opacity-20 transition-opacity duration-200"></div>
            <div className="relative flex items-center justify-center gap-2">
              {isLoading && <IconLoader2 className="w-4 h-4 animate-spin" />}
              <span>{isLoading ? "Creating Account..." : "Create Account"}</span>
              {!isLoading && <IconUserPlus className="w-4 h-4" />}
            </div>
          </button>
        </div>

        {/* Divider */}
        <div className={cn(
          "relative my-6 sm:my-8",
          "transform transition-all duration-700 delay-1300",
          isVisible ? "scale-100 opacity-100" : "scale-95 opacity-0"
        )}>
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-600"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 text-gray-400">
              Or sign up with
            </span>
          </div>
        </div>

        {/* Social Login Buttons */}
        <div className={cn(
          "grid grid-cols-2 gap-4",
          "transform transition-all duration-700 delay-1400",
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

        {/* Sign In Link */}
        <div className={cn(
          "text-center sm:pt-6 border-t border-gray-700",
          "transform transition-all duration-700 delay-1500",
          isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
        )}>
          <p className="text-gray-400 text-xs sm:text-sm">
            Already have an account?{" "}
            <button
              type="button"
              onClick={() => router.push("/auth/signin")}
              className="text-blue-400 hover:text-blue-300 font-medium hover:underline transition-colors duration-200"
            >
              Sign in here
            </button>
          </p>
        </div>
      </form>
    </div>
  );
}