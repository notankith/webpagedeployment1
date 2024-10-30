'use client'

import * as React from "react"
import { motion } from "framer-motion"
import { ChevronLeft, Loader2 } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function Component() {
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const router = useRouter()
  const [formData, setFormData] = React.useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    country: "",
    postalCode: "",
    shippingMethod: "standard"
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission delay
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // Redirect to thank you page
    router.push("/thank-you")
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  return (
    <div className="min-h-screen bg-[#F5F2EE]">
      <div className="container max-w-3xl mx-auto px-4 py-8">
        <Link
          href="/cart"
          className="inline-flex items-center text-[#2C2C2C] hover:text-[#1A1A1A] mb-8 group"
        >
          <ChevronLeft className="h-4 w-4 mr-2 transition-transform group-hover:-translate-x-1" />
          Back to cart
        </Link>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          <div>
            <h1 className="text-2xl font-light text-[#2C2C2C]">Checkout</h1>
            <p className="text-[#6B6B6B] mt-2">Please enter your shipping details</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid gap-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    required
                    className="border-[#E2DCD5] bg-white"
                    value={formData.firstName}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    required
                    className="border-[#E2DCD5] bg-white"
                    value={formData.lastName}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="border-[#E2DCD5] bg-white"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    className="border-[#E2DCD5] bg-white"
                    value={formData.phone}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  name="address"
                  required
                  className="border-[#E2DCD5] bg-white"
                  value={formData.address}
                  onChange={handleInputChange}
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    name="city"
                    required
                    className="border-[#E2DCD5] bg-white"
                    value={formData.city}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="postalCode">Postal Code</Label>
                  <Input
                    id="postalCode"
                    name="postalCode"
                    required
                    className="border-[#E2DCD5] bg-white"
                    value={formData.postalCode}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="country">Country</Label>
                <Select defaultValue="US">
                  <SelectTrigger className="border-[#E2DCD5] bg-white">
                    <SelectValue placeholder="Select country" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="US">United States</SelectItem>
                    <SelectItem value="UK">United Kingdom</SelectItem>
                    <SelectItem value="CA">Canada</SelectItem>
                    <SelectItem value="AU">Australia</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Separator className="bg-[#E2DCD5]" />

            <div className="space-y-4">
              <Label>Shipping Method</Label>
              <RadioGroup defaultValue="standard" className="grid gap-4">
                <Label
                  htmlFor="standard"
                  className="flex items-center justify-between rounded-lg border border-[#E2DCD5] p-4 cursor-pointer"
                >
                  <div className="flex items-center gap-4">
                    <RadioGroupItem value="standard" id="standard" />
                    <div>
                      <div className="font-medium">Standard Shipping</div>
                      <div className="text-sm text-[#6B6B6B]">3-5 business days</div>
                    </div>
                  </div>
                  <div className="font-medium">$5.00</div>
                </Label>
                <Label
                  htmlFor="express"
                  className="flex items-center justify-between rounded-lg border border-[#E2DCD5] p-4 cursor-pointer"
                >
                  <div className="flex items-center gap-4">
                    <RadioGroupItem value="express" id="express" />
                    <div>
                      <div className="font-medium">Express Shipping</div>
                      <div className="text-sm text-[#6B6B6B]">1-2 business days</div>
                    </div>
                  </div>
                  <div className="font-medium">$15.00</div>
                </Label>
              </RadioGroup>
            </div>

            <Button
              type="submit"
              className="w-full bg-[#2C2C2C] hover:bg-[#1A1A1A] text-[#F5F2EE]"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                "Proceed to Payment"
              )}
            </Button>
          </form>
        </motion.div>
      </div>
    </div>
  )
}