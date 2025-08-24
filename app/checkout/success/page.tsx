"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { CheckCircle, Package, Truck, Mail, CreditCard, Download, Star } from "lucide-react"
import Link from "next/link"

interface TransactionDetails {
  transactionId: string
  amount: number
  paymentMethod: string
  items: number
}

export default function CheckoutSuccessPage() {
  const [transactionDetails, setTransactionDetails] = useState<TransactionDetails | null>(null)

  useEffect(() => {
    const stored = sessionStorage.getItem("zentro-transaction")
    if (stored) {
      setTransactionDetails(JSON.parse(stored))
      sessionStorage.removeItem("zentro-transaction")
    }
  }, [])

  const orderNumber = `ZEN-${Math.random().toString(36).substr(2, 9).toUpperCase()}`
  const estimatedDelivery = new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <span className="text-sm font-bold text-primary-foreground">Z</span>
            </div>
            <span className="text-xl font-bold text-foreground">ZENTRO</span>
          </Link>
          <Badge variant="secondary" className="bg-green-100 text-green-800">
            <CheckCircle className="w-3 h-3 mr-1" />
            Order Confirmed
          </Badge>
        </div>
      </header>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Success Header */}
          <div className="text-center mb-12">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h1 className="text-4xl font-bold text-foreground mb-4">Payment Successful!</h1>
            <p className="text-xl text-muted mb-2">Thank you for your order</p>
            <p className="text-muted">
              Order <strong>{orderNumber}</strong> has been confirmed and is being processed
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            {/* Order Details */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Package className="w-5 h-5 mr-2" />
                  Order Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted">Order Number</span>
                  <span className="font-medium">{orderNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted">Order Date</span>
                  <span className="font-medium">{new Date().toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted">Total Amount</span>
                  <span className="font-semibold text-lg">${transactionDetails?.amount.toFixed(2) || "0.00"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted">Items</span>
                  <span className="font-medium">{transactionDetails?.items || 0} items</span>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <span className="text-muted">Estimated Delivery</span>
                  <span className="font-medium text-green-600">{estimatedDelivery}</span>
                </div>
              </CardContent>
            </Card>

            {/* Payment Details */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CreditCard className="w-5 h-5 mr-2" />
                  Payment Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted">Transaction ID</span>
                  <span className="font-mono text-sm">{transactionDetails?.transactionId || "N/A"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted">Payment Method</span>
                  <span className="font-medium capitalize">
                    {transactionDetails?.paymentMethod?.replace("-", " ") || "N/A"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted">Status</span>
                  <Badge className="bg-green-100 text-green-800">Paid</Badge>
                </div>
                <Separator />
                <div className="p-3 bg-green-50 rounded-lg">
                  <div className="flex items-center space-x-2 text-sm text-green-700">
                    <CheckCircle className="w-4 h-4" />
                    <span>Payment processed successfully</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Next Steps */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>What happens next?</CardTitle>
              <CardDescription>Here's what you can expect from your order</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Mail className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="font-semibold mb-2">Order Confirmation</h3>
                  <p className="text-sm text-muted">You'll receive an email confirmation with order details shortly</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Package className="w-6 h-6 text-yellow-600" />
                  </div>
                  <h3 className="font-semibold mb-2">Order Processing</h3>
                  <p className="text-sm text-muted">We'll prepare and package your items with care</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Truck className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="font-semibold mb-2">Fast Delivery</h3>
                  <p className="text-sm text-muted">Your order will be delivered by {estimatedDelivery}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button size="lg" className="bg-primary hover:bg-primary/90">
              <Download className="w-4 h-4 mr-2" />
              Download Receipt
            </Button>
            <Button size="lg" variant="outline">
              <Package className="w-4 h-4 mr-2" />
              Track Your Order
            </Button>
            <Link href="/products">
              <Button size="lg" variant="outline">
                Continue Shopping
              </Button>
            </Link>
          </div>

          {/* Demo Notice */}
          <div className="bg-accent/10 p-6 rounded-lg text-center">
            <h3 className="font-semibold text-accent mb-2">Demo Store Notice</h3>
            <p className="text-sm text-muted mb-4">
              This was a test transaction. No real payment was processed and no items will be shipped. This
              demonstration shows the complete checkout experience of the Zentro e-commerce platform.
            </p>
            <div className="flex items-center justify-center space-x-4 text-sm text-muted">
              <div className="flex items-center space-x-1">
                <Star className="w-4 h-4 text-yellow-500" />
                <span>Premium Experience</span>
              </div>
              <div className="flex items-center space-x-1">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>Secure Processing</span>
              </div>
              <div className="flex items-center space-x-1">
                <Truck className="w-4 h-4 text-blue-500" />
                <span>Fast Checkout</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
