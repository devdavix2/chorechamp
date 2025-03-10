"use client"

import type React from "react"

import { useEffect, useState } from "react"

export function Confetti() {
  const [particles, setParticles] = useState<React.ReactNode[]>([])

  useEffect(() => {
    const colors = ["#ff0000", "#00ff00", "#0000ff", "#ffff00", "#ff00ff", "#00ffff"]
    const newParticles = []

    for (let i = 0; i < 50; i++) {
      const left = Math.random() * 100
      const animationDuration = 2 + Math.random() * 2
      const size = 5 + Math.random() * 10
      const color = colors[Math.floor(Math.random() * colors.length)]

      newParticles.push(
        <div
          key={i}
          className="confetti"
          style={{
            left: `${left}%`,
            width: `${size}px`,
            height: `${size}px`,
            backgroundColor: color,
            animationDuration: `${animationDuration}s`,
            animationDelay: `${Math.random() * 0.5}s`,
          }}
        />,
      )
    }

    setParticles(newParticles)

    const timer = setTimeout(() => {
      setParticles([])
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  return <div className="absolute inset-0 overflow-hidden pointer-events-none">{particles}</div>
}

