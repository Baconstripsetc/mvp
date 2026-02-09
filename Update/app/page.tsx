"use client"

import { useState } from "react"
import { ThankYouPage } from "@/components/onboarding/thank-you-page"
import { PricingPage } from "@/components/onboarding/pricing-page"
import { PaymentsPage } from "@/components/payments/payments-page"
import { SignupPage } from "@/components/auth/signup-page"
import { LoginPage } from "@/components/auth/login-page"
import { DashboardPage } from "@/components/dashboard/dashboard-page"
import { SettingsPage } from "@/components/settings/settings-page"
import { TermsPage } from "@/components/settings/terms-page"

type OnboardingStep = "thank-you" | "pricing" | "payments" | "signup" | "login" | "dashboard" | "settings" | "terms"

export default function Home() {
  const [currentStep, setCurrentStep] = useState<OnboardingStep>("thank-you")

  const handleThankYouContinue = () => {
    setCurrentStep("pricing")
  }

  const handlePricingContinue = () => {
    setCurrentStep("signup")
  }

  const handleSignupContinue = () => {
    setCurrentStep("dashboard")
  }

  const handleLoginContinue = () => {
    setCurrentStep("dashboard")
  }

  const handleSwitchToLogin = () => {
    setCurrentStep("login")
  }

  const handleSwitchToSignup = () => {
    setCurrentStep("signup")
  }

  const handleOpenSettings = () => {
    setCurrentStep("settings")
  }

  const handleViewTerms = () => {
    setCurrentStep("terms")
  }

  const handleSignOut = () => {
    setCurrentStep("thank-you")
  }

  const handleOpenPayments = () => {
    setCurrentStep("payments")
  }

  const handlePaymentsContinue = () => {
    setCurrentStep("signup")
  }

  const handleBack = () => {
    if (currentStep === "pricing") {
      setCurrentStep("thank-you")
    } else if (currentStep === "payments") {
      setCurrentStep("pricing")
    } else if (currentStep === "signup" || currentStep === "login") {
      setCurrentStep("pricing")
    } else if (currentStep === "settings") {
      setCurrentStep("dashboard")
    } else if (currentStep === "terms") {
      setCurrentStep("settings")
    }
  }

  return (
    <main className="min-h-screen">
      {currentStep === "thank-you" && (
        <ThankYouPage 
          onContinue={handleThankYouContinue} 
          onBack={() => {}} 
        />
      )}
      {currentStep === "pricing" && (
        <PricingPage 
          onContinue={handlePricingContinue} 
          onBack={handleBack}
        />
      )}
      {currentStep === "payments" && (
        <PaymentsPage 
          onContinue={handlePaymentsContinue} 
          onBack={handleBack}
        />
      )}
      {currentStep === "signup" && (
        <SignupPage 
          onContinue={handleSignupContinue} 
          onBack={handleBack}
          onSwitchToLogin={handleSwitchToLogin}
        />
      )}
      {currentStep === "login" && (
        <LoginPage 
          onContinue={handleLoginContinue} 
          onBack={handleBack}
          onSwitchToSignup={handleSwitchToSignup}
        />
      )}
      {currentStep === "dashboard" && (
        <DashboardPage onOpenSettings={handleOpenSettings} />
      )}
      {currentStep === "settings" && (
        <SettingsPage 
          onBack={handleBack}
          onViewTerms={handleViewTerms}
          onSignOut={handleSignOut}
        />
      )}
      {currentStep === "terms" && (
        <TermsPage onBack={handleBack} />
      )}
    </main>
  )
}
