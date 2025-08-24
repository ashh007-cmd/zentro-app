# Zentro - Premium E-Commerce Store

A modern, production-ready e-commerce store built with Next.js, featuring a complete shopping experience with demo functionality.

## 🚀 Features

### Customer Features
- **Animated Splash Screen** with Zentro branding and logo animation
- **Product Catalog** with categories, search, and filtering
- **Shopping Cart** with persistent state and real-time updates
- **Checkout Flow** with multi-step process and form validation
- **User Authentication** with profile management (demo accounts)
- **User Dashboard** with order history, wishlist, and account settings
- **Responsive Design** optimized for all devices

### Admin Features
- **Admin Dashboard** with comprehensive analytics and overview
- **Product Management** with full CRUD operations
- **Order Management** with status tracking and customer details
- **User Management** for customer account oversight
- **Secure Admin Authentication** with role-based access

## 💳 Payment Information

**⚠️ IMPORTANT: Payment is demo-only in test mode, no real transactions are processed.**

The checkout system simulates payment processing for demonstration purposes only. No actual charges will be made to any payment methods entered during the demo.

## 🔐 Demo Accounts

### Customer Accounts
- **Email:** demo@zentro.com
- **Password:** Any password (demo mode)

### Admin Accounts
- **Admin:** admin@zentro.com (any password)
- **Super Admin:** super@zentro.com (any password)

## 🛠️ Tech Stack

- **Framework:** Next.js 14 with App Router
- **Styling:** Tailwind CSS with custom design system
- **UI Components:** shadcn/ui component library
- **State Management:** Zustand for cart and authentication
- **Icons:** Lucide React
- **TypeScript:** Full type safety throughout

## 🎨 Design System

- **Brand Colors:** Premium gradient palette with semantic tokens
- **Typography:** Modern font hierarchy with Geist font family
- **Components:** Consistent design language across all interfaces
- **Animations:** Smooth transitions and micro-interactions

## 📱 Pages & Features

### Public Pages
- `/` - Homepage with hero section and featured products
- `/products` - Product catalog with search and filtering
- `/products/[id]` - Individual product pages with details
- `/cart` - Shopping cart management
- `/checkout` - Multi-step checkout process
- `/checkout/success` - Order confirmation

### User Dashboard
- `/dashboard` - User overview with stats and quick actions
- `/profile` - Account settings and personal information
- `/orders` - Order history and tracking
- `/dashboard/wishlist` - Saved products for later
- `/dashboard/addresses` - Delivery address management

### Admin Panel
- `/admin` - Admin login page
- `/admin/dashboard` - Admin overview with analytics
- `/admin/products` - Product management interface
- `/admin/orders` - Order processing and management
- `/admin/users` - Customer account management

## 🚀 Getting Started

1. **Clone the repository**
   \`\`\`bash
   git clone https://github.com/vercel/commerce.git
   cd commerce
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   pnpm i   # or npm i / yarn
   \`\`\`

3. **Start development server**
   \`\`\`bash
   pnpm dev
   \`\`\`

4. **Open your browser**
   Navigate to `http://localhost:3000`

## 📦 Project Structure

\`\`\`
zentro-store/
├── app/                    # Next.js app directory
│   ├── admin/             # Admin panel pages
│   ├── dashboard/         # User dashboard pages
│   ├── products/          # Product catalog pages
│   ├── checkout/          # Checkout flow pages
│   └── ...
├── components/            # Reusable UI components
├── lib/                   # Utility functions and data
└── public/               # Static assets and images
\`\`\`

## 🔧 Configuration

The application uses environment variables for configuration. All demo functionality works out of the box without additional setup.

## 📄 License

This project is for demonstration purposes. Please check the original Vercel Commerce license for usage rights.

---

**Built with ❤️ using Vercel's v0 AI assistant**
