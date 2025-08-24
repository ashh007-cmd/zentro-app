"use client"

import { useAuth } from "@/lib/auth"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, ShoppingCart, Trash2, Star } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import CartSidebar from "@/components/cart-sidebar"
import UserMenu from "@/components/user-menu"
import { useCart } from "@/lib/cart"

// Mock wishlist data
const mockWishlistItems = [
  {
    id: "1",
    name: "Premium Wireless Headphones",
    price: 199.99,
    originalPrice: 249.99,
    image: "/premium-wireless-headphones-black.png",
    rating: 4.8,
    reviews: 124,
    inStock: true,
    onSale: true,
  },
  {
    id: "2",
    name: "Designer Cotton T-Shirt",
    price: 49.99,
    image: "/designer-cotton-t-shirt-white.png",
    rating: 4.6,
    reviews: 89,
    inStock: true,
    onSale: false,
  },
  {
    id: "3",
    name: "Luxury Watch Collection",
    price: 299.99,
    image: "/luxury-watch.png",
    rating: 4.9,
    reviews: 67,
    inStock: false,
    onSale: false,
  },
]

export default function WishlistPage() {
  const { user, isAuthenticated } = useAuth()
  const { addItem } = useCart()
  const router = useRouter()
  const [wishlistItems, setWishlistItems] = useState(mockWishlistItems)

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push("/")
    }
  }, [isAuthenticated, router])

  const removeFromWishlist = (itemId: string) => {
    setWishlistItems((items) => items.filter((item) => item.id !== itemId))
  }

  const addToCart = (item: any) => {
    addItem({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      quantity: 1,
    })
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Please sign in to view your wishlist</h1>
          <Link href="/">
            <Button>Go Home</Button>
          </Link>
        </div>
      </div>
    )
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
            <Link href="/dashboard" className="text-foreground hover:text-accent transition-colors">
              Dashboard
            </Link>
            <Link href="/products" className="text-foreground hover:text-accent transition-colors">
              Shop
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <CartSidebar />
            <UserMenu />
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">My Wishlist</h1>
          <p className="text-muted-foreground">Items you've saved for later</p>
        </div>

        {wishlistItems.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <Heart className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-xl font-semibold mb-2">Your wishlist is empty</h3>
              <p className="text-muted-foreground mb-6">Start adding items you love to your wishlist</p>
              <Link href="/products">
                <Button>Browse Products</Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishlistItems.map((item) => (
              <Card key={item.id} className="group hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  <div className="relative">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                    {item.onSale && <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">Sale</Badge>}
                    {!item.inStock && (
                      <Badge variant="secondary" className="absolute top-2 right-2">
                        Out of Stock
                      </Badge>
                    )}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-2 right-2 bg-white/80 hover:bg-white"
                      onClick={() => removeFromWishlist(item.id)}
                    >
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </Button>
                  </div>

                  <div className="p-4">
                    <h3 className="font-semibold mb-2 line-clamp-2">{item.name}</h3>

                    <div className="flex items-center space-x-1 mb-2">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{item.rating}</span>
                      <span className="text-sm text-muted-foreground">({item.reviews})</span>
                    </div>

                    <div className="flex items-center space-x-2 mb-4">
                      <span className="text-lg font-bold text-primary">${item.price}</span>
                      {item.originalPrice && (
                        <span className="text-sm text-muted-foreground line-through">${item.originalPrice}</span>
                      )}
                    </div>

                    <div className="flex space-x-2">
                      <Button className="flex-1" onClick={() => addToCart(item)} disabled={!item.inStock}>
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        {item.inStock ? "Add to Cart" : "Out of Stock"}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
