"use client"

import { useAdminAuth } from "@/lib/admin-auth"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Package, ShoppingCart, Users, TrendingUp, DollarSign, Plus, LogOut, Shield } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function AdminDashboardPage() {
  const { admin, logout, isAuthenticated } = useAdminAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push("/admin")
    }
  }, [isAuthenticated, router])

  if (!admin) {
    return null
  }

  const handleLogout = () => {
    logout()
    router.push("/admin")
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Admin Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <Shield className="w-4 h-4 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">ZENTRO ADMIN</h1>
              <p className="text-sm text-muted-foreground">Management Dashboard</p>
            </div>
          </div>

          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/admin/dashboard" className="text-foreground hover:text-accent transition-colors">
              Dashboard
            </Link>
            <Link href="/admin/products" className="text-foreground hover:text-accent transition-colors">
              Products
            </Link>
            <Link href="/admin/orders" className="text-foreground hover:text-accent transition-colors">
              Orders
            </Link>
            <Link href="/admin/users" className="text-foreground hover:text-accent transition-colors">
              Users
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Avatar className="w-8 h-8">
                <AvatarFallback className="bg-primary text-primary-foreground text-sm">
                  {admin.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="hidden md:block">
                <p className="text-sm font-medium">{admin.name}</p>
                <Badge variant="secondary" className="text-xs">
                  {admin.role}
                </Badge>
              </div>
            </div>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">Welcome back, {admin.name}!</h2>
          <p className="text-muted-foreground">Here's an overview of your store performance</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Products</p>
                  <p className="text-2xl font-bold">8</p>
                </div>
                <Package className="w-8 h-8 text-primary" />
              </div>
              <div className="mt-4">
                <p className="text-xs text-green-600">+2 this month</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Orders</p>
                  <p className="text-2xl font-bold">247</p>
                </div>
                <ShoppingCart className="w-8 h-8 text-blue-500" />
              </div>
              <div className="mt-4">
                <p className="text-xs text-green-600">+18% from last month</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Users</p>
                  <p className="text-2xl font-bold">1,429</p>
                </div>
                <Users className="w-8 h-8 text-green-500" />
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
                  <p className="text-sm font-medium text-muted-foreground">Revenue</p>
                  <p className="text-2xl font-bold">$24,567</p>
                </div>
                <DollarSign className="w-8 h-8 text-yellow-500" />
              </div>
              <div className="mt-4">
                <p className="text-xs text-green-600">+25% from last month</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Link href="/admin/products/new">
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-6 text-center">
                <Plus className="w-8 h-8 mx-auto mb-2 text-primary" />
                <h3 className="font-semibold">Add Product</h3>
                <p className="text-sm text-muted-foreground">Create new product</p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/admin/orders">
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-6 text-center">
                <ShoppingCart className="w-8 h-8 mx-auto mb-2 text-blue-500" />
                <h3 className="font-semibold">Manage Orders</h3>
                <p className="text-sm text-muted-foreground">View and process orders</p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/admin/users">
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-6 text-center">
                <Users className="w-8 h-8 mx-auto mb-2 text-green-500" />
                <h3 className="font-semibold">User Management</h3>
                <p className="text-sm text-muted-foreground">Manage user accounts</p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/admin/analytics">
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-6 text-center">
                <TrendingUp className="w-8 h-8 mx-auto mb-2 text-purple-500" />
                <h3 className="font-semibold">Analytics</h3>
                <p className="text-sm text-muted-foreground">View detailed reports</p>
              </CardContent>
            </Card>
          </Link>
        </div>

        {/* Recent Activity */}
        <div className="grid lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Recent Orders</CardTitle>
              <CardDescription>Latest customer orders</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-card rounded-lg border">
                <div>
                  <p className="font-medium">Order #ZEN-ABC123</p>
                  <p className="text-sm text-muted-foreground">John Doe • $299.99</p>
                </div>
                <Badge className="bg-green-100 text-green-800">Completed</Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-card rounded-lg border">
                <div>
                  <p className="font-medium">Order #ZEN-DEF456</p>
                  <p className="text-sm text-muted-foreground">Jane Smith • $149.99</p>
                </div>
                <Badge className="bg-blue-100 text-blue-800">Processing</Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-card rounded-lg border">
                <div>
                  <p className="font-medium">Order #ZEN-GHI789</p>
                  <p className="text-sm text-muted-foreground">Mike Johnson • $89.99</p>
                </div>
                <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Top Products</CardTitle>
              <CardDescription>Best performing products this month</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-card rounded-lg border">
                <div>
                  <p className="font-medium">Premium Wireless Headphones</p>
                  <p className="text-sm text-muted-foreground">47 sales • $13,999.53</p>
                </div>
                <TrendingUp className="w-5 h-5 text-green-500" />
              </div>
              <div className="flex items-center justify-between p-3 bg-card rounded-lg border">
                <div>
                  <p className="font-medium">Designer Cotton T-Shirt</p>
                  <p className="text-sm text-muted-foreground">32 sales • $1,599.68</p>
                </div>
                <TrendingUp className="w-5 h-5 text-green-500" />
              </div>
              <div className="flex items-center justify-between p-3 bg-card rounded-lg border">
                <div>
                  <p className="font-medium">Fitness Tracker Watch</p>
                  <p className="text-sm text-muted-foreground">28 sales • $4,199.72</p>
                </div>
                <TrendingUp className="w-5 h-5 text-green-500" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
