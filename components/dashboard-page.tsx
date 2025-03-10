"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MainNav } from "@/components/main-nav"
import { UserNav } from "@/components/user-nav"
import { ChoresDashboard } from "@/components/chores-dashboard"
import { Leaderboard } from "@/components/leaderboard"
import { Achievements } from "@/components/achievements"
import { SimpleWelcomeMessage } from "@/components/simple-welcome-message"

export function DashboardPage() {
  const [showWelcome, setShowWelcome] = useState(true)

  return (
    <div className="flex min-h-screen flex-col">
      {/* Simple welcome message that doesn't rely on PWA functionality */}
      {showWelcome && <SimpleWelcomeMessage onClose={() => setShowWelcome(false)} />}

      <div className="border-b">
        <div className="flex h-16 items-center px-4">
          <MainNav />
          <div className="ml-auto flex items-center space-x-4">
            <UserNav />
          </div>
        </div>
      </div>
      <motion.div
        className="flex-1 space-y-4 p-4 md:p-8 pt-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">ChoreChamp Dashboard</h2>
        </div>
        <Tabs defaultValue="chores" className="space-y-4">
          <TabsList>
            <TabsTrigger value="chores">Chores</TabsTrigger>
            <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
          </TabsList>
          <TabsContent value="chores" className="space-y-4">
            <ChoresDashboard />
          </TabsContent>
          <TabsContent value="leaderboard" className="space-y-4">
            <Leaderboard />
          </TabsContent>
          <TabsContent value="achievements" className="space-y-4">
            <Achievements />
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  )
}

