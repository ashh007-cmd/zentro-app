"use client"

import { useAdminAuth } from "@/lib/admin-auth"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ShoppingCart, Search, Eye, Filter, LogOut, Shield, Package, Truck, CheckCircle, Clock } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

// Mock orders data
const mockOrders = [
  {
    id: "ZEN-ABC123",
    customer: "John Doe",
    email: "john@example.com",
    total: 299.99,
    status: "completed",
    items: 2,
    date: "2024-01-15",
    shippingAddress: "123 Main St, New York, NY 10001",
  },
  {
    id: "ZEN-DEF456",
    customer: "Jane Smith",
    email: "jane@example.com",
    total: 149.99,
    status: "processing",
    items: 1,
    date: "2024-01-14",
    shippingAddress: "456 Oak Ave, Los Angeles, CA 90210",
  },
  {
    id: "ZEN-GHI789",
    customer: "Mike Johnson",
    email: "mike@example.com",
    total: 89.99,
    status: "pending",
    items: 3,
    date: "2024-01-13",
    shippingAddress: "789 Pine St, Chicago, IL 60601",
  },
  {
    id: "ZEN-JKL012",
    customer: "Sarah Wilson",
    email: "sarah@example.com",
    total: 199.99,
    status: "shipped",
    items: 1,
    date: "2024-01-12",
    shippingAddress: "321 Elm St, Miami, FL 33101",
  },
  {
    id: "ZEN-MNO345",
    customer: "David Brown",
    email: "david@example.com",
    total: 449.98,
    status: "completed",
    items: 2,
    date: "2024-01-11",
    shippingAddress: "654 Maple Dr, Seattle, WA 98101",
  },
]

export default function AdminOrdersPage() {
  const { admin, logout, isAuthenticated } = useAdminAuth()
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("all")

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

  const filteredOrders = mockOrders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = selectedStatus === "all" || order.status === selectedStatus
    return matchesSearch && matchesStatus
  })

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="w-4 h-4" />
      case "processing":
        return <Package className="w-4 h-4" />
      case "shipped":
        return <Truck className="w-4 h-4" />
      case "completed":
        return <CheckCircle className="w-4 h-4" />
      default:
        return <Clock className="w-4 h-4" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "processing":
        return "bg-blue-100 text-blue-800"
      case "shipped":
        return "bg-purple-100 text-purple-800"
      case "completed":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
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
              <p className="text-sm text-muted-foreground">Order Management</p>
            </div>
          </div>

          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/admin/dashboard" className="text-foreground hover:text-accent transition-colors">
              Dashboard
            </Link>
            <Link href="/admin/products" className="text-foreground hover:text-accent transition-colors">
              Products
            </Link>
            <Link href="/admin/orders" className="text-accent font-medium">
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
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">Order Management</h2>
          <p className="text-muted-foreground">View and manage customer orders</p>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search orders, customers, or emails..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-muted-foreground" />
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3 py-2 border border-border rounded-md bg-background"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
              <option value="shipped">Shipped</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>

        {/* Orders List */}
        <div className="space-y-4">
          {filteredOrders.map((order) => (
            <Card key={order.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <ShoppingCart className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">Order {order.id}</h3>
                      <p className="text-sm text-muted-foreground">
                        {order.customer} • {order.email}
                      </p>
                      <p className="text-xs text-muted-foreground">{order.shippingAddress}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-6">
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">Total</p>
                      <p className="font-semibold text-lg">${order.total}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">Items</p>
                      <p className="font-semibold">{order.items}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">Date</p>
                      <p className="font-semibold">{new Date(order.date).toLocaleDateString()}</p>
                    </div>
                    <div className="flex flex-col items-end space-y-2">
                      <Badge className={getStatusColor(order.status)}>
                        {getStatusIcon(order.status)}
                        <span className="ml-1 capitalize">{order.status}</span>
                      </Badge>
                      <Button variant="outline" size="sm" className="bg-transparent">
                        <Eye className="w-4 h-4 mr-2" />
                        View Details
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredOrders.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <ShoppingCart className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-xl font-semibold mb-2">No orders found</h3>
              <p className="text-muted-foreground">
                {searchTerm || selectedStatus !== "all"
                  ? "Try adjusting your search or filter criteria"
                  : "No orders have been placed yet"}
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
