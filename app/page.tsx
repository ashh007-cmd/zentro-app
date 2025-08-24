"use client"

import { useState } from "react"
import SplashScreen from "@/components/splash-screen"
import ProductCard from "@/components/product-card"
import CategoryGrid from "@/components/category-grid"
import CartSidebar from "@/components/cart-sidebar"
import AuthDialog from "@/components/auth-dialog"
import UserMenu from "@/components/user-menu"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Star, Truck, Shield, Search, TrendingUp } from "lucide-react"
import { getFeaturedProducts } from "@/lib/products"
import { useAuth } from "@/lib/auth"
import Link from "next/link"

export default function HomePage() {
  const [showSplash, setShowSplash] = useState(true)
  const { isAuthenticated } = useAuth()
  const featuredProducts = getFeaturedProducts()

  if (showSplash) {
    return <SplashScreen onComplete={() => setShowSplash(false)} />
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
            <Link href="/products" className="text-foreground hover:text-accent transition-colors">
              Shop
            </Link>
            <Link href="/categories" className="text-foreground hover:text-accent transition-colors">
              Categories
            </Link>
            <Link href="/about" className="text-foreground hover:text-accent transition-colors">
              About
            </Link>
            <Link href="/contact" className="text-foreground hover:text-accent transition-colors">
              Contact
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted w-4 h-4" />
                <Input placeholder="Search products..." className="pl-10 w-64" />
              </div>
            </div>
            {isAuthenticated ? (
              <UserMenu />
            ) : (
              <AuthDialog>
                <Button variant="ghost" size="sm">
                  Sign In
                </Button>
              </AuthDialog>
            )}
            <CartSidebar />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-background via-card/30 to-background">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
            Welcome to <span className="text-accent">Zentro</span>
          </h1>
          <p className="text-xl text-muted mb-8 max-w-2xl mx-auto">
            Discover premium products with an exceptional shopping experience. Quality, style, and convenience all in
            one place.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/products">
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                Start Shopping
              </Button>
            </Link>
            <Link href="/categories">
              <Button size="lg" variant="outline">
                View Collections
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-foreground">Shop by Category</h2>
            <Link href="/categories">
              <Button variant="outline">View All Categories</Button>
            </Link>
          </div>
          <CategoryGrid />
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 px-4 bg-card/30">
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-2">Featured Products</h2>
              <p className="text-muted">Handpicked items just for you</p>
            </div>
            <Link href="/products">
              <Button variant="outline">
                <TrendingUp className="w-4 h-4 mr-2" />
                View All Products
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center text-foreground mb-12">Why Choose Zentro?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardHeader>
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Star className="w-6 h-6 text-accent" />
                </div>
                <CardTitle>Premium Quality</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Carefully curated products that meet the highest standards of quality and craftsmanship.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Truck className="w-6 h-6 text-accent" />
                </div>
                <CardTitle>Fast Delivery</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Quick and reliable shipping to get your orders to you as fast as possible.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-6 h-6 text-accent" />
                </div>
                <CardTitle>Secure Shopping</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Your data and transactions are protected with industry-leading security measures.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 px-4 bg-primary text-primary-foreground">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
          <p className="text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter and be the first to know about new products, exclusive deals, and special
            offers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <Input placeholder="Enter your email" className="bg-primary-foreground text-foreground" />
            <Button variant="secondary">Subscribe</Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-12 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                  <span className="text-sm font-bold text-primary-foreground">Z</span>
                </div>
                <span className="text-xl font-bold">ZENTRO</span>
              </div>
              <p className="text-muted mb-4">Premium Shopping Experience</p>
              <p className="text-sm text-muted">Payment is demo-only in test mode, no real transactions.</p>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Shop</h3>
              <ul className="space-y-2 text-sm text-muted">
                <li>
                  <Link href="/products" className="hover:text-accent transition-colors">
                    All Products
                  </Link>
                </li>
                <li>
                  <Link href="/categories" className="hover:text-accent transition-colors">
                    Categories
                  </Link>
                </li>
                <li>
                  <Link href="/deals" className="hover:text-accent transition-colors">
                    Deals
                  </Link>
                </li>
                <li>
                  <Link href="/new" className="hover:text-accent transition-colors">
                    New Arrivals
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-sm text-muted">
                <li>
                  <Link href="/help" className="hover:text-accent transition-colors">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-accent transition-colors">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link href="/shipping" className="hover:text-accent transition-colors">
                    Shipping Info
                  </Link>
                </li>
                <li>
                  <Link href="/returns" className="hover:text-accent transition-colors">
                    Returns
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-sm text-muted">
                <li>
                  <Link href="/about" className="hover:text-accent transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/careers" className="hover:text-accent transition-colors">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="hover:text-accent transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:text-accent transition-colors">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-border mt-8 pt-8 text-center">
            <p className="text-sm text-muted">© 2024 Zentro. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
