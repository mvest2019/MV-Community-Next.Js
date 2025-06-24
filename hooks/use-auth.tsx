"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface User {
  id: number
  name: string
  email: string
  username: string
  avatar?: string
  verified?: boolean
}

interface AuthContextType {
  user: User | null
  isLoggedIn: boolean
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  checkAuth: () => boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    // Check if user is logged in on app start
    const savedUser = localStorage.getItem("user")
    if (savedUser) {
      try {
        const userData = JSON.parse(savedUser)
        setUser(userData)
        setIsLoggedIn(true)
      } catch (error) {
        console.error("Error parsing saved user data:", error)
        localStorage.removeItem("user")
      }
    }
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock login validation
      if (email && password) {
        const userData: User = {
          id: 8,
          name: "John Doe",
          email: email,
          username: "john_doe",
          avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
          verified: true,
        }

        setUser(userData)
        setIsLoggedIn(true)
        localStorage.setItem("user", JSON.stringify(userData))
        return true
      }
      return false
    } catch (error) {
      console.error("Login error:", error)
      return false
    }
  }

  const logout = () => {
    setUser(null)
    setIsLoggedIn(false)
    localStorage.removeItem("user")
  }

  const checkAuth = () => {
    return isLoggedIn
  }

  return <AuthContext.Provider value={{ user, isLoggedIn, login, logout, checkAuth }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
