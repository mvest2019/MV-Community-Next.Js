"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

export interface User {
  member_id: number
  name?: string
  email: string
  username?: string
  avatar?: string
  verified?: boolean
  f_name?: string
  l_name?: string
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
 const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setIsLoggedIn(true);
    }
  }, []);

 // In hooks/use-auth.tsx
const login = async (email: string, password: string): Promise<boolean> => {
  try {
    const response = await fetch("https://mview-info.mineralview.com/User/login_user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email_id: email,
        password,
        id: ""
      }),
    });
    if (!response.ok) return false;
    const result = await response.json();
    // You may need to adjust this based on your API response structure
    if (result && result.data) {
      localStorage.setItem("user", JSON.stringify(result.data));
      setUser(result.data);
      setIsLoggedIn(true);
      return true;
    }
    return false;
  } catch (error) {
    return false;
  }
};

  const logout = () => {
    setUser(null)
    setIsLoggedIn(false)
    localStorage.removeItem("user")
  }

  const checkAuth = () => {
    return isLoggedIn
  }

  return (
    <AuthContext.Provider value={{ user, isLoggedIn, login, logout, checkAuth }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}