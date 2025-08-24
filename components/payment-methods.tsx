"use client"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { paymentMethods } from "@/lib/payment"

interface PaymentMethodsProps {
  selectedMethod: string
  onMethodChange: (method: string) => void
}

export default function PaymentMethods({ selectedMethod, onMethodChange }: PaymentMethodsProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Payment Method</h3>
      <RadioGroup value={selectedMethod} onValueChange={onMethodChange} className="space-y-3">
        {paymentMethods.map((method) => (
          <div key={method.id}>
            <Label
              htmlFor={method.id}
              className="flex items-center space-x-3 cursor-pointer p-4 rounded-lg border border-border hover:bg-card/50 transition-colors"
            >
              <RadioGroupItem value={method.id} id={method.id} />
              <div className="flex items-center space-x-3 flex-1">
                <span className="text-2xl">{method.icon}</span>
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <span className="font-medium">{method.name}</span>
                    {method.type === "digital" && <Badge variant="secondary">Fast</Badge>}
                  </div>
                  <p className="text-sm text-muted">{method.description}</p>
                </div>
              </div>
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  )
}
