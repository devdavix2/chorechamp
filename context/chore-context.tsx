"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"

export type ChoreLevel = "easy" | "medium" | "hard"

export interface Chore {
  id: string
  title: string
  description: string
  points: number
  level: ChoreLevel
  assignedTo: string
  completed: boolean
  dueDate?: string
  createdAt: string
  completedAt?: string
}

export interface User {
  id: string
  name: string
  avatar: string
  points: number
  streak: number
  achievements: Achievement[]
}

export interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  earnedAt: string
}

interface ChoreContextType {
  chores: Chore[]
  users: User[]
  addChore: (chore: Omit<Chore, "id" | "createdAt">) => void
  updateChore: (id: string, chore: Partial<Chore>) => void
  deleteChore: (id: string) => void
  completeChore: (id: string, userId: string) => void
  addUser: (user: Omit<User, "id" | "points" | "streak" | "achievements">) => void
  updateUser: (id: string, user: Partial<User>) => void
  deleteUser: (id: string) => void
  getLeaderboard: () => User[]
  getUserChores: (userId: string) => Chore[]
  getCompletedChores: () => Chore[]
  getPendingChores: () => Chore[]
}

const ChoreContext = createContext<ChoreContextType | undefined>(undefined)

export const useChores = () => {
  const context = useContext(ChoreContext)
  if (!context) {
    throw new Error("useChores must be used within a ChoreProvider")
  }
  return context
}

const MOCK_USERS: User[] = [
  {
    id: "1",
    name: "Alex",
    avatar: "/placeholder.svg?height=100&width=100",
    points: 320,
    streak: 3,
    achievements: [
      {
        id: "a1",
        title: "First Chore",
        description: "Completed your first chore",
        icon: "trophy",
        earnedAt: new Date().toISOString(),
      },
    ],
  },
  {
    id: "2",
    name: "Sam",
    avatar: "/placeholder.svg?height=100&width=100",
    points: 450,
    streak: 5,
    achievements: [
      {
        id: "a1",
        title: "First Chore",
        description: "Completed your first chore",
        icon: "trophy",
        earnedAt: new Date().toISOString(),
      },
      {
        id: "a2",
        title: "Streak Master",
        description: "Maintained a 5-day streak",
        icon: "flame",
        earnedAt: new Date().toISOString(),
      },
    ],
  },
  {
    id: "3",
    name: "Jordan",
    avatar: "/placeholder.svg?height=100&width=100",
    points: 280,
    streak: 2,
    achievements: [],
  },
]

const MOCK_CHORES: Chore[] = [
  {
    id: "c1",
    title: "Wash Dishes",
    description: "Clean all dishes in the sink",
    points: 20,
    level: "easy",
    assignedTo: "1",
    completed: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: "c2",
    title: "Vacuum Living Room",
    description: "Vacuum the entire living room area",
    points: 30,
    level: "medium",
    assignedTo: "2",
    completed: true,
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    completedAt: new Date().toISOString(),
  },
  {
    id: "c3",
    title: "Clean Bathroom",
    description: "Clean toilet, shower, and sink",
    points: 50,
    level: "hard",
    assignedTo: "3",
    completed: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: "c4",
    title: "Take Out Trash",
    description: "Empty all trash bins and take to dumpster",
    points: 15,
    level: "easy",
    assignedTo: "1",
    completed: true,
    createdAt: new Date(Date.now() - 172800000).toISOString(),
    completedAt: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: "c5",
    title: "Mow the Lawn",
    description: "Mow the front and back yard",
    points: 60,
    level: "hard",
    assignedTo: "2",
    completed: false,
    createdAt: new Date().toISOString(),
  },
]

export const ChoreProvider = ({ children }: { children: React.ReactNode }) => {
  const [chores, setChores] = useState<Chore[]>([])
  const [users, setUsers] = useState<User[]>([])

  useEffect(() => {
    // Load data from localStorage or use mock data
    try {
      const storedChores = localStorage.getItem("chores")
      const storedUsers = localStorage.getItem("users")

      if (storedChores) {
        setChores(JSON.parse(storedChores))
      } else {
        setChores(MOCK_CHORES)
      }

      if (storedUsers) {
        setUsers(JSON.parse(storedUsers))
      } else {
        setUsers(MOCK_USERS)
      }
    } catch (error) {
      // Fallback to mock data if localStorage fails
      console.error("Error loading data from localStorage:", error)
      setChores(MOCK_CHORES)
      setUsers(MOCK_USERS)
    }
  }, [])

  useEffect(() => {
    // Save data to localStorage whenever it changes
    try {
      if (chores.length > 0) {
        localStorage.setItem("chores", JSON.stringify(chores))
      }
      if (users.length > 0) {
        localStorage.setItem("users", JSON.stringify(users))
      }
    } catch (error) {
      console.error("Error saving data to localStorage:", error)
    }
  }, [chores, users])

  const addChore = (chore: Omit<Chore, "id" | "createdAt">) => {
    const newChore: Chore = {
      ...chore,
      id: `c${Date.now()}`,
      createdAt: new Date().toISOString(),
    }
    setChores((prev) => [...prev, newChore])
  }

  const updateChore = (id: string, updatedChore: Partial<Chore>) => {
    setChores((prev) => prev.map((chore) => (chore.id === id ? { ...chore, ...updatedChore } : chore)))
  }

  const deleteChore = (id: string) => {
    setChores((prev) => prev.filter((chore) => chore.id !== id))
  }

  const completeChore = (id: string, userId: string) => {
    // Mark chore as completed
    setChores((prev) =>
      prev.map((chore) =>
        chore.id === id ? { ...chore, completed: true, completedAt: new Date().toISOString() } : chore,
      ),
    )

    // Add points to user
    const chore = chores.find((c) => c.id === id)
    if (chore) {
      setUsers((prev) =>
        prev.map((user) =>
          user.id === userId
            ? {
                ...user,
                points: user.points + chore.points,
                streak: user.streak + 1,
              }
            : user,
        ),
      )
    }
  }

  const addUser = (user: Omit<User, "id" | "points" | "streak" | "achievements">) => {
    const newUser: User = {
      ...user,
      id: `u${Date.now()}`,
      points: 0,
      streak: 0,
      achievements: [],
    }
    setUsers((prev) => [...prev, newUser])
  }

  const updateUser = (id: string, updatedUser: Partial<User>) => {
    setUsers((prev) => prev.map((user) => (user.id === id ? { ...user, ...updatedUser } : user)))
  }

  const deleteUser = (id: string) => {
    setUsers((prev) => prev.filter((user) => user.id !== id))
  }

  const getLeaderboard = () => {
    return [...users].sort((a, b) => b.points - a.points)
  }

  const getUserChores = (userId: string) => {
    return chores.filter((chore) => chore.assignedTo === userId)
  }

  const getCompletedChores = () => {
    return chores.filter((chore) => chore.completed)
  }

  const getPendingChores = () => {
    return chores.filter((chore) => !chore.completed)
  }

  return (
    <ChoreContext.Provider
      value={{
        chores,
        users,
        addChore,
        updateChore,
        deleteChore,
        completeChore,
        addUser,
        updateUser,
        deleteUser,
        getLeaderboard,
        getUserChores,
        getCompletedChores,
        getPendingChores,
      }}
    >
      {children}
    </ChoreContext.Provider>
  )
}

