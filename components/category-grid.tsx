import { Card, CardContent } from "@/components/ui/card"
import { categories } from "@/lib/products"
import Link from "next/link"

export default function CategoryGrid() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {categories.map((category) => (
        <Link key={category.id} href={`/categories/${category.id}`}>
          <Card className="hover:shadow-md transition-all duration-300 hover:-translate-y-1 cursor-pointer">
            <CardContent className="p-6 text-center">
              <div className="text-3xl mb-2">{category.icon}</div>
              <h3 className="font-medium text-sm">{category.name}</h3>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  )
}
