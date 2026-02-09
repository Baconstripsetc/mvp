"use client"

import React from "react"

import { useState } from "react"
import { ArrowLeft, Mail } from "lucide-react"
import Image from "next/image"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"

interface SignupPageProps {
  onContinue: () => void
  onBack: () => void
  onSwitchToLogin: () => void
}

export function SignupPage({ onContinue, onBack, onSwitchToLogin }: SignupPageProps) {
  const [step, setStep] = useState<"email" | "otp">("email")
  const [email, setEmail] = useState("")
  const [otp, setOtp] = useState("")

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Send OTP to email
    setStep("otp")
  }

  const handleGoogleSignup = () => {
    // Handle Google One Tap
    onContinue()
  }

  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Verify OTP and proceed
    onContinue()
  }

  const handleBackButton = () => {
    if (step === "otp") {
      setStep("email")
    } else {
      onBack()
    }
  }

  if (step === "otp") {
    return (
      <div className="flex min-h-screen flex-col bg-background">
        {/* Header */}
        <div className="flex items-center justify-between p-4">
          <button
            onClick={handleBackButton}
            className="flex h-10 w-10 items-center justify-center text-muted-foreground transition-all hover:text-foreground"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col items-center justify-center px-6">
          {/* Logo */}
          <div className="mb-8 flex justify-center">
            <div className="relative h-20 w-20">
              <Image
                src="/images/sana-logo.jpeg"
                alt="Sana Logo"
                fill
                className="object-contain"
              />
            </div>
          </div>

          {/* Title */}
          <h1 className="mb-3 text-center text-3xl font-bold text-foreground text-balance">
            Confirm your email
          </h1>
          <p className="mb-8 text-center text-muted-foreground">
            We sent a 4-digit code to{" "}
            <span className="font-semibold" style={{ color: "#FF9F76" }}>
              {email}
            </span>
          </p>

          {/* OTP Form */}
          <form onSubmit={handleOtpSubmit} className="w-full max-w-sm space-y-6">
            {/* OTP Input */}
            <div className="flex justify-center">
              <InputOTP maxLength={4} value={otp} onChange={setOtp}>
                <InputOTPGroup className="gap-3">
                  <InputOTPSlot 
                    index={0} 
                    className="h-14 w-14 rounded-xl text-xl font-semibold"
                    style={{
                      background: "rgba(255, 255, 255, 0.7)",
                      backdropFilter: "blur(20px)",
                      WebkitBackdropFilter: "blur(20px)",
                      border: "1px solid rgba(255, 255, 255, 0.8)",
                    }}
                  />
                  <InputOTPSlot 
                    index={1} 
                    className="h-14 w-14 rounded-xl text-xl font-semibold"
                    style={{
                      background: "rgba(255, 255, 255, 0.7)",
                      backdropFilter: "blur(20px)",
                      WebkitBackdropFilter: "blur(20px)",
                      border: "1px solid rgba(255, 255, 255, 0.8)",
                    }}
                  />
                  <InputOTPSlot 
                    index={2} 
                    className="h-14 w-14 rounded-xl text-xl font-semibold"
                    style={{
                      background: "rgba(255, 255, 255, 0.7)",
                      backdropFilter: "blur(20px)",
                      WebkitBackdropFilter: "blur(20px)",
                      border: "1px solid rgba(255, 255, 255, 0.8)",
                    }}
                  />
                  <InputOTPSlot 
                    index={3} 
                    className="h-14 w-14 rounded-xl text-xl font-semibold"
                    style={{
                      background: "rgba(255, 255, 255, 0.7)",
                      backdropFilter: "blur(20px)",
                      WebkitBackdropFilter: "blur(20px)",
                      border: "1px solid rgba(255, 255, 255, 0.8)",
                    }}
                  />
                </InputOTPGroup>
              </InputOTP>
            </div>

            {/* Resend Code */}
            <div className="text-center">
              <button
                type="button"
                className="text-sm font-medium transition-all hover:opacity-80"
                style={{ color: "#FF9F76" }}
              >
                Didn't receive code? Resend
              </button>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={otp.length < 4}
              className="w-full rounded-2xl py-4 text-lg font-semibold text-white transition-all hover:opacity-90 disabled:opacity-50"
              style={{ background: "#FF9F76" }}
            >
              Continue
            </button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Header */}
      <div className="flex items-center justify-between p-4">
        <button
          onClick={handleBackButton}
          className="flex h-10 w-10 items-center justify-center text-muted-foreground transition-all hover:text-foreground"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col items-center justify-center px-6">
        {/* Logo */}
        <div className="mb-8 flex justify-center">
          <div className="relative h-20 w-20">
            <Image
              src="/images/sana-logo.jpeg"
              alt="Sana Logo"
              fill
              className="object-contain"
            />
          </div>
        </div>

        {/* Title */}
        <h1 className="mb-3 text-center text-3xl font-bold text-foreground text-balance">
          Create your account
        </h1>
        <p className="mb-8 text-center text-muted-foreground">
          Start your journey to healthier eating
        </p>

        <div className="w-full max-w-sm space-y-4">
          {/* Google One Tap Button */}
          <button
            onClick={handleGoogleSignup}
            className="flex w-full items-center justify-center gap-3 rounded-2xl py-4 text-lg font-semibold transition-all hover:opacity-90"
            style={{
              background: "rgba(255, 255, 255, 0.9)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              border: "1px solid rgba(255, 255, 255, 0.8)",
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Continue with Google
          </button>

          {/* Divider */}
          <div className="flex items-center gap-4">
            <div className="h-px flex-1 bg-muted" />
            <span className="text-sm text-muted-foreground">or</span>
            <div className="h-px flex-1 bg-muted" />
          </div>

          {/* Email Form */}
          <form onSubmit={handleEmailSubmit} className="space-y-4">
            <div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-2xl px-4 py-4 text-lg transition-all focus:outline-none"
                style={{
                  background: "rgba(255, 255, 255, 0.7)",
                  backdropFilter: "blur(20px)",
                  WebkitBackdropFilter: "blur(20px)",
                  border: "1px solid rgba(255, 255, 255, 0.8)",
                }}
                onFocus={(e) => e.target.style.border = "2px solid #FF9F76"}
                onBlur={(e) => e.target.style.border = "1px solid rgba(255, 255, 255, 0.8)"}
                placeholder="Enter your email"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-2xl py-4 text-lg font-semibold text-white transition-all hover:opacity-90"
              style={{ background: "#FF9F76" }}
            >
              Continue
            </button>
          </form>

          {/* Terms */}
          <p className="text-center text-xs text-muted-foreground">
            By continuing, you agree to our{" "}
            <a href="#" className="font-medium underline" style={{ color: "#FF9F76" }}>
              Terms
            </a>{" "}
            and{" "}
            <a href="#" className="font-medium underline" style={{ color: "#FF9F76" }}>
              Privacy Policy
            </a>
          </p>
        </div>
      </div>

      {/* Login Link */}
      <div className="px-6 pb-8 text-center">
        <p className="text-sm text-muted-foreground">
          Already have an account?{" "}
          <button
            onClick={onSwitchToLogin}
            className="font-semibold underline transition-all hover:opacity-80"
            style={{ color: "#FF9F76" }}
          >
            Log In
          </button>
        </p>
      </div>
    </div>
  )
}
