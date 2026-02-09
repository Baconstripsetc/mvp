"use client"

import { useState } from "react"
import { ArrowLeft, User, Lock, CreditCard, FileText, LogOut, Trash2, ChevronRight } from "lucide-react"
import Image from "next/image"

interface SettingsPageProps {
  onBack: () => void
  onViewTerms: () => void
  onSignOut: () => void
}

export function SettingsPage({ onBack, onViewTerms, onSignOut }: SettingsPageProps) {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [childAge, setChildAge] = useState(8)
  const [isEditingAge, setIsEditingAge] = useState(false)

  const handleDeleteAccount = () => {
    // Handle account deletion
    console.log("[v0] Deleting account...")
    onSignOut()
  }

  const handleCancelSubscription = () => {
    // Handle subscription cancellation
    console.log("[v0] Canceling subscription...")
  }

  const handleUpdateAge = () => {
    setIsEditingAge(false)
    console.log("[v0] Updated child age to:", childAge)
  }

  return (
    <div className="flex min-h-screen flex-col" style={{ background: "linear-gradient(180deg, #f5f0ed 0%, #fff 100%)" }}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 pb-6">
        <button
          onClick={onBack}
          className="flex h-10 w-10 items-center justify-center text-muted-foreground transition-all hover:text-foreground"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <h1 className="text-xl font-bold text-foreground">Settings</h1>
        <div className="w-10" />
      </div>

      {/* Content */}
      <div className="flex-1 px-4 pb-8">
        {/* Profile Section */}
        <div className="mb-6">
          <div className="mb-3 flex items-center justify-center">
            <div className="relative h-20 w-20">
              <Image
                src="/images/sana-logo.jpeg"
                alt="Profile"
                fill
                className="rounded-full object-cover"
              />
            </div>
          </div>
          <h2 className="text-center text-lg font-semibold text-foreground">Sarah Johnson</h2>
          <p className="text-center text-sm text-muted-foreground">sarah.johnson@email.com</p>
        </div>

        {/* Account Details Section */}
        <div
          className="mb-4 overflow-hidden rounded-2xl"
          style={{
            background: "rgba(255, 255, 255, 0.7)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: "1px solid rgba(255, 255, 255, 0.8)",
          }}
        >
          <h3 className="px-4 pt-4 text-sm font-semibold text-muted-foreground">ACCOUNT</h3>
          
          {/* User Details */}
          <button className="flex w-full items-center justify-between px-4 py-4 transition-all hover:bg-muted/20">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full" style={{ background: "rgba(255, 159, 118, 0.15)" }}>
                <User className="h-5 w-5" style={{ color: "#FF9F76" }} />
              </div>
              <div className="text-left">
                <p className="font-medium text-foreground">User Details</p>
                <p className="text-xs text-muted-foreground">Manage your profile information</p>
              </div>
            </div>
            <ChevronRight className="h-5 w-5 text-muted-foreground" />
          </button>

          <div className="h-px bg-muted/20" />

          {/* Change Password */}
          <button className="flex w-full items-center justify-between px-4 py-4 transition-all hover:bg-muted/20">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full" style={{ background: "rgba(255, 159, 118, 0.15)" }}>
                <Lock className="h-5 w-5" style={{ color: "#FF9F76" }} />
              </div>
              <div className="text-left">
                <p className="font-medium text-foreground">Change Password</p>
                <p className="text-xs text-muted-foreground">Update your password</p>
              </div>
            </div>
            <ChevronRight className="h-5 w-5 text-muted-foreground" />
          </button>
        </div>

        {/* Subscription Section */}
        <div
          className="mb-4 overflow-hidden rounded-2xl"
          style={{
            background: "rgba(255, 255, 255, 0.7)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: "1px solid rgba(255, 255, 255, 0.8)",
          }}
        >
          <h3 className="px-4 pt-4 text-sm font-semibold text-muted-foreground">SUBSCRIPTION</h3>
          
          {/* Subscription Info */}
          <div className="px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full" style={{ background: "rgba(255, 159, 118, 0.15)" }}>
                  <CreditCard className="h-5 w-5" style={{ color: "#FF9F76" }} />
                </div>
                <div className="text-left">
                  <p className="font-medium text-foreground">Yearly Plan</p>
                  <p className="text-xs text-muted-foreground">$62.88/year - Active</p>
                </div>
              </div>
            </div>
          </div>

          <div className="h-px bg-muted/20" />

          {/* Child Age */}
          <div className="px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="text-left">
                <p className="font-medium text-foreground">Child Age</p>
                <p className="text-xs text-muted-foreground">Update for personalized recommendations</p>
              </div>
              {isEditingAge ? (
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={childAge}
                    onChange={(e) => setChildAge(Number.parseInt(e.target.value))}
                    className="w-16 rounded-lg border border-muted px-2 py-1 text-center text-sm"
                    min="1"
                    max="18"
                  />
                  <button
                    onClick={handleUpdateAge}
                    className="rounded-lg px-3 py-1 text-xs font-semibold text-white"
                    style={{ background: "#FF9F76" }}
                  >
                    Save
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setIsEditingAge(true)}
                  className="flex items-center gap-2 text-sm font-medium"
                  style={{ color: "#FF9F76" }}
                >
                  {childAge} years
                  <ChevronRight className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>

          <div className="h-px bg-muted/20" />

          {/* Cancel Subscription */}
          <button
            onClick={handleCancelSubscription}
            className="flex w-full items-center justify-between px-4 py-4 transition-all hover:bg-muted/20"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-50">
                <Trash2 className="h-5 w-5 text-red-500" />
              </div>
              <div className="text-left">
                <p className="font-medium text-red-600">Cancel Subscription</p>
                <p className="text-xs text-muted-foreground">End your subscription</p>
              </div>
            </div>
            <ChevronRight className="h-5 w-5 text-muted-foreground" />
          </button>
        </div>

        {/* Legal Section */}
        <div
          className="mb-4 overflow-hidden rounded-2xl"
          style={{
            background: "rgba(255, 255, 255, 0.7)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: "1px solid rgba(255, 255, 255, 0.8)",
          }}
        >
          <h3 className="px-4 pt-4 text-sm font-semibold text-muted-foreground">LEGAL</h3>
          
          {/* Terms of Service */}
          <button
            onClick={onViewTerms}
            className="flex w-full items-center justify-between px-4 py-4 transition-all hover:bg-muted/20"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full" style={{ background: "rgba(255, 159, 118, 0.15)" }}>
                <FileText className="h-5 w-5" style={{ color: "#FF9F76" }} />
              </div>
              <div className="text-left">
                <p className="font-medium text-foreground">Terms & Privacy</p>
                <p className="text-xs text-muted-foreground">View our terms and policies</p>
              </div>
            </div>
            <ChevronRight className="h-5 w-5 text-muted-foreground" />
          </button>
        </div>

        {/* Sign Out Button */}
        <button
          onClick={onSignOut}
          className="mb-4 flex w-full items-center justify-center gap-2 rounded-2xl py-4 transition-all hover:opacity-90"
          style={{
            background: "rgba(255, 255, 255, 0.7)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: "1px solid rgba(255, 255, 255, 0.8)",
          }}
        >
          <LogOut className="h-5 w-5 text-foreground" />
          <span className="font-semibold text-foreground">Sign Out</span>
        </button>

        {/* Delete Account */}
        {!showDeleteConfirm ? (
          <button
            onClick={() => setShowDeleteConfirm(true)}
            className="w-full rounded-2xl py-4 text-sm font-medium text-red-600 transition-all hover:bg-red-50"
          >
            Delete Account
          </button>
        ) : (
          <div
            className="rounded-2xl p-4"
            style={{
              background: "rgba(255, 59, 48, 0.1)",
              border: "1px solid rgba(255, 59, 48, 0.2)",
            }}
          >
            <p className="mb-3 text-sm font-semibold text-red-600">Are you sure?</p>
            <p className="mb-4 text-xs text-muted-foreground">
              This will permanently delete your account and all associated data. This action cannot be undone.
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="flex-1 rounded-xl py-2 text-sm font-medium text-foreground"
                style={{ background: "rgba(255, 255, 255, 0.9)" }}
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteAccount}
                className="flex-1 rounded-xl py-2 text-sm font-semibold text-white"
                style={{ background: "#FF3B30" }}
              >
                Delete
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
