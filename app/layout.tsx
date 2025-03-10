import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { ChoreProvider } from "@/context/chore-context"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "ChoreChamp - Gamified Household Chores",
  description: "Turn household chores into a championship!",
  // Add manifest for PWA support but make it optional
  manifest: "/manifest.json",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <ChoreProvider>{children}</ChoreProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'