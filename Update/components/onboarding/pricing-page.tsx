"use client"

import { useState } from "react"
import { ArrowLeft, X, Check, Unlock, Bell, Crown } from "lucide-react"
import Image from "next/image"

interface PricingPageProps {
  onContinue: () => void
  onBack: () => void
  onClose?: () => void
}

export function PricingPage({ onContinue, onBack, onClose }: PricingPageProps) {
  const [selectedPlan, setSelectedPlan] = useState<"monthly" | "yearly">("yearly")

  // Calculate billing date (3 days from today)
  const billingDate = new Date()
  billingDate.setDate(billingDate.getDate() + 3)
  const formattedBillingDate = billingDate.toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  })

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Header */}
      <div className="flex items-center justify-between p-4">
        <button
          onClick={onBack}
          className="flex h-10 w-10 items-center justify-center text-muted-foreground transition-all hover:text-foreground"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        {onClose && (
          <button
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center text-muted-foreground transition-all hover:text-foreground"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 px-6">
        {selectedPlan === "yearly" ? (
          <>
            {/* Title */}
            <h1 className="mb-8 text-center text-3xl font-bold text-foreground text-balance">
              Start your 3-day FREE trial to continue.
            </h1>

            {/* Timeline */}
            <div className="mb-10">
              {/* Today */}
              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div 
                    className="flex h-10 w-10 items-center justify-center rounded-full"
                    style={{ background: "#FF9F76" }}
                  >
                    <Unlock className="h-5 w-5 text-white" />
                  </div>
                  <div className="h-16 w-1 rounded-full" style={{ background: "#FF9F76" }} />
                </div>
                <div className="pt-1">
                  <h3 className="font-semibold text-foreground">Today</h3>
                  <p className="text-sm text-muted-foreground">
                    Unlock all the app's features like AI calorie scanning and more.
                  </p>
                </div>
              </div>

              {/* In 2 Days */}
              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div 
                    className="flex h-10 w-10 items-center justify-center rounded-full"
                    style={{ background: "#FF9F76" }}
                  >
                    <Bell className="h-5 w-5 text-white" />
                  </div>
                  <div className="h-16 w-1 rounded-full bg-muted" />
                </div>
                <div className="pt-1">
                  <h3 className="font-semibold text-foreground">In 2 Days - Reminder</h3>
                  <p className="text-sm text-muted-foreground">
                    We'll send you a reminder that your trial is ending soon.
                  </p>
                </div>
              </div>

              {/* In 3 Days */}
              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                    <Crown className="h-5 w-5 text-muted-foreground" />
                  </div>
                </div>
                <div className="pt-1">
                  <h3 className="font-semibold text-foreground">In 3 Days - Billing Starts</h3>
                  <p className="text-sm text-muted-foreground">
                    You'll be charged on {formattedBillingDate} unless you cancel anytime before.
                  </p>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            {/* Monthly Plan Content */}
            <h1 className="mb-8 text-center text-3xl font-bold text-foreground text-balance">
              See what the label hides
            </h1>

            {/* Feature List */}
            <div className="mb-10 space-y-6">
              <div className="flex gap-4">
                <div 
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full"
                  style={{ background: "#FF9F76" }}
                >
                  <Check className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Reveal Invisible Toxins</h3>
                  <p className="text-sm text-muted-foreground">
                    Instantly detect heavy metals and neuro-triggers (like Red 40) that labels are legally allowed to omit.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div 
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full"
                  style={{ background: "#FF9F76" }}
                >
                  <Check className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Protect Their Potential</h3>
                  <p className="text-sm text-muted-foreground">
                    Shield your child from additives linked to hyperactivity, sleep disruption, and gut inflammation.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div 
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full"
                  style={{ background: "#FF9F76" }}
                >
                  <Check className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Zero Guesswork</h3>
                  <p className="text-sm text-muted-foreground">
                    Scan a "High Risk" item and get a lab-verified, safe alternative in under 2 seconds.
                  </p>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Pricing Options */}
      <div className="px-6 pb-4">
        <div className="flex gap-3">
          {/* Monthly */}
          <button
            onClick={() => setSelectedPlan("monthly")}
            className="flex-1 rounded-2xl p-4 transition-all"
            style={{
              background: selectedPlan === "monthly" ? "rgba(255, 255, 255, 0.9)" : "rgba(255, 255, 255, 0.5)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              border: selectedPlan === "monthly" ? "2px solid #1a1a1a" : "2px solid transparent",
            }}
          >
            <div className="text-left">
              <p className="text-sm text-muted-foreground">Monthly</p>
              <p className="text-lg font-bold text-foreground">$18.88<span className="text-sm font-normal">/mo</span></p>
            </div>
            <div className="mt-2 flex justify-end">
              <div 
                className={`flex h-6 w-6 items-center justify-center rounded-full border-2 ${
                  selectedPlan === "monthly" ? "border-foreground bg-foreground" : "border-muted-foreground"
                }`}
              >
                {selectedPlan === "monthly" && <Check className="h-4 w-4 text-white" />}
              </div>
            </div>
          </button>

          {/* Yearly */}
          <button
            onClick={() => setSelectedPlan("yearly")}
            className="relative flex-1 rounded-2xl p-4 transition-all"
            style={{
              background: selectedPlan === "yearly" ? "rgba(255, 255, 255, 0.9)" : "rgba(255, 255, 255, 0.5)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              border: selectedPlan === "yearly" ? "2px solid #1a1a1a" : "2px solid transparent",
            }}
          >
            {/* 3 Days Free Badge */}
            <div 
              className="absolute -top-3 right-4 rounded-full px-3 py-1 text-xs font-semibold text-white"
              style={{ background: "#1a1a1a" }}
            >
              3 DAYS FREE
            </div>
            <div className="text-left">
              <p className="text-sm text-muted-foreground">Yearly</p>
              <p className="text-lg font-bold text-foreground">$62.88<span className="text-sm font-normal">/yr</span></p>
              <p className="text-xs text-[#FF9F76] font-medium mt-1">Pay Just $0.17c per day</p>
              <p className="text-xs text-green-600 font-medium">Save $163.68</p>
            </div>
            <div className="mt-2 flex justify-end">
              <div 
                className={`flex h-6 w-6 items-center justify-center rounded-full border-2 ${
                  selectedPlan === "yearly" ? "border-foreground bg-foreground" : "border-muted-foreground"
                }`}
              >
                {selectedPlan === "yearly" && <Check className="h-4 w-4 text-white" />}
              </div>
            </div>
          </button>
        </div>
      </div>

      {/* No Payment Due */}
      <div className="flex items-center justify-center gap-2 pb-4">
        <Check className="h-4 w-4 text-foreground" />
        <span className="text-sm font-medium text-foreground">No Payment Due Now</span>
      </div>

      {/* CTA Button */}
      <div className="px-6 pb-4">
        <button
          onClick={onContinue}
          className="w-full rounded-2xl py-4 text-lg font-semibold text-white transition-all hover:opacity-90"
          style={{ background: "#FF9F76" }}
        >
          {selectedPlan === "yearly" ? "Start Your 3-Day Free Trial" : "Get Started"}
        </button>
      </div>

      {/* Footer text */}
      <p className="pb-8 text-center text-sm text-muted-foreground">
        {selectedPlan === "yearly" 
          ? "3 days free, then $62.88 per year ($5.24/mo)"
          : "3 days free, then $18.88 per month"
        }
      </p>
    </div>
  )
}
