export interface User {
  id: number;
  name: string;
  email: string;
  username: string;
  avatar?: string;
  verified?: boolean;
}

export function getCurrentUser(): User | null {
  if (typeof window === "undefined") return null;
  const userStr = localStorage.getItem("user");
  if (!userStr) return null;
  try {
    return JSON.parse(userStr) as User;
  } catch {
    return null;
  }
}