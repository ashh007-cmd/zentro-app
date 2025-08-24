"use client"

import { useAuth } from "@/lib/auth"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ShoppingBag, Heart, MapPin, Settings, TrendingUp, Package, Star, Gift } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import CartSidebar from "@/components/cart-sidebar"
import UserMenu from "@/components/user-menu"

export default function DashboardPage() {
  const { user, isAuthenticated } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push("/")
    }
  }, [isAuthenticated, router])

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Please sign in to view your dashboard</h1>
          <Link href="/">
            <Button>Go Home</Button>
          </Link>
        </div>
      </div>
    )
  }

  const initials = `${user.firstName[0]}${user.lastName[0]}`.toUpperCase()

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
            <Link href="/products" className="text-foreground hover:text-accent transition-colors">
              Shop
            </Link>
            <Link href="/categories" className="text-foreground hover:text-accent transition-colors">
              Categories
            </Link>
            <Link href="/about" className="text-foreground hover:text-accent transition-colors">
              About
            </Link>
            <Link href="/contact" className="text-foreground hover:text-accent transition-colors">
              Contact
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <CartSidebar />
            <UserMenu />
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-6">
            <Avatar className="w-16 h-16">
              <AvatarFallback className="bg-primary text-primary-foreground text-xl">{initials}</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-3xl font-bold">Welcome back, {user.firstName}!</h1>
              <p className="text-muted-foreground">Here's what's happening with your account</p>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Orders</p>
                  <p className="text-2xl font-bold">12</p>
                </div>
                <ShoppingBag className="w-8 h-8 text-primary" />
              </div>
              <div className="mt-4">
                <Progress value={75} className="h-2" />
                <p className="text-xs text-muted-foreground mt-2">3 more for VIP status</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Spent</p>
                  <p className="text-2xl font-bold">$1,247</p>
                </div>
                <TrendingUp className="w-8 h-8 text-green-500" />
              </div>
              <div className="mt-4">
                <p className="text-xs text-green-600">+12% from last month</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Wishlist Items</p>
                  <p className="text-2xl font-bold">8</p>
                </div>
                <Heart className="w-8 h-8 text-red-500" />
              </div>
              <div className="mt-4">
                <p className="text-xs text-muted-foreground">2 items on sale</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Reward Points</p>
                  <p className="text-2xl font-bold">2,450</p>
                </div>
                <Gift className="w-8 h-8 text-accent" />
              </div>
              <div className="mt-4">
                <p className="text-xs text-muted-foreground">550 points to next reward</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Link href="/orders">
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-6 text-center">
                <Package className="w-8 h-8 mx-auto mb-2 text-primary" />
                <h3 className="font-semibold">My Orders</h3>
                <p className="text-sm text-muted-foreground">Track your purchases</p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/dashboard/wishlist">
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-6 text-center">
                <Heart className="w-8 h-8 mx-auto mb-2 text-red-500" />
                <h3 className="font-semibold">Wishlist</h3>
                <p className="text-sm text-muted-foreground">Saved for later</p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/dashboard/addresses">
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-6 text-center">
                <MapPin className="w-8 h-8 mx-auto mb-2 text-blue-500" />
                <h3 className="font-semibold">Addresses</h3>
                <p className="text-sm text-muted-foreground">Manage delivery locations</p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/profile">
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-6 text-center">
                <Settings className="w-8 h-8 mx-auto mb-2 text-gray-500" />
                <h3 className="font-semibold">Settings</h3>
                <p className="text-sm text-muted-foreground">Account preferences</p>
              </CardContent>
            </Card>
          </Link>
        </div>

        {/* Recent Activity & Recommendations */}
        <div className="grid lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Recent Orders</CardTitle>
              <CardDescription>Your latest purchases</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-4 p-3 bg-card rounded-lg border">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Package className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">Premium Wireless Headphones</p>
                  <p className="text-sm text-muted-foreground">Order #ZEN-ABC123 • Delivered</p>
                </div>
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  Delivered
                </Badge>
              </div>

              <div className="flex items-center space-x-4 p-3 bg-card rounded-lg border">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                  <Package className="w-6 h-6 text-accent" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">Designer Cotton T-Shirt</p>
                  <p className="text-sm text-muted-foreground">Order #ZEN-DEF456 • In Transit</p>
                </div>
                <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                  Shipping
                </Badge>
              </div>

              <Link href="/orders">
                <Button variant="outline" className="w-full bg-transparent">
                  View All Orders
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recommended for You</CardTitle>
              <CardDescription>Based on your purchase history</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-4 p-3 bg-card rounded-lg border">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-400 rounded-lg"></div>
                <div className="flex-1">
                  <p className="font-medium">Luxury Watch Collection</p>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm">4.9 (127 reviews)</span>
                  </div>
                  <p className="text-sm font-semibold text-primary">$299.99</p>
                </div>
              </div>

              <div className="flex items-center space-x-4 p-3 bg-card rounded-lg border">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-lg"></div>
                <div className="flex-1">
                  <p className="font-medium">Smart Fitness Tracker</p>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm">4.7 (89 reviews)</span>
                  </div>
                  <p className="text-sm font-semibold text-primary">$149.99</p>
                </div>
              </div>

              <Link href="/products">
                <Button variant="outline" className="w-full bg-transparent">
                  Browse More Products
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
