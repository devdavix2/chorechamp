"use client"

import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

interface SimpleWelcomeMessageProps {
  onClose: () => void
}

export function SimpleWelcomeMessage({ onClose }: SimpleWelcomeMessageProps) {
  return (
    <div className="fixed top-4 left-4 right-4 z-[100] md:left-auto md:right-4 md:w-96">
      <Card className="shadow-lg border-primary">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">Welcome to ChoreChamp!</CardTitle>
            <Button variant="ghost" size="icon" onClick={onClose} className="hover:bg-muted">
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </Button>
          </div>
        </CardHeader>
        <CardContent className="pb-2">
          <p className="text-sm">
            Turn household chores into a fun competition! Assign tasks, earn points, and track your progress on the
            leaderboard.
          </p>
        </CardContent>
        <CardFooter>
          <Button className="w-full" onClick={onClose}>
            Get Started
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

