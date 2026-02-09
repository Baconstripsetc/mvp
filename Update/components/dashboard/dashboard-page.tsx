"use client"

import { useState } from "react"
import { Home, BarChart3, Settings, Plus, Flame } from "lucide-react"
import Image from "next/image"

const DAYS = [
  { day: "Wed", date: 28 },
  { day: "Thu", date: 29 },
  { day: "Fri", date: 30 },
  { day: "Sat", date: 31 },
  { day: "Sun", date: 1 },
  { day: "Mon", date: 2 },
  { day: "Tue", date: 3 },
]

interface DashboardPageProps {
  onOpenSettings?: () => void
}

export function DashboardPage({ onOpenSettings }: DashboardPageProps) {
  const [activeTab, setActiveTab] = useState<"home" | "progress" | "settings">("home")
  const [selectedDate, setSelectedDate] = useState(2)
  const [streak, setStreak] = useState(0)

  const caloriesLeft = 2494
  const proteinLeft = 166
  const carbsLeft = 301
  const fatsLeft = 69

  return (
    <div className="flex min-h-screen flex-col" style={{ background: "linear-gradient(180deg, #f5f0ed 0%, #fff 100%)" }}>
      {/* Header */}
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-2">
          <Image
            src="/images/sana-logo.jpeg"
            alt="Sana Logo"
            width={32}
            height={32}
            className="object-contain"
          />
          <span className="text-xl font-bold text-foreground">Sana</span>
        </div>
        <div 
          className="flex items-center gap-1 rounded-full px-3 py-1.5"
          style={{
            background: "rgba(255, 255, 255, 0.8)",
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
          }}
        >
          <Flame className="h-4 w-4" style={{ color: "#FF9F76" }} />
          <span className="text-sm font-semibold text-foreground">{streak}</span>
        </div>
      </div>

      {/* Date Selector */}
      <div className="flex justify-between px-4 pb-4">
        {DAYS.map((item) => (
          null
        ))}
      </div>

      {/* Main Content */}
      <div className="flex-1 px-4 pb-24">
        {/* Healthier Options Card */}
        <div
          className="mb-4 rounded-3xl p-6"
          style={{
            background: "rgba(255, 255, 255, 0.7)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: "1px solid rgba(255, 255, 255, 0.8)",
          }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-5xl font-bold text-foreground">{proteinLeft}</p>
              <p className="text-sm font-semibold text-foreground">Healthier options found</p>
            </div>
            <div 
              className="flex h-20 w-20 items-center justify-center rounded-full border-4 border-muted/50"
              style={{
                background: "rgba(255, 159, 118, 0.15)",
              }}
            >
              <span className="text-3xl">✓</span>
            </div>
          </div>
        </div>

        {/* Shareable Notes Card */}
        <div
          className="mb-4 rounded-3xl p-6"
          style={{
            background: "rgba(255, 255, 255, 0.7)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: "1px solid rgba(255, 255, 255, 0.8)",
          }}
        >
          <h3 className="mb-3 text-lg font-semibold text-foreground">Share with your partner</h3>
          <div className="rounded-xl p-4" style={{ background: "rgba(255, 159, 118, 0.1)" }}>
            <p className="text-sm leading-relaxed text-foreground">
              Hey! Found some great alternatives today. The snacks we usually buy have Red 40 - switching to these healthier options! 🌟
            </p>
          </div>
          <button
            className="mt-3 w-full rounded-xl py-2.5 text-sm font-semibold text-white transition-all hover:opacity-90"
            style={{ background: "#FF9F76" }}
          >
            Share Note
          </button>
        </div>

        {/* Macros Grid */}
        <div className="mb-6 grid grid-cols-2 gap-3">
          {/* Toxic Ingredients Avoided */}
          <div
            className="rounded-2xl p-4"
            style={{
              background: "rgba(255, 255, 255, 0.7)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              border: "1px solid rgba(255, 255, 255, 0.8)",
            }}
          >
            <p className="text-2xl font-bold text-foreground">{carbsLeft}</p>
            <p className="text-xs text-muted-foreground">Toxic Ingredients <span className="font-semibold text-foreground">Avoided</span></p>
            <div className="mt-3 flex justify-center">
              <div 
                className="flex h-12 w-12 items-center justify-center rounded-full"
                style={{ background: "rgba(255, 186, 118, 0.15)" }}
              >
                <span className="text-lg">🚫</span>
              </div>
            </div>
          </div>

          {/* Days Healthy */}
          <div
            className="rounded-2xl p-4"
            style={{
              background: "rgba(255, 255, 255, 0.7)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              border: "1px solid rgba(255, 255, 255, 0.8)",
            }}
          >
            <p className="text-2xl font-bold text-foreground">{fatsLeft}</p>
            <p className="text-xs text-muted-foreground">Days <span className="font-semibold text-foreground">Healthy</span></p>
            <div className="mt-3 flex justify-center">
              <div 
                className="flex h-12 w-12 items-center justify-center rounded-full"
                style={{ background: "rgba(255, 159, 118, 0.15)" }}
              >
                <Flame className="h-6 w-6" style={{ color: "#FF9F76" }} />
              </div>
            </div>
          </div>
        </div>

        {/* Pagination dots */}
        

        {/* Recently Uploaded */}
        <h2 className="mb-3 text-lg font-semibold text-foreground">Recently uploaded</h2>
        <div
          className="rounded-2xl p-6"
          style={{
            background: "rgba(255, 255, 255, 0.7)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: "1px solid rgba(255, 255, 255, 0.8)",
          }}
        >
          <div className="flex items-center justify-center">
            <div 
              className="flex items-center gap-4 rounded-xl px-6 py-3"
              style={{ background: "rgba(245, 240, 237, 0.8)" }}
            >
              <span className="text-3xl">🥗</span>
              <div className="flex flex-col gap-1">
                <div className="h-2 w-32 rounded-full bg-muted" />
                <div className="h-2 w-20 rounded-full bg-muted" />
              </div>
            </div>
          </div>
          <p className="mt-4 text-center text-sm text-muted-foreground">
            Tap + to add your first meal of the day
          </p>
        </div>
      </div>

      {/* Floating Action Button */}
      <button
        className="fixed bottom-24 right-6 flex h-14 w-14 items-center justify-center rounded-full shadow-lg transition-all hover:scale-105"
        style={{ background: "#1a1a1a" }}
      >
        <Plus className="h-6 w-6 text-white" />
      </button>

      {/* Bottom Navigation */}
      <div
        className="fixed bottom-0 left-0 right-0 flex items-center justify-around pb-8 pt-4"
        style={{
          background: "rgba(255, 255, 255, 0.9)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderTop: "1px solid rgba(0, 0, 0, 0.05)",
        }}
      >
        <button
          onClick={() => setActiveTab("home")}
          className="flex flex-col items-center gap-1"
        >
          <Home 
            className={`h-6 w-6 ${activeTab === "home" ? "text-foreground" : "text-muted-foreground"}`} 
          />
          <span className={`text-xs ${activeTab === "home" ? "text-foreground font-medium" : "text-muted-foreground"}`}>
            Home
          </span>
        </button>
        
        <button
          onClick={() => {
            setActiveTab("settings")
            onOpenSettings?.()
          }}
          className="flex flex-col items-center gap-1"
        >
          <Settings 
            className={`h-6 w-6 ${activeTab === "settings" ? "text-foreground" : "text-muted-foreground"}`} 
          />
          <span className={`text-xs ${activeTab === "settings" ? "text-foreground font-medium" : "text-muted-foreground"}`}>
            Settings
          </span>
        </button>
      </div>
    </div>
  )
}
