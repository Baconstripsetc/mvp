"use client"

import React, { useState, useEffect } from "react"
import { ArrowLeft, Clock, X } from "lucide-react"
import Image from "next/image"

interface PaymentsPageProps {
  onContinue: () => void
  onBack: () => void
}

export function PaymentsPage({ onContinue, onBack }: PaymentsPageProps) {
  const [showOfferModal, setShowOfferModal] = useState(false)
  const [showDeclineModal, setShowDeclineModal] = useState(false)
  const [timeLeft, setTimeLeft] = useState(120) // 2 minutes in seconds

  useEffect(() => {
    if (showOfferModal && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1)
      }, 1000)
      return () => clearInterval(timer)
    }
  }, [showOfferModal, timeLeft])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const handleContinueWithFree = () => {
    setShowOfferModal(true)
  }

  const handleAcceptOffer = () => {
    // Process payment for $48/year offer
    setShowOfferModal(false)
    onContinue()
  }

  const handleDeclineOffer = () => {
    setShowOfferModal(false)
    setShowDeclineModal(true)
  }

  const handleFinalDecline = () => {
    setShowDeclineModal(false)
    onContinue()
  }

  const handleTakeOffer = () => {
    setShowDeclineModal(false)
    setShowOfferModal(true)
  }

  return (
    <>
      <div className="flex min-h-screen flex-col bg-background">
        {/* Header */}
        <div className="flex items-center justify-between p-4">
          <button
            onClick={onBack}
            className="flex h-10 w-10 items-center justify-center text-muted-foreground transition-all hover:text-foreground"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col items-center justify-center px-6">
          {/* Logo */}
          <div className="mb-8 flex justify-center">
            <div className="relative h-24 w-24">
              <Image
                src="/images/sana-logo.jpeg"
                alt="Sana Logo"
                fill
                className="object-contain"
              />
            </div>
          </div>

          {/* Title */}
          <h1 className="mb-3 text-center text-4xl font-bold text-foreground text-balance">
            Choose Your Plan
          </h1>
          <p className="mb-12 text-center text-muted-foreground">
            Start protecting your family's health today
          </p>

          {/* Plan Cards */}
          <div className="mb-6 w-full max-w-md space-y-4">
            {/* Premium Plan */}
            <div
              className="rounded-3xl p-6"
              style={{
                background: "rgba(255, 255, 255, 0.7)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                border: "2px solid #FF9F76",
              }}
            >
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-foreground">Premium</h3>
                  <p className="text-sm text-muted-foreground">Full access to all features</p>
                </div>
                <div 
                  className="rounded-full px-3 py-1 text-xs font-semibold text-white"
                  style={{ background: "#FF9F76" }}
                >
                  Best Value
                </div>
              </div>
              
              <div className="mb-4">
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-foreground">$62.88</span>
                  <span className="text-muted-foreground">/year</span>
                </div>
                <p className="mt-1 text-sm" style={{ color: "#FF9F76" }}>
                  Pay just $0.17 per day • Save $163.68
                </p>
              </div>

              <ul className="mb-6 space-y-3">
                <li className="flex items-start gap-3">
                  <div 
                    className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full"
                    style={{ background: "#FF9F76" }}
                  >
                    <span className="text-xs text-white">✓</span>
                  </div>
                  <span className="text-sm text-foreground">Unlimited food scans</span>
                </li>
                <li className="flex items-start gap-3">
                  <div 
                    className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full"
                    style={{ background: "#FF9F76" }}
                  >
                    <span className="text-xs text-white">✓</span>
                  </div>
                  <span className="text-sm text-foreground">Toxin detection & alerts</span>
                </li>
                <li className="flex items-start gap-3">
                  <div 
                    className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full"
                    style={{ background: "#FF9F76" }}
                  >
                    <span className="text-xs text-white">✓</span>
                  </div>
                  <span className="text-sm text-foreground">Healthy alternative recommendations</span>
                </li>
                <li className="flex items-start gap-3">
                  <div 
                    className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full"
                    style={{ background: "#FF9F76" }}
                  >
                    <span className="text-xs text-white">✓</span>
                  </div>
                  <span className="text-sm text-foreground">Family sharing & notes</span>
                </li>
              </ul>

              <button
                className="w-full rounded-2xl py-4 text-lg font-semibold text-white transition-all hover:opacity-90"
                style={{ background: "#FF9F76" }}
              >
                Subscribe Now
              </button>
            </div>

            {/* Free Plan */}
            <div
              className="rounded-3xl p-6"
              style={{
                background: "rgba(255, 255, 255, 0.7)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                border: "1px solid rgba(255, 255, 255, 0.8)",
              }}
            >
              <div className="mb-4">
                <h3 className="text-xl font-bold text-foreground">Free</h3>
                <p className="text-sm text-muted-foreground">Limited features</p>
              </div>
              
              <div className="mb-4">
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-foreground">$0</span>
                  <span className="text-muted-foreground">/forever</span>
                </div>
              </div>

              <ul className="mb-6 space-y-3">
                <li className="flex items-start gap-3">
                  <div 
                    className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-muted"
                  >
                    <span className="text-xs text-muted-foreground">✓</span>
                  </div>
                  <span className="text-sm text-muted-foreground">5 food scans per month</span>
                </li>
                <li className="flex items-start gap-3">
                  <div 
                    className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-muted"
                  >
                    <span className="text-xs text-muted-foreground">✓</span>
                  </div>
                  <span className="text-sm text-muted-foreground">Basic toxin detection</span>
                </li>
              </ul>

              <button
                onClick={handleContinueWithFree}
                className="w-full rounded-2xl py-4 text-lg font-semibold transition-all hover:opacity-90"
                style={{
                  background: "rgba(255, 255, 255, 0.9)",
                  border: "2px solid #FF9F76",
                  color: "#FF9F76",
                }}
              >
                Continue with Free
              </button>
            </div>
          </div>

          {/* Trust Message */}
          <p className="text-center text-xs text-muted-foreground">
            Cancel anytime • No hidden fees • Secure checkout
          </p>
        </div>
      </div>

      {/* One-Time Offer Modal */}
      {showOfferModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div
            className="relative w-full max-w-md rounded-3xl p-8"
            style={{
              background: "rgba(255, 255, 255, 0.95)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
            }}
          >
            <button
              onClick={handleDeclineOffer}
              className="absolute right-4 top-4 text-muted-foreground transition-all hover:text-foreground"
            >
              <X className="h-6 w-6" />
            </button>

            {/* Icon */}
            <div className="mb-6 flex justify-center">
              <div
                className="flex h-20 w-20 items-center justify-center rounded-full"
                style={{ background: "rgba(255, 159, 118, 0.15)" }}
              >
                <Clock className="h-10 w-10" style={{ color: "#FF9F76" }} />
              </div>
            </div>

            {/* Title */}
            <h2 className="mb-3 text-center text-3xl font-bold text-foreground text-balance">
              Wait! One-Time Offer
            </h2>

            {/* Timer */}
            <div className="mb-6 text-center">
              <div
                className="mx-auto inline-block rounded-2xl px-6 py-3 text-4xl font-bold"
                style={{ background: "rgba(255, 159, 118, 0.1)", color: "#FF9F76" }}
              >
                {formatTime(timeLeft)}
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                This offer expires in {formatTime(timeLeft)}
              </p>
            </div>

            {/* Offer Details */}
            <div
              className="mb-6 rounded-2xl p-6"
              style={{ background: "rgba(255, 159, 118, 0.1)" }}
            >
              <div className="mb-4 text-center">
                <div className="mb-2 text-5xl font-bold text-foreground">
                  $48<span className="text-2xl">/year</span>
                </div>
                <p className="text-lg font-semibold" style={{ color: "#FF9F76" }}>
                  Just $4 per month
                </p>
              </div>

              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <div 
                    className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full"
                    style={{ background: "#FF9F76" }}
                  >
                    <span className="text-xs text-white">✓</span>
                  </div>
                  <span className="text-sm text-foreground">Everything in Premium</span>
                </li>
                <li className="flex items-start gap-3">
                  <div 
                    className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full"
                    style={{ background: "#FF9F76" }}
                  >
                    <span className="text-xs text-white">✓</span>
                  </div>
                  <span className="text-sm text-foreground">Special one-time pricing</span>
                </li>
                <li className="flex items-start gap-3">
                  <div 
                    className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full"
                    style={{ background: "#FF9F76" }}
                  >
                    <span className="text-xs text-white">✓</span>
                  </div>
                  <span className="text-sm text-foreground">Cancel anytime</span>
                </li>
              </ul>
            </div>

            {/* CTA */}
            <button
              onClick={handleAcceptOffer}
              className="w-full rounded-2xl py-4 text-lg font-semibold text-white transition-all hover:opacity-90"
              style={{ background: "#FF9F76" }}
            >
              Claim This Offer
            </button>

            <p className="mt-4 text-center text-xs text-muted-foreground">
              This offer won't be shown again
            </p>
          </div>
        </div>
      )}

      {/* Decline Confirmation Modal */}
      {showDeclineModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div
            className="relative w-full max-w-md rounded-3xl p-8"
            style={{
              background: "rgba(255, 255, 255, 0.95)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
            }}
          >
            {/* Icon */}
            <div className="mb-6 flex justify-center">
              <div className="text-6xl">⚠️</div>
            </div>

            {/* Title */}
            <h2 className="mb-3 text-center text-2xl font-bold text-foreground text-balance">
              Are you sure?
            </h2>
            <p className="mb-8 text-center text-muted-foreground">
              You won't see this $48/year offer again. This is your last chance to get premium features at this special price.
            </p>

            {/* Buttons */}
            <div className="space-y-3">
              <button
                onClick={handleTakeOffer}
                className="w-full rounded-2xl py-4 text-lg font-semibold text-white transition-all hover:opacity-90"
                style={{ background: "#22c55e" }}
              >
                Take One Time Offer
              </button>
              <button
                onClick={handleFinalDecline}
                className="w-full rounded-2xl py-4 text-lg font-semibold text-white transition-all hover:opacity-90"
                style={{ background: "#ef4444" }}
              >
                Yes, Decline
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
