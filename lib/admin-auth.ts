import { create } from "zustand"
import { persist } from "zustand/middleware"

interface AdminUser {
  id: string
  email: string
  name: string
  role: "admin" | "super-admin"
  createdAt: string
}

interface AdminAuthState {
  admin: AdminUser | null
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  isAuthenticated: () => boolean
}

// Demo admin accounts
const demoAdmins: AdminUser[] = [
  {
    id: "admin-1",
    email: "admin@zentro.com",
    name: "Admin User",
    role: "admin",
    createdAt: new Date().toISOString(),
  },
  {
    id: "admin-2",
    email: "super@zentro.com",
    name: "Super Admin",
    role: "super-admin",
    createdAt: new Date().toISOString(),
  },
]

export const useAdminAuth = create<AdminAuthState>()(
  persist(
    (set, get) => ({
      admin: null,
      login: async (email: string, password: string) => {
        // Demo login - accept any password for demo accounts
        const admin = demoAdmins.find((a) => a.email === email)
        if (admin) {
          set({ admin })
          return true
        }
        return false
      },
      logout: () => {
        set({ admin: null })
      },
      isAuthenticated: () => {
        return get().admin !== null
      },
    }),
    {
      name: "zentro-admin-auth",
    },
  ),
)
