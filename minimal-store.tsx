'use client'

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { ShoppingBag, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface Product {
  id: number
  name: string
  price: number
  image: string
  category: string
}

export default function Component() {
  const [cartItems, setCartItems] = React.useState<Product[]>([])
  const [activeCategory, setActiveCategory] = React.useState("all")

  const products: Product[] = [
    {
      id: 1,
      name: "Ceramic Vase",
      price: 89,
      image: "/placeholder.svg?height=400&width=400",
      category: "home"
    },
    {
      id: 2,
      name: "Linen Throw",
      price: 45,
      image: "/placeholder.svg?height=400&width=400",
      category: "home"
    },
    {
      id: 3,
      name: "Minimalist Clock",
      price: 65,
      image: "/placeholder.svg?height=400&width=400",
      category: "accessories"
    },
    {
      id: 4,
      name: "Wooden Bowl",
      price: 35,
      image: "/placeholder.svg?height=400&width=400",
      category: "home"
    }
  ]

  const addToCart = (product: Product) => {
    setCartItems([...cartItems, product])
  }

  const removeFromCart = (productId: number) => {
    setCartItems(cartItems.filter(item => item.id !== productId))
  }

  const filteredProducts = activeCategory === "all" 
    ? products 
    : products.filter(product => product.category === activeCategory)

  return (
    <div className="min-h-screen bg-[#F5F2EE]">
      <header className="border-b border-[#E2DCD5] bg-[#FAF8F6]">
        <div className="container mx-auto px-6 py-6 flex items-center justify-between">
          <Link 
            href="/" 
            className="text-2xl font-light tracking-wide text-[#2C2C2C]"
          >
            MINIMAL
          </Link>
          <Sheet>
            <SheetTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                className="relative hover:bg-[#E2DCD5]"
              >
                <ShoppingBag className="h-5 w-5 text-[#2C2C2C]" />
                {cartItems.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#2C2C2C] text-[#F5F2EE] w-4 h-4 rounded-full text-xs flex items-center justify-center">
                    {cartItems.length}
                  </span>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent className="bg-[#FAF8F6] border-l border-[#E2DCD5]">
              <SheetHeader>
                <SheetTitle className="text-[#2C2C2C] font-light tracking-wide">Cart</SheetTitle>
              </SheetHeader>
              <div className="mt-8 space-y-4">
                {cartItems.map((item) => (
                  <motion.div 
                    key={item.id} 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex items-center gap-4"
                  >
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={60}
                      height={60}
                      className="rounded-sm object-cover bg-[#E2DCD5]"
                    />
                    <div className="flex-1">
                      <h3 className="font-light text-[#2C2C2C]">{item.name}</h3>
                      <p className="text-sm text-[#6B6B6B]">${item.price}</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeFromCart(item.id)}
                      className="hover:bg-[#E2DCD5]"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </motion.div>
                ))}
                {cartItems.length === 0 && (
                  <p className="text-center text-[#6B6B6B] font-light">Your cart is empty</p>
                )}
                {cartItems.length > 0 && (
                  <div className="border-t border-[#E2DCD5] pt-4">
                    <div className="flex justify-between text-[#2C2C2C]">
                      <span className="font-light">Total</span>
                      <span className="font-medium">
                        ${cartItems.reduce((sum, item) => sum + item.price, 0)}
                      </span>
                    </div>
                    <Button className="w-full mt-6 bg-[#2C2C2C] hover:bg-[#1A1A1A] text-[#F5F2EE]">
                      Checkout
                    </Button>
                  </div>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </header>
      <main className="container mx-auto px-6 py-12">
        <Tabs defaultValue="all" className="mb-12">
          <TabsList className="grid w-full max-w-[400px] grid-cols-3 bg-[#E2DCD5]">
            <TabsTrigger 
              value="all" 
              onClick={() => setActiveCategory("all")}
              className="data-[state=active]:bg-[#2C2C2C] data-[state=active]:text-[#F5F2EE]"
            >
              All
            </TabsTrigger>
            <TabsTrigger 
              value="home" 
              onClick={() => setActiveCategory("home")}
              className="data-[state=active]:bg-[#2C2C2C] data-[state=active]:text-[#F5F2EE]"
            >
              Home
            </TabsTrigger>
            <TabsTrigger 
              value="accessories" 
              onClick={() => setActiveCategory("accessories")}
              className="data-[state=active]:bg-[#2C2C2C] data-[state=active]:text-[#F5F2EE]"
            >
              Accessories
            </TabsTrigger>
          </TabsList>
        </Tabs>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {filteredProducts.map((product) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="group"
            >
              <Link href={`/product/${product.id}`}>
                <div className="relative aspect-[4/5] overflow-hidden bg-[#E2DCD5] rounded-sm">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/10" />
                </div>
                <div className="mt-4 space-y-1">
                  <h3 className="font-light text-[#2C2C2C] group-hover:text-[#1A1A1A]">
                    {product.name}
                  </h3>
                  <p className="text-[#6B6B6B]">${product.price}</p>
                </div>
              </Link>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileHover={{ opacity: 1, y: 0 }}
                className="mt-4"
              >
                <Button 
                  onClick={() => addToCart(product)}
                  className="w-full bg-[#2C2C2C] hover:bg-[#1A1A1A] text-[#F5F2EE]"
                >
                  Add to Cart
                </Button>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </main>
      <footer className="border-t border-[#E2DCD5] bg-[#FAF8F6]">
        <div className="container mx-auto px-6 py-8 text-center">
          <p className="text-sm text-[#6B6B6B] font-light tracking-wide">
            © 2024 MINIMAL. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}