"use client"

import { useAuth } from "@/lib/auth"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Package, Truck, CheckCircle, Clock, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import CartSidebar from "@/components/cart-sidebar"
import UserMenu from "@/components/user-menu"

// Mock orders data
const mockOrders = [
  {
    id: "ZEN-ABC123",
    date: "2024-01-15",
    status: "delivered",
    total: 299.99,
    items: [{ name: "Premium Wireless Headphones", quantity: 1, price: 299.99 }],
  },
  {
    id: "ZEN-DEF456",
    date: "2024-01-10",
    status: "shipped",
    total: 149.98,
    items: [
      { name: "Designer Cotton T-Shirt", quantity: 2, price: 49.99 },
      { name: "Fitness Tracker Watch", quantity: 1, price: 149.99 },
    ],
  },
  {
    id: "ZEN-GHI789",
    date: "2024-01-05",
    status: "processing",
    total: 89.99,
    items: [{ name: "Premium Skincare Set", quantity: 1, price: 89.99 }],
  },
]

export default function OrdersPage() {
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
          <h1 className="text-2xl font-bold mb-4">Please sign in to view your orders</h1>
          <Link href="/">
            <Button>Go Home</Button>
          </Link>
        </div>
      </div>
    )
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "delivered":
        return <CheckCircle className="w-4 h-4 text-green-600" />
      case "shipped":
        return <Truck className="w-4 h-4 text-blue-600" />
      case "processing":
        return <Clock className="w-4 h-4 text-yellow-600" />
      default:
        return <Package className="w-4 h-4 text-gray-600" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered":
        return "bg-green-100 text-green-800"
      case "shipped":
        return "bg-blue-100 text-blue-800"
      case "processing":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
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
            <Link href="/products" className="text-foreground hover:text-accent transition-colors">
              Shop
            </Link>
            <Link href="/categories" className="text-foreground hover:text-accent transition-colors">
              Categories
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <CartSidebar />
            <UserMenu />
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center mb-8">
          <Link href="/profile">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Profile
            </Button>
          </Link>
        </div>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">My Orders</h1>
          <p className="text-muted">Track and manage your order history</p>
        </div>

        <div className="space-y-6">
          {mockOrders.map((order) => (
            <Card key={order.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg">Order {order.id}</CardTitle>
                    <CardDescription>
                      Placed on{" "}
                      {new Date(order.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </CardDescription>
                  </div>
                  <div className="text-right">
                    <Badge className={getStatusColor(order.status)}>
                      {getStatusIcon(order.status)}
                      <span className="ml-1 capitalize">{order.status}</span>
                    </Badge>
                    <p className="text-lg font-semibold mt-1">${order.total.toFixed(2)}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {order.items.map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-card rounded-lg flex items-center justify-center">
                          <Package className="w-6 h-6 text-muted" />
                        </div>
                        <div>
                          <p className="font-medium">{item.name}</p>
                          <p className="text-sm text-muted">Quantity: {item.quantity}</p>
                        </div>
                      </div>
                      <p className="font-medium">${item.price.toFixed(2)}</p>
                    </div>
                  ))}
                </div>
                <Separator className="my-4" />
                <div className="flex justify-between items-center">
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                    {order.status === "delivered" && (
                      <Button variant="outline" size="sm">
                        Leave Review
                      </Button>
                    )}
                  </div>
                  {order.status === "shipped" && (
                    <Button size="sm">
                      <Truck className="w-4 h-4 mr-2" />
                      Track Package
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {mockOrders.length === 0 && (
          <div className="text-center py-12">
            <Package className="w-16 h-16 text-muted mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No orders yet</h3>
            <p className="text-muted mb-6">Start shopping to see your orders here</p>
            <Link href="/products">
              <Button>Browse Products</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
