"use client"
import { X, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

interface PwaInstallPromptProps {
  onClose: () => void
}

export function PwaInstallPrompt({ onClose }: PwaInstallPromptProps) {
  // Simplified version that doesn't rely on actual PWA installation
  // This ensures the app works without installation

  const handleInstallClick = () => {
    // Simply close the prompt when clicked
    // In a real app, this would trigger the PWA installation
    onClose()
  }

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 md:left-auto md:right-4 md:w-96">
      <Card className="glassmorphism border-primary/50">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">ChoreChamp App</CardTitle>
            <Button variant="ghost" size="icon" onClick={onClose} className="hover:bg-muted">
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </Button>
          </div>
        </CardHeader>
        <CardContent className="pb-2">
          <p className="text-sm text-muted-foreground">
            ChoreChamp works in your browser without installation. You can continue using it right away!
          </p>
        </CardContent>
        <CardFooter className="flex gap-2">
          <Button variant="outline" className="flex-1" onClick={onClose}>
            Continue to App
          </Button>
          <Button className="flex-1" onClick={handleInstallClick}>
            <Download className="mr-2 h-4 w-4" />
            Install (Optional)
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

