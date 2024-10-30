'use client'

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { ChevronLeft, Minus, Plus, ShoppingBag } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface ProductDetailProps {
  id?: string // URL param
}

export default function Component({ id = "1" }: ProductDetailProps) {
  const [quantity, setQuantity] = React.useState(1)
  const [selectedImage, setSelectedImage] = React.useState(0)

  // Simulated product data
  const product = {
    name: "Ceramic Vase",
    price: 89,
    description: "Hand-crafted ceramic vase with a minimalist design. Each piece is unique and features subtle variations in texture and glaze.",
    details: [
      "Height: 25cm",
      "Diameter: 12cm",
      "Material: Ceramic",
      "Color: Natural White",
      "Care: Hand wash only"
    ],
    images: [
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600"
    ]
  }

  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1)
  }

  const increaseQuantity = () => {
    setQuantity(quantity + 1)
  }

  return (
    <div className="min-h-screen bg-[#F5F2EE]">
      <div className="container mx-auto px-4 py-8">
        <Link
          href="/"
          className="inline-flex items-center text-[#2C2C2C] hover:text-[#1A1A1A] mb-8 group"
        >
          <ChevronLeft className="h-4 w-4 mr-2 transition-transform group-hover:-translate-x-1" />
          Back to store
        </Link>
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <div className="aspect-square relative bg-[#E2DCD5] rounded-sm overflow-hidden">
              <Image
                src={product.images[selectedImage]}
                alt={product.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square relative bg-[#E2DCD5] rounded-sm overflow-hidden ${
                    selectedImage === index ? "ring-2 ring-[#2C2C2C]" : ""
                  }`}
                >
                  <Image
                    src={image}
                    alt={`${product.name} view ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <h1 className="text-3xl font-light text-[#2C2C2C]">{product.name}</h1>
              <p className="text-2xl text-[#2C2C2C]">${product.price}</p>
            </div>
            <p className="text-[#6B6B6B] leading-relaxed">{product.description}</p>
            <Separator className="bg-[#E2DCD5]" />
            <div className="space-y-4">
              <h2 className="font-light text-[#2C2C2C]">Quantity</h2>
              <div className="flex items-center space-x-4">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={decreaseQuantity}
                  className="border-[#E2DCD5] hover:bg-[#E2DCD5]"
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-12 text-center text-[#2C2C2C]">{quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={increaseQuantity}
                  className="border-[#E2DCD5] hover:bg-[#E2DCD5]"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="space-y-4">
              <Select defaultValue="standard">
                <SelectTrigger className="border-[#E2DCD5] bg-transparent">
                  <SelectValue placeholder="Select shipping" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="standard">Standard Shipping (3-5 days)</SelectItem>
                  <SelectItem value="express">Express Shipping (1-2 days)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                className="flex-1 bg-[#2C2C2C] hover:bg-[#1A1A1A] text-[#F5F2EE]"
                onClick={() => alert("Proceeding to checkout...")}
              >
                Buy Now
              </Button>
              <Button
                variant="outline"
                className="flex-1 border-[#2C2C2C] hover:bg-[#E2DCD5]"
              >
                <ShoppingBag className="mr-2 h-4 w-4" />
                Add to Cart
              </Button>
            </div>
            <Separator className="bg-[#E2DCD5]" />
            <div className="space-y-4">
              <h2 className="font-light text-[#2C2C2C]">Product Details</h2>
              <ul className="space-y-2 text-[#6B6B6B]">
                {product.details.map((detail, index) => (
                  <li key={index} className="flex items-center">
                    <span className="w-2 h-2 bg-[#E2DCD5] rounded-full mr-3" />
                    {detail}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}