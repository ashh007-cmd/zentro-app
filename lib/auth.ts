"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"

export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  avatar?: string
  createdAt: string
}

interface AuthStore {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  signup: (
    email: string,
    password: string,
    firstName: string,
    lastName: string,
  ) => Promise<{ success: boolean; error?: string }>
  logout: () => void
  isAuthenticated: () => boolean
}

// Mock users database
const mockUsers: User[] = [
  {
    id: "1",
    email: "demo@zentro.com",
    firstName: "Demo",
    lastName: "User",
    createdAt: "2024-01-01T00:00:00Z",
  },
  {
    id: "2",
    email: "john@example.com",
    firstName: "John",
    lastName: "Doe",
    createdAt: "2024-01-15T00:00:00Z",
  },
]

export const useAuth = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      isLoading: false,

      login: async (email: string, password: string) => {
        set({ isLoading: true })

        // Simulate API call delay
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Check if user exists (demo purposes - any password works)
        const user = mockUsers.find((u) => u.email.toLowerCase() === email.toLowerCase())

        if (user) {
          set({ user, isLoading: false })
          return { success: true }
        } else {
          set({ isLoading: false })
          return { success: false, error: "Invalid email or password" }
        }
      },

      signup: async (email: string, password: string, firstName: string, lastName: string) => {
        set({ isLoading: true })

        // Simulate API call delay
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Check if user already exists
        const existingUser = mockUsers.find((u) => u.email.toLowerCase() === email.toLowerCase())

        if (existingUser) {
          set({ isLoading: false })
          return { success: false, error: "An account with this email already exists" }
        }

        // Create new user
        const newUser: User = {
          id: Math.random().toString(36).substr(2, 9),
          email,
          firstName,
          lastName,
          createdAt: new Date().toISOString(),
        }

        mockUsers.push(newUser)
        set({ user: newUser, isLoading: false })
        return { success: true }
      },

      logout: () => {
        set({ user: null })
      },

      isAuthenticated: () => {
        return get().user !== null
      },
    }),
    {
      name: "zentro-auth",
    },
  ),
)
