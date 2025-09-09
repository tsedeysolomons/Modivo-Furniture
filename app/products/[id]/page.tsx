"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { useCart } from "@/contexts/cart-context";
import {
  Search,
  ShoppingCart,
  User,
  Menu,
  Star,
  Heart,
  ArrowRight,
  Minus,
  Plus,
  Share2,
  Truck,
  Shield,
  RotateCcw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export default function ProductDetailPage() {
  const params = useParams();
  const { state, addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState("beige");
  const [selectedSize, setSelectedSize] = useState("standard");

  // Mock product data - in real app this would come from API/database
  const product = {
    id: Number.parseInt(params.id as string) || 1,
    name: "Addis Comfort Sofa",
    price: 1299,
    originalPrice: 1599,
    images: [
      "/beige-sofa-ethiopian-style.png",
      "/placeholder.svg?height=600&width=600&text=Sofa+Side+View",
      "/placeholder.svg?height=600&width=600&text=Sofa+Back+View",
      "/placeholder.svg?height=600&width=600&text=Sofa+Detail",
    ],
    rating: 4.8,
    reviews: 124,
    category: "Sofas",
    material: "Premium Fabric",
    isNew: true,
    inStock: true,
    stockCount: 12,
    description:
      "Experience ultimate comfort with our Addis Comfort Sofa, inspired by traditional Ethiopian design elements. This luxurious 3-seater sofa features premium fabric upholstery with subtle Ethiopian-inspired patterns that add warmth and character to any living space.",
    features: [
      "Premium fabric upholstery with Ethiopian-inspired patterns",
      "Solid hardwood frame construction",
      "High-density foam cushioning for lasting comfort",
      "Removable and washable cushion covers",
      "Handcrafted by skilled Ethiopian artisans",
      'Dimensions: 84" W x 36" D x 32" H',
    ],
    colors: [
      { name: "beige", label: "Warm Beige", hex: "#d6cfc4" },
      { name: "brown", label: "Rich Brown", hex: "#8b4513" },
      { name: "cream", label: "Cream", hex: "#f5f5dc" },
    ],
    sizes: [
      { name: "standard", label: 'Standard (84")', price: 0 },
      { name: "large", label: 'Large (96")', price: 200 },
    ],
    specifications: {
      Dimensions: '84" W x 36" D x 32" H',
      Weight: "120 lbs",
      Material: "Premium Fabric, Hardwood Frame",
      "Color Options": "Beige, Brown, Cream",
      Assembly: "Minimal assembly required",
      Warranty: "5 years structural, 2 years fabric",
    },
  };

  const reviews = [
    {
      id: 1,
      name: "Sarah Johnson",
      rating: 5,
      date: "2024-01-15",
      comment:
        "Absolutely love this sofa! The Ethiopian-inspired design is beautiful and it's incredibly comfortable. The quality is outstanding.",
      verified: true,
    },
    {
      id: 2,
      name: "Michael Chen",
      rating: 4,
      date: "2024-01-10",
      comment:
        "Great sofa with unique design elements. Very comfortable and well-made. Delivery was smooth and professional.",
      verified: true,
    },
    {
      id: 3,
      name: "Emma Davis",
      rating: 5,
      date: "2024-01-05",
      comment:
        "This sofa exceeded my expectations. The craftsmanship is excellent and it fits perfectly in my living room. Highly recommend!",
      verified: true,
    },
  ];

  const relatedProducts = [
    {
      id: 2,
      name: "Habesha Dining Table",
      price: 899,
      image: "/ethiopian-dining-table.png",
      rating: 4.9,
      reviews: 89,
    },
    {
      id: 4,
      name: "Injera Coffee Table",
      price: 449,
      image: "/placeholder.svg?height=300&width=300&text=Coffee+Table",
      rating: 4.6,
      reviews: 78,
    },
    {
      id: 5,
      name: "Berbere Accent Chair",
      price: 599,
      image: "/placeholder.svg?height=300&width=300&text=Accent+Chair",
      rating: 4.5,
      reviews: 92,
    },
  ];

  const currentPrice =
    product.price +
    (product.sizes.find((s) => s.name === selectedSize)?.price || 0);
  const savings = product.originalPrice
    ? product.originalPrice - currentPrice
    : 0;

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: currentPrice,
      image: product.images[0],
      color: selectedColor,
      size: selectedSize,
      maxStock: product.stockCount,
      quantity,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
                <span className="text-accent-foreground font-bold text-lg font-serif">
                  M
                </span>
              </div>
              <span className="text-2xl font-bold font-serif text-foreground">
                Mogivo
              </span>
            </div>

            {/* Search Bar */}
            <div className="hidden md:flex flex-1 max-w-md mx-8">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search furniture & décor..."
                  className="pl-10 bg-muted/50 border-border focus:ring-accent"
                />
              </div>
            </div>

            {/* Navigation Icons */}
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon" className="hidden md:flex">
                <User className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center bg-accent text-accent-foreground text-xs">
                  {state.itemCount}
                </Badge>
              </Button>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Breadcrumb */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <a href="/" className="hover:text-accent transition-colors">
            Home
          </a>
          <span>/</span>
          <a href="/products" className="hover:text-accent transition-colors">
            Products
          </a>
          <span>/</span>
          <span className="text-foreground">{product.name}</span>
        </div>
      </div>

      <div className="container mx-auto px-4 pb-12">
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="relative aspect-square overflow-hidden rounded-lg bg-muted">
              <img
                src={product.images[selectedImage] || "/placeholder.svg"}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {product.isNew && (
                <Badge className="absolute top-4 left-4 bg-accent text-accent-foreground">
                  New
                </Badge>
              )}
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-4 right-4 bg-background/80 hover:bg-background"
              >
                <Heart className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-4 right-16 bg-background/80 hover:bg-background"
              >
                <Share2 className="h-5 w-5" />
              </Button>
            </div>

            {/* Thumbnail Images */}
            <div className="flex gap-2 overflow-x-auto">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                    selectedImage === index ? "border-accent" : "border-border"
                  }`}
                >
                  <img
                    src={image || "/placeholder.svg"}
                    alt={`${product.name} view ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="flex items-center">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-medium ml-1">
                    {product.rating}
                  </span>
                </div>
                <span className="text-sm text-muted-foreground">
                  ({product.reviews} reviews)
                </span>
                <Badge variant="outline" className="ml-2">
                  {product.category}
                </Badge>
              </div>
              <h1 className="text-3xl font-bold font-serif text-foreground mb-4">
                {product.name}
              </h1>
              <p className="text-muted-foreground leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Pricing */}
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <span className="text-3xl font-bold text-foreground">
                  ${currentPrice}
                </span>
                {product.originalPrice && (
                  <span className="text-xl text-muted-foreground line-through">
                    ${product.originalPrice}
                  </span>
                )}
                {savings > 0 && (
                  <Badge className="bg-green-100 text-green-800">
                    Save ${savings}
                  </Badge>
                )}
              </div>
              {product.inStock ? (
                <p className="text-sm text-green-600">
                  ✓ In stock ({product.stockCount} available)
                </p>
              ) : (
                <p className="text-sm text-red-600">Out of stock</p>
              )}
            </div>

            {/* Color Selection */}
            <div className="space-y-3">
              <h3 className="font-semibold text-foreground">
                Color:{" "}
                {product.colors.find((c) => c.name === selectedColor)?.label}
              </h3>
              <div className="flex gap-3">
                {product.colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color.name)}
                    className={`w-10 h-10 rounded-full border-2 transition-colors ${
                      selectedColor === color.name
                        ? "border-accent border-4"
                        : "border-border"
                    }`}
                    style={{ backgroundColor: color.hex }}
                    title={color.label}
                  />
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div className="space-y-3">
              <h3 className="font-semibold text-foreground">Size</h3>
              <div className="flex gap-3">
                {product.sizes.map((size) => (
                  <button
                    key={size.name}
                    onClick={() => setSelectedSize(size.name)}
                    className={`px-4 py-2 rounded-lg border transition-colors ${
                      selectedSize === size.name
                        ? "border-accent bg-accent/10 text-accent"
                        : "border-border hover:border-accent/50"
                    }`}
                  >
                    <div className="text-sm font-medium">{size.label}</div>
                    {size.price > 0 && (
                      <div className="text-xs text-muted-foreground">
                        +${size.price}
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity and Add to Cart */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-border rounded-lg">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="px-4 py-2 min-w-[3rem] text-center">
                    {quantity}
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setQuantity(quantity + 1)}
                    disabled={quantity >= product.stockCount}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <span className="text-sm text-muted-foreground">
                  Total: ${(currentPrice * quantity).toLocaleString()}
                </span>
              </div>

              <div className="flex gap-3">
                <Button
                  size="lg"
                  className="flex-1 bg-accent hover:bg-accent/90 text-accent-foreground"
                  disabled={!product.inStock}
                  onClick={handleAddToCart}
                >
                  Add to Cart
                </Button>
                <Button variant="outline" size="lg">
                  Buy Now
                </Button>
              </div>
            </div>

            {/* Features */}
            <div className="space-y-3">
              <div className="flex items-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Truck className="h-4 w-4" />
                  <span>Free shipping over $500</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  <span>5-year warranty</span>
                </div>
                <div className="flex items-center gap-2">
                  <RotateCcw className="h-4 w-4" />
                  <span>30-day returns</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <Tabs defaultValue="description" className="mb-16">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="description">Description</TabsTrigger>
            <TabsTrigger value="specifications">Specifications</TabsTrigger>
            <TabsTrigger value="reviews">
              Reviews ({product.reviews})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="description" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold font-serif mb-4">
                  Product Features
                </h3>
                <ul className="space-y-3">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="specifications" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold font-serif mb-4">
                  Specifications
                </h3>
                <div className="grid gap-4">
                  {Object.entries(product.specifications).map(
                    ([key, value]) => (
                      <div
                        key={key}
                        className="flex justify-between py-2 border-b border-border last:border-0"
                      >
                        <span className="font-medium text-foreground">
                          {key}
                        </span>
                        <span className="text-muted-foreground">{value}</span>
                      </div>
                    )
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reviews" className="mt-6">
            <div className="space-y-6">
              {/* Reviews Summary */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-6 mb-6">
                    <div className="text-center">
                      <div className="text-4xl font-bold text-foreground">
                        {product.rating}
                      </div>
                      <div className="flex items-center justify-center mt-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < Math.floor(product.rating)
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <div className="text-sm text-muted-foreground mt-1">
                        {product.reviews} reviews
                      </div>
                    </div>
                    <div className="flex-1">
                      {[5, 4, 3, 2, 1].map((stars) => (
                        <div
                          key={stars}
                          className="flex items-center gap-2 mb-1"
                        >
                          <span className="text-sm w-8">{stars}★</span>
                          <div className="flex-1 h-2 bg-muted rounded-full">
                            <div
                              className="h-full bg-yellow-400 rounded-full"
                              style={{
                                width: `${
                                  stars === 5 ? 70 : stars === 4 ? 20 : 10
                                }%`,
                              }}
                            />
                          </div>
                          <span className="text-sm text-muted-foreground w-8">
                            {stars === 5 ? "87" : stars === 4 ? "25" : "12"}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Individual Reviews */}
              <div className="space-y-4">
                {reviews.map((review) => (
                  <Card key={review.id}>
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <Avatar>
                          <AvatarFallback>
                            {review.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="font-semibold text-foreground">
                              {review.name}
                            </span>
                            {review.verified && (
                              <Badge variant="outline" className="text-xs">
                                Verified Purchase
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center gap-2 mb-2">
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${
                                    i < review.rating
                                      ? "fill-yellow-400 text-yellow-400"
                                      : "text-gray-300"
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="text-sm text-muted-foreground">
                              {review.date}
                            </span>
                          </div>
                          <p className="text-muted-foreground">
                            {review.comment}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Related Products */}
        <section>
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold font-serif text-foreground">
              You May Also Like
            </h2>
            <Button
              variant="outline"
              className="border-accent text-accent hover:bg-accent/10 bg-transparent"
            >
              View All
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {relatedProducts.map((relatedProduct) => (
              <Card
                key={relatedProduct.id}
                className="group cursor-pointer hover:shadow-xl transition-all duration-300 border-border bg-card"
              >
                <CardContent className="p-0">
                  <div className="relative overflow-hidden rounded-t-lg">
                    <img
                      src={relatedProduct.image || "/placeholder.svg"}
                      alt={relatedProduct.name}
                      className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <Button
                      size="icon"
                      variant="ghost"
                      className="absolute top-4 right-4 bg-background/80 hover:bg-background"
                    >
                      <Heart className="h-5 w-5" />
                    </Button>
                  </div>
                  <div className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium ml-1">
                          {relatedProduct.rating}
                        </span>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        ({relatedProduct.reviews})
                      </span>
                    </div>
                    <h3 className="font-semibold text-card-foreground mb-2 group-hover:text-accent transition-colors">
                      {relatedProduct.name}
                    </h3>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-foreground">
                        ${relatedProduct.price}
                      </span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="p-4 pt-0">
                  <Button
                    className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
                    onClick={() =>
                      addItem({
                        id: relatedProduct.id,
                        name: relatedProduct.name,
                        price: relatedProduct.price,
                        image: relatedProduct.image,
                        maxStock: 10,
                      })
                    }
                  >
                    Add to Cart
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
