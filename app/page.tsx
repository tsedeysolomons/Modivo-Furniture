import { ShoppingCart, User, Menu, Star, Heart, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { SearchBar } from "@/components/search-bar"
import Link from "next/link"

export default function HomePage() {
  const featuredProducts = [
    {
      id: 1,
      name: "Addis Comfort Sofa",
      price: 1299,
      originalPrice: 1599,
      image: "/beige-sofa-ethiopian-style.png",
      rating: 4.8,
      reviews: 124,
      category: "Sofas",
      isNew: true,
    },
    {
      id: 2,
      name: "Habesha Dining Table",
      price: 899,
      image: "/ethiopian-dining-table.png",
      rating: 4.9,
      reviews: 89,
      category: "Dining",
      isBestseller: true,
    },
    {
      id: 3,
      name: "Shiro Bedroom Set",
      price: 2199,
      originalPrice: 2599,
      image: "/placeholder-re2rx.png",
      rating: 4.7,
      reviews: 156,
      category: "Bedroom",
      isNew: true,
    },
    {
      id: 4,
      name: "Injera Coffee Table",
      price: 449,
      image: "/placeholder-8gnpw.png",
      rating: 4.6,
      reviews: 78,
      category: "Living Room",
    },
  ]

  const categories = [
    { name: "Sofas", image: "/placeholder-dv6ft.png", count: "120+ items" },
    { name: "Beds", image: "/bed-furniture-icon.png", count: "85+ items" },
    { name: "Dining", image: "/dining-table-icon.png", count: "95+ items" },
    { name: "Office", image: "/placeholder-t9mnr.png", count: "60+ items" },
    { name: "Storage", image: "/storage-furniture-icon.png", count: "110+ items" },
    { name: "Décor", image: "/placeholder-smfl6.png", count: "200+ items" },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
                <span className="text-accent-foreground font-bold text-lg font-serif">M</span>
              </div>
              <span className="text-2xl font-bold font-serif text-foreground">Mogivo</span>
            </Link>

            {/* Search Bar */}
            <div className="hidden md:flex flex-1 max-w-md mx-8">
              <SearchBar />
            </div>

            {/* Navigation Icons */}
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon" className="hidden md:flex">
                <User className="h-5 w-5" />
              </Button>
              <Link href="/cart">
                <Button variant="ghost" size="icon" className="relative">
                  <ShoppingCart className="h-5 w-5" />
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center bg-accent text-accent-foreground text-xs">
                    0
                  </Badge>
                </Button>
              </Link>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-primary/20 py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-6xl font-bold font-serif text-foreground leading-tight">
                Ethiopian-Inspired
                <span className="text-accent block">Home Furniture</span>
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Discover beautiful furniture that brings warmth and elegance to your home. Each piece is crafted with
                care, inspired by Ethiopian design traditions.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/products">
                  <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                    Shop Collection
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/products">
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-accent text-accent hover:bg-accent/10 bg-transparent"
                  >
                    View Catalog
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative">
              <img
                src="/placeholder-hojij.png"
                alt="Ethiopian-inspired furniture collection"
                className="rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold font-serif text-foreground mb-4">Shop by Category</h2>
            <p className="text-muted-foreground">Find the perfect pieces for every room in your home</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {categories.map((category, index) => (
              <Link key={index} href={`/products?category=${encodeURIComponent(category.name)}`}>
                <Card className="group cursor-pointer hover:shadow-lg transition-all duration-300 border-border bg-card">
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/20 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                      <img src={category.image || "/placeholder.svg"} alt={category.name} className="w-8 h-8" />
                    </div>
                    <h3 className="font-semibold text-card-foreground mb-1">{category.name}</h3>
                    <p className="text-sm text-muted-foreground">{category.count}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl font-bold font-serif text-foreground mb-4">Featured Collection</h2>
              <p className="text-muted-foreground">Handpicked pieces that embody Ethiopian craftsmanship</p>
            </div>
            <Link href="/products">
              <Button variant="outline" className="border-accent text-accent hover:bg-accent/10 bg-transparent">
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <Card
                key={product.id}
                className="group cursor-pointer hover:shadow-xl transition-all duration-300 border-border bg-card"
              >
                <CardContent className="p-0">
                  <div className="relative overflow-hidden rounded-t-lg">
                    <Link href={`/products/${product.id}`}>
                      <img
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </Link>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="absolute top-4 right-4 bg-background/80 hover:bg-background"
                    >
                      <Heart className="h-4 w-4" />
                    </Button>
                    {product.isNew && (
                      <Badge className="absolute top-4 left-4 bg-accent text-accent-foreground">New</Badge>
                    )}
                    {product.isBestseller && (
                      <Badge className="absolute top-4 left-4 bg-secondary text-secondary-foreground">Bestseller</Badge>
                    )}
                  </div>
                  <div className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium ml-1">{product.rating}</span>
                      </div>
                      <span className="text-sm text-muted-foreground">({product.reviews})</span>
                    </div>
                    <Link href={`/products/${product.id}`}>
                      <h3 className="font-semibold text-card-foreground mb-2 group-hover:text-accent transition-colors">
                        {product.name}
                      </h3>
                    </Link>
                    <p className="text-sm text-muted-foreground mb-3">{product.category}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold text-foreground">${product.price}</span>
                        {product.originalPrice && (
                          <span className="text-sm text-muted-foreground line-through">${product.originalPrice}</span>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="p-4 pt-0">
                  <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">Add to Cart</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Promotional Banner */}
      <section className="py-16 bg-accent/10">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold font-serif text-foreground mb-4">
              Free Delivery on Orders Over $500
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Experience the convenience of free shipping on all furniture orders. Transform your space with
              Ethiopian-inspired design.
            </p>
            <Link href="/products">
              <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                Start Shopping
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
                  <span className="text-accent-foreground font-bold text-lg font-serif">M</span>
                </div>
                <span className="text-xl font-bold font-serif text-card-foreground">Mogivo</span>
              </div>
              <p className="text-muted-foreground mb-4">
                Ethiopian-inspired furniture that brings warmth and elegance to your home.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-card-foreground mb-4">Categories</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <Link href="/products?category=Sofas" className="hover:text-accent transition-colors">
                    Sofas
                  </Link>
                </li>
                <li>
                  <Link href="/products?category=Beds" className="hover:text-accent transition-colors">
                    Beds
                  </Link>
                </li>
                <li>
                  <Link href="/products?category=Dining" className="hover:text-accent transition-colors">
                    Dining
                  </Link>
                </li>
                <li>
                  <Link href="/products?category=Office" className="hover:text-accent transition-colors">
                    Office
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-card-foreground mb-4">Support</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-accent transition-colors">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-accent transition-colors">
                    Shipping Info
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-accent transition-colors">
                    Returns
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-accent transition-colors">
                    FAQ
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-card-foreground mb-4">Connect</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-accent transition-colors">
                    Newsletter
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-accent transition-colors">
                    Instagram
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-accent transition-colors">
                    Facebook
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-accent transition-colors">
                    Twitter
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border mt-8 pt-8 text-center text-muted-foreground">
            <p>&copy; 2024 Mogivo Furniture. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
