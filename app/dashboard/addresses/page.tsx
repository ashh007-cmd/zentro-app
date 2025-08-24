"use client"

import { useAuth } from "@/lib/auth"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Plus, Edit, Trash2, Home, Building } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import CartSidebar from "@/components/cart-sidebar"
import UserMenu from "@/components/user-menu"

// Mock addresses data
const mockAddresses = [
  {
    id: "1",
    type: "home",
    label: "Home",
    name: "John Doe",
    street: "123 Main Street",
    city: "New York",
    state: "NY",
    zipCode: "10001",
    country: "United States",
    isDefault: true,
  },
  {
    id: "2",
    type: "work",
    label: "Work",
    name: "John Doe",
    street: "456 Business Ave",
    city: "New York",
    state: "NY",
    zipCode: "10002",
    country: "United States",
    isDefault: false,
  },
]

export default function AddressesPage() {
  const { user, isAuthenticated } = useAuth()
  const router = useRouter()
  const [addresses, setAddresses] = useState(mockAddresses)

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push("/")
    }
  }, [isAuthenticated, router])

  const removeAddress = (addressId: string) => {
    setAddresses((addresses) => addresses.filter((addr) => addr.id !== addressId))
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Please sign in to view your addresses</h1>
          <Link href="/">
            <Button>Go Home</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <span className="text-sm font-bold text-primary-foreground">Z</span>
            </div>
            <span className="text-xl font-bold text-foreground">ZENTRO</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/dashboard" className="text-foreground hover:text-accent transition-colors">
              Dashboard
            </Link>
            <Link href="/products" className="text-foreground hover:text-accent transition-colors">
              Shop
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <CartSidebar />
            <UserMenu />
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">My Addresses</h1>
            <p className="text-muted-foreground">Manage your delivery addresses</p>
          </div>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add New Address
          </Button>
        </div>

        {addresses.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <MapPin className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-xl font-semibold mb-2">No addresses saved</h3>
              <p className="text-muted-foreground mb-6">Add your first delivery address to get started</p>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Add Address
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {addresses.map((address) => (
              <Card key={address.id} className="relative">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      {address.type === "home" ? (
                        <Home className="w-5 h-5 text-primary" />
                      ) : (
                        <Building className="w-5 h-5 text-primary" />
                      )}
                      <CardTitle className="text-lg">{address.label}</CardTitle>
                    </div>
                    {address.isDefault && <Badge variant="secondary">Default</Badge>}
                  </div>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p className="font-medium">{address.name}</p>
                  <p className="text-sm text-muted-foreground">{address.street}</p>
                  <p className="text-sm text-muted-foreground">
                    {address.city}, {address.state} {address.zipCode}
                  </p>
                  <p className="text-sm text-muted-foreground">{address.country}</p>

                  <div className="flex space-x-2 pt-4">
                    <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                      <Edit className="w-4 h-4 mr-2" />
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => removeAddress(address.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
