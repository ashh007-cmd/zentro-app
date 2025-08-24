"use client"

import { useAuth } from "@/lib/auth"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Mail, Calendar, Edit, ShoppingBag, Star, TrendingUp, Heart, MapPin } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import CartSidebar from "@/components/cart-sidebar"
import UserMenu from "@/components/user-menu"

export default function ProfilePage() {
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
          <h1 className="text-2xl font-bold mb-4">Please sign in to view your profile</h1>
          <Link href="/">
            <Button>Go Home</Button>
          </Link>
        </div>
      </div>
    )
  }

  const initials = `${user.firstName[0]}${user.lastName[0]}`.toUpperCase()
  const memberSince = new Date(user.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
  })

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
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Profile Info */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader className="text-center">
                <Avatar className="w-20 h-20 mx-auto mb-4">
                  <AvatarFallback className="bg-primary text-primary-foreground text-2xl">{initials}</AvatarFallback>
                </Avatar>
                <CardTitle>
                  {user.firstName} {user.lastName}
                </CardTitle>
                <CardDescription>{user.email}</CardDescription>
                <Badge variant="secondary" className="w-fit mx-auto mt-2">
                  <Star className="w-3 h-3 mr-1" />
                  Premium Member
                </Badge>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center text-sm text-muted">
                  <Calendar className="w-4 h-4 mr-2" />
                  Member since {memberSince}
                </div>
                <Separator />
                <div className="space-y-2">
                  <Link href="/dashboard">
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      <TrendingUp className="w-4 h-4 mr-2" />
                      Dashboard
                    </Button>
                  </Link>
                  <Link href="/orders">
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      <ShoppingBag className="w-4 h-4 mr-2" />
                      My Orders
                    </Button>
                  </Link>
                  <Link href="/dashboard/wishlist">
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      <Heart className="w-4 h-4 mr-2" />
                      Wishlist
                    </Button>
                  </Link>
                  <Link href="/dashboard/addresses">
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      <MapPin className="w-4 h-4 mr-2" />
                      Addresses
                    </Button>
                  </Link>
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <Edit className="w-4 h-4 mr-2" />
                    Edit Profile
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Profile Details */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>Manage your account details and preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" value={user.firstName} readOnly />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" value={user.lastName} readOnly />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted w-4 h-4" />
                    <Input id="email" value={user.email} className="pl-10" readOnly />
                  </div>
                </div>
                <Button disabled>
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Information (Demo)
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Account Statistics</CardTitle>
                <CardDescription>Your activity summary</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-primary">12</div>
                    <div className="text-sm text-muted">Total Orders</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-primary">$1,247</div>
                    <div className="text-sm text-muted">Total Spent</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-primary">4.8</div>
                    <div className="text-sm text-muted">Avg Rating</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Your latest interactions with Zentro</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4 p-3 bg-card rounded-lg border">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Order #ZEN-ABC123 delivered</p>
                      <p className="text-xs text-muted">2 days ago</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 p-3 bg-card rounded-lg border">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Left review for Premium Headphones</p>
                      <p className="text-xs text-muted">1 week ago</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 p-3 bg-card rounded-lg border">
                    <div className="w-2 h-2 bg-accent rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Account created</p>
                      <p className="text-xs text-muted">{memberSince}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
