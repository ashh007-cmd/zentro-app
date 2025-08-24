"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { CreditCard, Shield, AlertCircle } from "lucide-react"
import { validateCardNumber, formatCardNumber, formatExpiryDate, getCardType } from "@/lib/payment"

interface PaymentFormProps {
  paymentMethod: string
  formData: {
    cardNumber: string
    expiryDate: string
    cvv: string
    nameOnCard: string
  }
  onFormChange: (field: string, value: string) => void
  errors: Record<string, string>
}

export default function PaymentForm({ paymentMethod, formData, onFormChange, errors }: PaymentFormProps) {
  const [cardType, setCardType] = useState<string>("unknown")
  const [isCardValid, setIsCardValid] = useState<boolean>(false)

  useEffect(() => {
    const type = getCardType(formData.cardNumber)
    setCardType(type)
    setIsCardValid(validateCardNumber(formData.cardNumber))
  }, [formData.cardNumber])

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCardNumber(e.target.value)
    onFormChange("cardNumber", formatted)
  }

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatExpiryDate(e.target.value)
    onFormChange("expiryDate", formatted)
  }

  if (paymentMethod === "paypal") {
    return (
      <div className="space-y-4">
        <div className="p-6 bg-blue-50 rounded-lg border border-blue-200">
          <div className="flex items-center space-x-3 mb-4">
            <span className="text-2xl">🅿️</span>
            <div>
              <h3 className="font-semibold text-blue-900">PayPal</h3>
              <p className="text-sm text-blue-700">You'll be redirected to PayPal to complete your payment</p>
            </div>
          </div>
          <div className="flex items-center space-x-2 text-sm text-blue-700">
            <Shield className="w-4 h-4" />
            <span>Secure payment powered by PayPal</span>
          </div>
        </div>
      </div>
    )
  }

  if (paymentMethod === "apple-pay") {
    return (
      <div className="space-y-4">
        <div className="p-6 bg-gray-50 rounded-lg border border-gray-200">
          <div className="flex items-center space-x-3 mb-4">
            <span className="text-2xl">🍎</span>
            <div>
              <h3 className="font-semibold text-gray-900">Apple Pay</h3>
              <p className="text-sm text-gray-700">Use Touch ID or Face ID to pay securely</p>
            </div>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-700">
            <Shield className="w-4 h-4" />
            <span>Your payment info is protected by Apple</span>
          </div>
        </div>
      </div>
    )
  }

  if (paymentMethod === "google-pay") {
    return (
      <div className="space-y-4">
        <div className="p-6 bg-green-50 rounded-lg border border-green-200">
          <div className="flex items-center space-x-3 mb-4">
            <span className="text-2xl">🔵</span>
            <div>
              <h3 className="font-semibold text-green-900">Google Pay</h3>
              <p className="text-sm text-green-700">Pay quickly and securely with Google</p>
            </div>
          </div>
          <div className="flex items-center space-x-2 text-sm text-green-700">
            <Shield className="w-4 h-4" />
            <span>Protected by Google's security</span>
          </div>
        </div>
      </div>
    )
  }

  // Card payment form
  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2 mb-4">
        <CreditCard className="w-5 h-5 text-muted" />
        <h3 className="text-lg font-semibold">Card Information</h3>
        <div className="flex items-center space-x-2">
          <Shield className="w-4 h-4 text-green-600" />
          <span className="text-sm text-green-600">Secure</span>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="cardNumber">Card Number</Label>
        <div className="relative">
          <Input
            id="cardNumber"
            value={formData.cardNumber}
            onChange={handleCardNumberChange}
            placeholder="1234 5678 9012 3456"
            maxLength={19}
            className={`pr-20 ${errors.cardNumber ? "border-destructive" : ""}`}
          />
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
            {cardType !== "unknown" && (
              <Badge variant="outline" className="text-xs">
                {cardType.toUpperCase()}
              </Badge>
            )}
            {formData.cardNumber && (
              <div className={`w-2 h-2 rounded-full ${isCardValid ? "bg-green-500" : "bg-red-500"}`} />
            )}
          </div>
        </div>
        {errors.cardNumber && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{errors.cardNumber}</AlertDescription>
          </Alert>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="expiryDate">Expiry Date</Label>
          <Input
            id="expiryDate"
            value={formData.expiryDate}
            onChange={handleExpiryChange}
            placeholder="MM/YY"
            maxLength={5}
            className={errors.expiryDate ? "border-destructive" : ""}
          />
          {errors.expiryDate && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{errors.expiryDate}</AlertDescription>
            </Alert>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="cvv">CVV</Label>
          <Input
            id="cvv"
            value={formData.cvv}
            onChange={(e) => onFormChange("cvv", e.target.value.replace(/\D/g, "").substring(0, 4))}
            placeholder="123"
            maxLength={4}
            className={errors.cvv ? "border-destructive" : ""}
          />
          {errors.cvv && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{errors.cvv}</AlertDescription>
            </Alert>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="nameOnCard">Cardholder Name</Label>
        <Input
          id="nameOnCard"
          value={formData.nameOnCard}
          onChange={(e) => onFormChange("nameOnCard", e.target.value)}
          placeholder="John Doe"
          className={errors.nameOnCard ? "border-destructive" : ""}
        />
        {errors.nameOnCard && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{errors.nameOnCard}</AlertDescription>
          </Alert>
        )}
      </div>

      <div className="p-3 bg-muted/50 rounded-lg">
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Shield className="w-4 h-4" />
          <span>Your payment information is encrypted and secure</span>
        </div>
      </div>
    </div>
  )
}
