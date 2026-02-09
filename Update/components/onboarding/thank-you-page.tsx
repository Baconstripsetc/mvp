"use client"

import { ArrowLeft, Lock } from "lucide-react"
import Image from "next/image"

interface ThankYouPageProps {
  onContinue: () => void
  onBack: () => void
}

export function ThankYouPage({ onContinue, onBack }: ThankYouPageProps) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Header */}
      <div className="flex items-center gap-4 p-4">
        <button
          onClick={onBack}
          className="flex h-12 w-12 items-center justify-center rounded-full bg-muted/80 backdrop-blur-xl transition-all hover:bg-muted"
        >
          <ArrowLeft className="h-5 w-5 text-foreground" />
        </button>
        {/* Progress bar */}
        <div className="flex flex-1 gap-1">
          <div className="h-1 flex-1 rounded-full" style={{ background: "#FF9F76" }} />
          <div className="h-1 flex-1 rounded-full bg-muted" />
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col items-center justify-center px-6">
        {/* Logo with gradient ring */}
        <div className="relative mb-8">
          <div 
            className="absolute inset-0 rounded-full"
            style={{
              background: "linear-gradient(135deg, #FFD4C2 0%, #FF9F76 50%, #E8F4FF 100%)",
              padding: "4px",
            }}
          />
          <div className="relative flex h-52 w-52 items-center justify-center rounded-full bg-white">
            <Image
              src="/images/sana-logo.jpeg"
              alt="Sana Logo"
              width={120}
              height={120}
              className="object-contain"
            />
          </div>
          {/* Decorative dots */}
          <div className="absolute -right-2 top-1/4 h-2 w-2 rounded-full bg-[#FF9F76]/30" />
          <div className="absolute -left-1 top-1/3 h-1.5 w-1.5 rounded-full bg-[#FF9F76]/40" />
          <div className="absolute bottom-1/4 right-0 h-1 w-1 rounded-full bg-[#FF9F76]/50" />
          <div className="absolute -bottom-1 left-1/4 h-2 w-2 rounded-full bg-[#FF9F76]/30" />
        </div>

        {/* Text */}
        <h1 className="mb-3 text-center text-3xl font-bold text-foreground text-balance">
          Thank you for trusting us!
        </h1>
        <p className="text-center text-muted-foreground">
          Now let's personalize Sana for you...
        </p>
      </div>

      {/* Privacy Card */}
      <div className="px-6 pb-6">
        <div 
          className="rounded-2xl p-6 text-center"
          style={{
            background: "rgba(255, 255, 255, 0.7)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: "1px solid rgba(255, 159, 118, 0.1)",
          }}
        >
          <div className="mb-3 flex justify-center">
            <div 
              className="flex h-10 w-10 items-center justify-center rounded-full"
              style={{ background: "linear-gradient(135deg, #FFD4C2 0%, #FF9F76 100%)" }}
            >
              <Lock className="h-5 w-5 text-white" />
            </div>
          </div>
          <h3 className="mb-2 font-semibold text-foreground">
            Your privacy and security matter to us.
          </h3>
          <p className="text-sm text-muted-foreground">
            We promise to always keep your personal information private and secure.
          </p>
        </div>
      </div>

      {/* Continue Button */}
      <div className="px-6 pb-8">
        <button
          onClick={onContinue}
          className="w-full rounded-2xl py-4 text-lg font-semibold text-white transition-all hover:opacity-90"
          style={{ background: "#FF9F76" }}
        >
          Continue
        </button>
      </div>
    </div>
  )
}
