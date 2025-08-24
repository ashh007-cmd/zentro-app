"use client"

import { useState } from "react"
import { useCart } from "@/lib/cart"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import PaymentMethods from "@/components/payment-methods"
import PaymentForm from "@/components/payment-form"
import { ArrowLeft, CreditCard, Truck, Shield, Check, Loader2, AlertCircle } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { processPayment, validateCardNumber } from "@/lib/payment"

export default function CheckoutPage() {
  const { items, getTotalItems, getTotalPrice, clearCart } = useCart()
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [isProcessing, setIsProcessing] = useState(false)
  const [processingProgress, setProcessingProgress] = useState(0)
  const [paymentError, setPaymentError] = useState("")

  const totalItems = getTotalItems()
  const totalPrice = getTotalPrice()
  const shipping = totalPrice > 50 ? 0 : 9.99
  const tax = totalPrice * 0.08
  const finalTotal = totalPrice + shipping + tax

  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "US",
    paymentMethod: "visa",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    nameOnCard: "",
    saveInfo: false,
  })

  const [formErrors, setFormErrors] = useState<Record<string, string>>({})

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
          <Link href="/products">
            <Button>Continue Shopping</Button>
          </Link>
        </div>
      </div>
    )
  }

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (formErrors[field]) {
      setFormErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const validateStep = (step: number): boolean => {
    const errors: Record<string, string> = {}

    if (step === 1) {
      if (!formData.email) errors.email = "Email is required"
      if (!formData.firstName) errors.firstName = "First name is required"
      if (!formData.lastName) errors.lastName = "Last name is required"
      if (!formData.address) errors.address = "Address is required"
      if (!formData.city) errors.city = "City is required"
      if (!formData.state) errors.state = "State is required"
      if (!formData.zipCode) errors.zipCode = "ZIP code is required"
    }

    if (step === 2 && ["visa", "mastercard", "amex"].includes(formData.paymentMethod)) {
      if (!formData.cardNumber) {
        errors.cardNumber = "Card number is required"
      } else if (!validateCardNumber(formData.cardNumber)) {
        errors.cardNumber = "Invalid card number"
      }
      if (!formData.expiryDate) errors.expiryDate = "Expiry date is required"
      if (!formData.cvv) errors.cvv = "CVV is required"
      if (!formData.nameOnCard) errors.nameOnCard = "Cardholder name is required"
    }

    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = async () => {
    if (!validateStep(3)) return

    setIsProcessing(true)
    setPaymentError("")
    setProcessingProgress(0)

    try {
      // Simulate progress updates
      const progressInterval = setInterval(() => {
        setProcessingProgress((prev) => {
          if (prev >= 90) {
            clearInterval(progressInterval)
            return 90
          }
          return prev + 10
        })
      }, 200)

      const result = await processPayment(
        formData.paymentMethod,
        finalTotal,
        ["visa", "mastercard", "amex"].includes(formData.paymentMethod)
          ? {
              number: formData.cardNumber,
              expiry: formData.expiryDate,
              cvv: formData.cvv,
              name: formData.nameOnCard,
            }
          : undefined,
      )

      clearInterval(progressInterval)
      setProcessingProgress(100)

      if (result.success) {
        // Store transaction details for success page
        sessionStorage.setItem(
          "zentro-transaction",
          JSON.stringify({
            transactionId: result.transactionId,
            amount: finalTotal,
            paymentMethod: formData.paymentMethod,
            items: items.length,
          }),
        )
        clearCart()
        router.push("/checkout/success")
      } else {
        setPaymentError(result.error || "Payment failed. Please try again.")
        setIsProcessing(false)
        setProcessingProgress(0)
      }
    } catch (error) {
      setPaymentError("An unexpected error occurred. Please try again.")
      setIsProcessing(false)
      setProcessingProgress(0)
    }
  }

  const steps = [
    { id: 1, name: "Contact & Shipping", icon: Truck },
    { id: 2, name: "Payment", icon: CreditCard },
    { id: 3, name: "Review", icon: Check },
  ]

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
          <div className="flex items-center space-x-2">
            <Badge variant="secondary">
              <Shield className="w-3 h-3 mr-1" />
              Secure Checkout
            </Badge>
            <Badge variant="outline">Demo Mode</Badge>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center mb-8">
          <Link href="/cart">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Cart
            </Button>
          </Link>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-8">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div
                className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                  currentStep >= step.id
                    ? "bg-primary border-primary text-primary-foreground"
                    : "border-border text-muted"
                }`}
              >
                <step.icon className="w-5 h-5" />
              </div>
              <span className={`ml-2 text-sm ${currentStep >= step.id ? "text-foreground" : "text-muted"}`}>
                {step.name}
              </span>
              {index < steps.length - 1 && <div className="w-16 h-px bg-border mx-4" />}
            </div>
          ))}
        </div>

        {/* Processing Overlay */}
        {isProcessing && (
          <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
            <Card className="w-full max-w-md">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Loader2 className="w-8 h-8 text-primary animate-spin" />
                </div>
                <CardTitle>Processing Payment</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Progress value={processingProgress} className="w-full" />
                <p className="text-center text-sm text-muted">
                  {processingProgress < 30
                    ? "Validating payment information..."
                    : processingProgress < 60
                      ? "Contacting payment processor..."
                      : processingProgress < 90
                        ? "Authorizing transaction..."
                        : "Finalizing payment..."}
                </p>
                <div className="flex items-center justify-center space-x-2 text-sm text-muted">
                  <Shield className="w-4 h-4" />
                  <span>Your payment is secure and encrypted</span>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            {currentStep === 1 && (
              <Card>
                <CardHeader>
                  <CardTitle>Contact & Shipping Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      placeholder="your@email.com"
                      className={formErrors.email ? "border-destructive" : ""}
                    />
                    {formErrors.email && (
                      <Alert variant="destructive" className="mt-2">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>{formErrors.email}</AlertDescription>
                      </Alert>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        value={formData.firstName}
                        onChange={(e) => handleInputChange("firstName", e.target.value)}
                        placeholder="John"
                        className={formErrors.firstName ? "border-destructive" : ""}
                      />
                      {formErrors.firstName && (
                        <Alert variant="destructive" className="mt-2">
                          <AlertCircle className="h-4 w-4" />
                          <AlertDescription>{formErrors.firstName}</AlertDescription>
                        </Alert>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        value={formData.lastName}
                        onChange={(e) => handleInputChange("lastName", e.target.value)}
                        placeholder="Doe"
                        className={formErrors.lastName ? "border-destructive" : ""}
                      />
                      {formErrors.lastName && (
                        <Alert variant="destructive" className="mt-2">
                          <AlertCircle className="h-4 w-4" />
                          <AlertDescription>{formErrors.lastName}</AlertDescription>
                        </Alert>
                      )}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="address">Address</Label>
                    <Input
                      id="address"
                      value={formData.address}
                      onChange={(e) => handleInputChange("address", e.target.value)}
                      placeholder="123 Main Street"
                      className={formErrors.address ? "border-destructive" : ""}
                    />
                    {formErrors.address && (
                      <Alert variant="destructive" className="mt-2">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>{formErrors.address}</AlertDescription>
                      </Alert>
                    )}
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="city">City</Label>
                      <Input
                        id="city"
                        value={formData.city}
                        onChange={(e) => handleInputChange("city", e.target.value)}
                        placeholder="New York"
                        className={formErrors.city ? "border-destructive" : ""}
                      />
                      {formErrors.city && (
                        <Alert variant="destructive" className="mt-2">
                          <AlertCircle className="h-4 w-4" />
                          <AlertDescription>{formErrors.city}</AlertDescription>
                        </Alert>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="state">State</Label>
                      <Input
                        id="state"
                        value={formData.state}
                        onChange={(e) => handleInputChange("state", e.target.value)}
                        placeholder="NY"
                        className={formErrors.state ? "border-destructive" : ""}
                      />
                      {formErrors.state && (
                        <Alert variant="destructive" className="mt-2">
                          <AlertCircle className="h-4 w-4" />
                          <AlertDescription>{formErrors.state}</AlertDescription>
                        </Alert>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="zipCode">ZIP Code</Label>
                      <Input
                        id="zipCode"
                        value={formData.zipCode}
                        onChange={(e) => handleInputChange("zipCode", e.target.value)}
                        placeholder="10001"
                        className={formErrors.zipCode ? "border-destructive" : ""}
                      />
                      {formErrors.zipCode && (
                        <Alert variant="destructive" className="mt-2">
                          <AlertCircle className="h-4 w-4" />
                          <AlertDescription>{formErrors.zipCode}</AlertDescription>
                        </Alert>
                      )}
                    </div>
                  </div>

                  <Button
                    onClick={() => {
                      if (validateStep(1)) setCurrentStep(2)
                    }}
                    className="w-full"
                  >
                    Continue to Payment
                  </Button>
                </CardContent>
              </Card>
            )}

            {currentStep === 2 && (
              <Card>
                <CardHeader>
                  <CardTitle>Payment Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <PaymentMethods
                    selectedMethod={formData.paymentMethod}
                    onMethodChange={(method) => handleInputChange("paymentMethod", method)}
                  />

                  <PaymentForm
                    paymentMethod={formData.paymentMethod}
                    formData={{
                      cardNumber: formData.cardNumber,
                      expiryDate: formData.expiryDate,
                      cvv: formData.cvv,
                      nameOnCard: formData.nameOnCard,
                    }}
                    onFormChange={handleInputChange}
                    errors={formErrors}
                  />

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="saveInfo"
                      checked={formData.saveInfo}
                      onCheckedChange={(checked) => handleInputChange("saveInfo", checked as boolean)}
                    />
                    <Label htmlFor="saveInfo">Save payment information for next time</Label>
                  </div>

                  <div className="flex space-x-4">
                    <Button variant="outline" onClick={() => setCurrentStep(1)} className="flex-1">
                      Back
                    </Button>
                    <Button
                      onClick={() => {
                        if (validateStep(2)) setCurrentStep(3)
                      }}
                      className="flex-1"
                    >
                      Review Order
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {currentStep === 3 && (
              <Card>
                <CardHeader>
                  <CardTitle>Review Your Order</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="font-semibold mb-2">Shipping Address</h3>
                    <p className="text-sm text-muted">
                      {formData.firstName} {formData.lastName}
                      <br />
                      {formData.address}
                      <br />
                      {formData.city}, {formData.state} {formData.zipCode}
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Payment Method</h3>
                    <p className="text-sm text-muted">
                      {formData.paymentMethod === "visa" && "Visa"}
                      {formData.paymentMethod === "mastercard" && "Mastercard"}
                      {formData.paymentMethod === "amex" && "American Express"}
                      {formData.paymentMethod === "paypal" && "PayPal"}
                      {formData.paymentMethod === "apple-pay" && "Apple Pay"}
                      {formData.paymentMethod === "google-pay" && "Google Pay"}
                      {["visa", "mastercard", "amex"].includes(formData.paymentMethod) &&
                        formData.cardNumber &&
                        ` ending in ${formData.cardNumber.slice(-4)}`}
                    </p>
                  </div>

                  {paymentError && (
                    <Alert variant="destructive">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>{paymentError}</AlertDescription>
                    </Alert>
                  )}

                  <div className="flex items-center space-x-2 p-4 bg-accent/10 rounded-lg">
                    <Shield className="w-5 h-5 text-accent" />
                    <p className="text-sm">
                      <strong>Demo Mode:</strong> This is a test checkout. No real payment will be processed.
                    </p>
                  </div>

                  <div className="flex space-x-4">
                    <Button variant="outline" onClick={() => setCurrentStep(2)} className="flex-1">
                      Back
                    </Button>
                    <Button
                      onClick={handleSubmit}
                      disabled={isProcessing}
                      className="flex-1 bg-primary hover:bg-primary/90"
                    >
                      {isProcessing ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        `Place Order - $${finalTotal.toFixed(2)}`
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Order Summary */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {items.map((item) => (
                    <div key={item.product.id} className="flex items-center space-x-3">
                      <img
                        src={item.product.image || "/placeholder.svg"}
                        alt={item.product.name}
                        className="w-12 h-12 object-cover rounded"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium line-clamp-1">{item.product.name}</p>
                        <p className="text-xs text-muted">Qty: {item.quantity}</p>
                      </div>
                      <p className="text-sm font-medium">${(item.product.price * item.quantity).toFixed(2)}</p>
                    </div>
                  ))}
                </div>

                <Separator />

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal ({totalItems} items)</span>
                    <span>${totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Shipping</span>
                    <span>{shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Tax</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                </div>

                <Separator />

                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>${finalTotal.toFixed(2)}</span>
                </div>

                <div className="flex items-center space-x-2 text-xs text-muted">
                  <Shield className="w-3 h-3" />
                  <span>256-bit SSL encryption</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
