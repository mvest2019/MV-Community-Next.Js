"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, Lock, Mail, AlertCircle } from "lucide-react"
import { useAuth } from "@/hooks/use-auth"
import Image from "next/image";

interface LoginPopupProps {
  isOpen: boolean
  onClose: () => void
  actionMessage: string
  onLoginSuccess?: () => void
}

export function LoginPopup({ isOpen, onClose, actionMessage, onLoginSuccess }: LoginPopupProps) {
  const { login } = useAuth()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setError("");

  if (!isValidEmail(email)) {
    setError("Please enter a valid email address.");
    return;
  }
  if (!isValidPassword(password)) {
    setError("Password must be at least 6 characters.");
    return;
  }

  setIsLoading(true);
  try {
    const success = await login(email, password);
    if (success) {
      setEmail("");
      setPassword("");
      onClose();
      if (onLoginSuccess) onLoginSuccess();
    } else {
      setError("Invalid email or password. Please try again.");
    }
  } catch (error) {
    setError("Invalid email or password. Please try again.");
  } finally {
    setIsLoading(false);
  }
};

  const handleClose = () => {
    setEmail("")
    setPassword("")
    setError("")
    onClose()
  }
  async function loginUser(email: string, password: string) {
  const response = await fetch("https://mview-info.mineralview.com/User/login_user", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email_id: email,
      password,
      id: ""
    }),
  });
  if (!response.ok) throw new Error("Login failed");
  return response.json();
}
function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
function isValidPassword(password: string) {
  return password.length >= 6; // or your own rule
}
  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-lg">
            {/* <Lock className="h-5 w-5 text-orange-500" /> */}
      <Image
                    src="/images/mineralview-logo.png"
                    alt="MineralView Logo"
                    width={32}
                    height={32}
                    className="rounded-lg"
                  />
            Login Required
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-2">
          {/* Dynamic Message */}
          <Alert className="border-orange-200 bg-orange-50">
            <AlertCircle className="h-4 w-4 text-orange-600" />
            <AlertDescription className="text-orange-800">🔔 You must be logged in to {actionMessage}</AlertDescription>
          </Alert>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading}
                className="h-11"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="flex items-center gap-2">
                <Lock className="h-4 w-4" />
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={isLoading}
                className="h-11"
              />
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="flex gap-3 pt-2">
              <Button type="button" variant="outline" onClick={handleClose} disabled={isLoading} className="flex-1">
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isLoading || !email.trim() || !password.trim()}
                className="flex-1 bg-orange-500 hover:bg-orange-600"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Logging in...
                  </>
                ) : (
                  "Login"
                )}
              </Button>
            </div>
          </form>

          {/* Demo Credentials */}
          {/* <div className="text-xs text-gray-500 bg-gray-50 p-3 rounded-lg">
            <p className="font-medium mb-1">Demo Credentials:</p>
            <p>Email: any valid email</p>
            <p>Password: any password</p>
          </div> */}
        </div>
      </DialogContent>
    </Dialog>
  )
}
