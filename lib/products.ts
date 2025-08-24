export interface Product {
  id: string
  name: string
  description: string
  price: number
  originalPrice?: number
  image: string
  category: string
  rating: number
  reviews: number
  inStock: boolean
  featured?: boolean
  tags: string[]
}

export const categories = [
  { id: "electronics", name: "Electronics", icon: "📱" },
  { id: "fashion", name: "Fashion", icon: "👕" },
  { id: "home", name: "Home & Garden", icon: "🏠" },
  { id: "sports", name: "Sports & Fitness", icon: "⚽" },
  { id: "books", name: "Books", icon: "📚" },
  { id: "beauty", name: "Beauty & Health", icon: "💄" },
]

export const products: Product[] = [
  {
    id: "1",
    name: "Premium Wireless Headphones",
    description: "High-quality wireless headphones with noise cancellation and premium sound quality.",
    price: 299.99,
    originalPrice: 399.99,
    image: "/premium-wireless-headphones-black.png",
    category: "electronics",
    rating: 4.8,
    reviews: 1247,
    inStock: true,
    featured: true,
    tags: ["wireless", "noise-cancelling", "premium"],
  },
  {
    id: "2",
    name: "Designer Cotton T-Shirt",
    description: "Comfortable and stylish cotton t-shirt with modern design and premium fabric.",
    price: 49.99,
    originalPrice: 69.99,
    image: "/designer-cotton-t-shirt-white.png",
    category: "fashion",
    rating: 4.6,
    reviews: 892,
    inStock: true,
    featured: true,
    tags: ["cotton", "designer", "comfortable"],
  },
  {
    id: "3",
    name: "Smart Home Security Camera",
    description: "Advanced security camera with AI detection, night vision, and mobile app control.",
    price: 199.99,
    image: "/smart-security-camera-white-modern.png",
    category: "electronics",
    rating: 4.7,
    reviews: 634,
    inStock: true,
    featured: true,
    tags: ["smart", "security", "AI"],
  },
  {
    id: "4",
    name: "Ergonomic Office Chair",
    description: "Professional ergonomic office chair with lumbar support and adjustable height.",
    price: 349.99,
    image: "/ergonomic-office-chair-black-modern.png",
    category: "home",
    rating: 4.9,
    reviews: 456,
    inStock: true,
    tags: ["ergonomic", "office", "comfortable"],
  },
  {
    id: "5",
    name: "Fitness Tracker Watch",
    description: "Advanced fitness tracker with heart rate monitoring, GPS, and long battery life.",
    price: 149.99,
    originalPrice: 199.99,
    image: "/fitness-tracker-watch-black-sport.png",
    category: "sports",
    rating: 4.5,
    reviews: 1089,
    inStock: true,
    featured: true,
    tags: ["fitness", "tracker", "GPS"],
  },
  {
    id: "6",
    name: "Premium Skincare Set",
    description: "Complete skincare routine with natural ingredients and dermatologist-tested formulas.",
    price: 89.99,
    image: "/premium-skincare-set-bottles-elegant.png",
    category: "beauty",
    rating: 4.8,
    reviews: 723,
    inStock: true,
    tags: ["skincare", "natural", "premium"],
  },
  {
    id: "7",
    name: "Bestselling Novel Collection",
    description: "Collection of three bestselling novels from award-winning authors.",
    price: 34.99,
    originalPrice: 49.99,
    image: "/book-collection-novels-stack.png",
    category: "books",
    rating: 4.7,
    reviews: 312,
    inStock: true,
    tags: ["books", "bestseller", "collection"],
  },
  {
    id: "8",
    name: "Wireless Charging Pad",
    description: "Fast wireless charging pad compatible with all Qi-enabled devices.",
    price: 39.99,
    image: "/wireless-charging-pad-black-sleek.png",
    category: "electronics",
    rating: 4.4,
    reviews: 567,
    inStock: true,
    tags: ["wireless", "charging", "fast"],
  },
]

export function getFeaturedProducts(): Product[] {
  return products.filter((product) => product.featured)
}

export function getProductsByCategory(categoryId: string): Product[] {
  return products.filter((product) => product.category === categoryId)
}

export function getProductById(id: string): Product | undefined {
  return products.find((product) => product.id === id)
}
