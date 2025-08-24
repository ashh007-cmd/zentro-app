"use client"

export interface PaymentMethod {
  id: string
  name: string
  type: "card" | "digital" | "bank"
  icon: string
  description: string
  processingTime: number // in milliseconds
}

export const paymentMethods: PaymentMethod[] = [
  {
    id: "visa",
    name: "Visa",
    type: "card",
    icon: "💳",
    description: "Credit or Debit Card",
    processingTime: 2000,
  },
  {
    id: "mastercard",
    name: "Mastercard",
    type: "card",
    icon: "💳",
    description: "Credit or Debit Card",
    processingTime: 2000,
  },
  {
    id: "amex",
    name: "American Express",
    type: "card",
    icon: "💳",
    description: "Credit Card",
    processingTime: 2500,
  },
  {
    id: "paypal",
    name: "PayPal",
    type: "digital",
    icon: "🅿️",
    description: "Pay with your PayPal account",
    processingTime: 1500,
  },
  {
    id: "apple-pay",
    name: "Apple Pay",
    type: "digital",
    icon: "🍎",
    description: "Touch ID or Face ID",
    processingTime: 1000,
  },
  {
    id: "google-pay",
    name: "Google Pay",
    type: "digital",
    icon: "🔵",
    description: "Pay with Google",
    processingTime: 1000,
  },
]

export interface PaymentResult {
  success: boolean
  transactionId?: string
  error?: string
  processingTime: number
}

export const processPayment = async (
  paymentMethodId: string,
  amount: number,
  cardDetails?: {
    number: string
    expiry: string
    cvv: string
    name: string
  },
): Promise<PaymentResult> => {
  const paymentMethod = paymentMethods.find((pm) => pm.id === paymentMethodId)
  if (!paymentMethod) {
    return { success: false, error: "Invalid payment method", processingTime: 0 }
  }

  // Simulate processing time
  await new Promise((resolve) => setTimeout(resolve, paymentMethod.processingTime))

  // Demo validation logic
  if (paymentMethod.type === "card" && cardDetails) {
    // Simulate card validation
    if (cardDetails.number.length < 16) {
      return { success: false, error: "Invalid card number", processingTime: paymentMethod.processingTime }
    }
    if (cardDetails.cvv.length < 3) {
      return { success: false, error: "Invalid CVV", processingTime: paymentMethod.processingTime }
    }
    if (!cardDetails.name.trim()) {
      return { success: false, error: "Cardholder name required", processingTime: paymentMethod.processingTime }
    }

    // Simulate occasional failures for realism
    if (Math.random() < 0.05) {
      // 5% chance of failure
      return {
        success: false,
        error: "Payment declined by bank. Please try a different card.",
        processingTime: paymentMethod.processingTime,
      }
    }
  }

  // Generate mock transaction ID
  const transactionId = `TXN-${Date.now()}-${Math.random().toString(36).substr(2, 6).toUpperCase()}`

  return {
    success: true,
    transactionId,
    processingTime: paymentMethod.processingTime,
  }
}

export const validateCardNumber = (number: string): boolean => {
  // Remove spaces and non-digits
  const cleaned = number.replace(/\D/g, "")

  // Check length
  if (cleaned.length < 13 || cleaned.length > 19) return false

  // Luhn algorithm for basic validation
  let sum = 0
  let isEven = false

  for (let i = cleaned.length - 1; i >= 0; i--) {
    let digit = Number.parseInt(cleaned.charAt(i), 10)

    if (isEven) {
      digit *= 2
      if (digit > 9) {
        digit -= 9
      }
    }

    sum += digit
    isEven = !isEven
  }

  return sum % 10 === 0
}

export const formatCardNumber = (value: string): string => {
  const cleaned = value.replace(/\D/g, "")
  const match = cleaned.match(/(\d{1,4})(\d{1,4})?(\d{1,4})?(\d{1,4})?/)
  if (!match) return cleaned

  return [match[1], match[2], match[3], match[4]].filter(Boolean).join(" ")
}

export const formatExpiryDate = (value: string): string => {
  const cleaned = value.replace(/\D/g, "")
  if (cleaned.length >= 2) {
    return cleaned.substring(0, 2) + "/" + cleaned.substring(2, 4)
  }
  return cleaned
}

export const getCardType = (number: string): string => {
  const cleaned = number.replace(/\D/g, "")

  if (/^4/.test(cleaned)) return "visa"
  if (/^5[1-5]/.test(cleaned)) return "mastercard"
  if (/^3[47]/.test(cleaned)) return "amex"
  if (/^6/.test(cleaned)) return "discover"

  return "unknown"
}
