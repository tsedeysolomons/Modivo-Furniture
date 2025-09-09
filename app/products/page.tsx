"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import {
  Search,
  ShoppingCart,
  User,
  Menu,
  Star,
  Heart,
  Grid3X3,
  List,
  SlidersHorizontal,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useCart } from "@/contexts/cart-context";
import { useSearch } from "@/contexts/search-context";
import { SearchBar } from "@/components/search-bar";
import Link from "next/link";

export default function ProductsPage() {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("q") || "";

  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [priceRange, setPriceRange] = useState([0, 3000]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("featured");
  const { state, addItem } = useCart();
  const { state: searchState, setQuery } = useSearch();

  // Set search query from URL params
  useEffect(() => {
    if (searchQuery && searchQuery !== searchState.query) {
      setQuery(searchQuery);
    }
  }, [searchQuery, searchState.query, setQuery]);

  const allProducts = [
    {
      id: 1,
      name: "Addis Comfort Sofa",
      price: 1299,
      originalPrice: 1599,
      image: "/beige-sofa-ethiopian-style.png",
      rating: 4.8,
      reviews: 124,
      category: "Sofas",
      material: "Fabric",
      isNew: true,
      description:
        "Luxurious 3-seater sofa with Ethiopian-inspired patterns and premium comfort.",
      tags: ["ethiopian", "comfort", "living room", "sofa", "fabric"],
    },
    {
      id: 2,
      name: "Habesha Dining Table",
      price: 899,
      image: "/ethiopian-dining-table.png",
      rating: 4.9,
      reviews: 89,
      category: "Dining",
      material: "Wood",
      isBestseller: true,
      description:
        "Handcrafted dining table featuring traditional Ethiopian woodwork techniques.",
      tags: ["ethiopian", "dining", "wood", "handcrafted", "traditional"],
    },
    {
      id: 3,
      name: "Shiro Bedroom Set",
      price: 2199,
      originalPrice: 2599,
      image: "/placeholder.svg?height=300&width=300&text=Bedroom+Set",
      rating: 4.7,
      reviews: 156,
      category: "Bedroom",
      material: "Wood",
      isNew: true,
      description:
        "Complete bedroom set with bed frame, nightstands, and dresser in warm wood tones.",
      tags: ["bedroom", "set", "wood", "complete", "warm tones"],
    },
    {
      id: 4,
      name: "Injera Coffee Table",
      price: 449,
      image: "/placeholder.svg?height=300&width=300&text=Coffee+Table",
      rating: 4.6,
      reviews: 78,
      category: "Living Room",
      material: "Wood",
      description:
        "Round coffee table inspired by traditional Ethiopian serving platters.",
      tags: ["coffee table", "round", "ethiopian", "living room", "wood"],
    },
    {
      id: 5,
      name: "Berbere Accent Chair",
      price: 599,
      image: "/placeholder.svg?height=300&width=300&text=Accent+Chair",
      rating: 4.5,
      reviews: 92,
      category: "Chairs",
      material: "Fabric",
      description:
        "Vibrant accent chair with spice-inspired colors and comfortable cushioning.",
      tags: ["accent chair", "vibrant", "spice", "comfortable", "fabric"],
    },
    {
      id: 6,
      name: "Teff Storage Cabinet",
      price: 799,
      image: "/placeholder.svg?height=300&width=300&text=Storage+Cabinet",
      rating: 4.4,
      reviews: 67,
      category: "Storage",
      material: "Wood",
      description:
        "Multi-purpose storage cabinet with traditional Ethiopian design elements.",
      tags: ["storage", "cabinet", "multi-purpose", "ethiopian", "wood"],
    },
    {
      id: 7,
      name: "Meskel Office Desk",
      price: 1099,
      image: "/placeholder.svg?height=300&width=300&text=Office+Desk",
      rating: 4.7,
      reviews: 134,
      category: "Office",
      material: "Wood",
      description:
        "Executive desk with built-in storage and Ethiopian-inspired carved details.",
      tags: ["office", "desk", "executive", "storage", "carved details"],
    },
    {
      id: 8,
      name: "Lalibela Bookshelf",
      price: 649,
      image: "/placeholder.svg?height=300&width=300&text=Bookshelf",
      rating: 4.6,
      reviews: 88,
      category: "Storage",
      material: "Wood",
      description:
        "Tall bookshelf with architectural details inspired by Ethiopian rock churches.",
      tags: [
        "bookshelf",
        "tall",
        "architectural",
        "ethiopian",
        "rock churches",
      ],
    },
  ];

  const categories = [
    "Sofas",
    "Dining",
    "Bedroom",
    "Living Room",
    "Chairs",
    "Storage",
    "Office",
  ];
  const materials = ["Wood", "Fabric", "Metal", "Leather"];

  // Enhanced filtering with search functionality
  const filteredProducts = allProducts.filter((product) => {
    const categoryMatch =
      selectedCategories.length === 0 ||
      selectedCategories.includes(product.category);
    const materialMatch =
      selectedMaterials.length === 0 ||
      selectedMaterials.includes(product.material);
    const priceMatch =
      product.price >= priceRange[0] && product.price <= priceRange[1];

    // Search functionality
    let searchMatch = true;
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      searchMatch =
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query) ||
        product.material.toLowerCase().includes(query) ||
        product.tags.some((tag) => tag.toLowerCase().includes(query));
    }

    return categoryMatch && materialMatch && priceMatch && searchMatch;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "rating":
        return b.rating - a.rating;
      case "newest":
        return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
      default:
        return 0;
    }
  });

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const toggleMaterial = (material: string) => {
    setSelectedMaterials((prev) =>
      prev.includes(material)
        ? prev.filter((m) => m !== material)
        : [...prev, material]
    );
  };

  const clearAllFilters = () => {
    setSelectedCategories([]);
    setSelectedMaterials([]);
    setPriceRange([0, 3000]);
  };

  const FilterSidebar = () => (
    <div className="space-y-6">
      {/* Active Filters */}
      {(selectedCategories.length > 0 ||
        selectedMaterials.length > 0 ||
        searchQuery) && (
        <div>
          <h3 className="font-semibold text-foreground mb-3">Active Filters</h3>
          <div className="flex flex-wrap gap-2 mb-4">
            {searchQuery && (
              <Badge variant="secondary" className="flex items-center gap-1">
                Search: {searchQuery}
                <X
                  className="h-3 w-3 cursor-pointer"
                  onClick={() => setQuery("")}
                />
              </Badge>
            )}
            {selectedCategories.map((category) => (
              <Badge
                key={category}
                variant="secondary"
                className="flex items-center gap-1"
              >
                {category}
                <X
                  className="h-3 w-3 cursor-pointer"
                  onClick={() => toggleCategory(category)}
                />
              </Badge>
            ))}
            {selectedMaterials.map((material) => (
              <Badge
                key={material}
                variant="secondary"
                className="flex items-center gap-1"
              >
                {material}
                <X
                  className="h-3 w-3 cursor-pointer"
                  onClick={() => toggleMaterial(material)}
                />
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* Price Range */}
      <div>
        <h3 className="font-semibold text-foreground mb-4">Price Range</h3>
        <div className="space-y-4">
          <Slider
            value={priceRange}
            onValueChange={setPriceRange}
            max={3000}
            min={0}
            step={50}
            className="w-full"
          />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>${priceRange[0]}</span>
            <span>${priceRange[1]}</span>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div>
        <h3 className="font-semibold text-foreground mb-4">Categories</h3>
        <div className="space-y-3">
          {categories.map((category) => (
            <div key={category} className="flex items-center space-x-2">
              <Checkbox
                id={category}
                checked={selectedCategories.includes(category)}
                onCheckedChange={() => toggleCategory(category)}
              />
              <label
                htmlFor={category}
                className="text-sm text-foreground cursor-pointer"
              >
                {category}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Materials */}
      <div>
        <h3 className="font-semibold text-foreground mb-4">Materials</h3>
        <div className="space-y-3">
          {materials.map((material) => (
            <div key={material} className="flex items-center space-x-2">
              <Checkbox
                id={material}
                checked={selectedMaterials.includes(material)}
                onCheckedChange={() => toggleMaterial(material)}
              />
              <label
                htmlFor={material}
                className="text-sm text-foreground cursor-pointer"
              >
                {material}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Clear Filters */}
      <Button
        variant="outline"
        className="w-full bg-transparent"
        onClick={clearAllFilters}
      >
        Clear All Filters
      </Button>
    </div>
  );

  const handleAddToCart = (product: (typeof allProducts)[0]) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      maxStock: 10, // Default stock
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
                <span className="text-accent-foreground font-bold text-lg font-serif">
                  M
                </span>
              </div>
              <span className="text-2xl font-bold font-serif text-foreground">
                Modivo Furniture
              </span>
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
                    {state.itemCount}
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

      {/* Mobile Search */}
      <div className="md:hidden container mx-auto px-4 py-4">
        <SearchBar />
      </div>

      {/* Breadcrumb */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-accent transition-colors">
            Home
          </Link>
          <span>/</span>
          <span className="text-foreground">Products</span>
          {searchQuery && (
            <>
              <span>/</span>
              <span className="text-foreground">Search: "{searchQuery}"</span>
            </>
          )}
        </div>
      </div>

      <div className="container mx-auto px-4 pb-12">
        <div className="flex gap-8">
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-24">
              <h2 className="text-xl font-bold font-serif text-foreground mb-6">
                Filters
              </h2>
              <FilterSidebar />
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
              <div>
                <h1 className="text-3xl font-bold font-serif text-foreground mb-2">
                  {searchQuery
                    ? `Search Results for "${searchQuery}"`
                    : "All Products"}
                </h1>
                <p className="text-muted-foreground">
                  Showing {sortedProducts.length} of {allProducts.length}{" "}
                  products
                  {filteredProducts.length !== allProducts.length && (
                    <span className="ml-2 text-accent">
                      ({allProducts.length - filteredProducts.length} filtered
                      out)
                    </span>
                  )}
                </p>
              </div>

              <div className="flex items-center gap-4">
                {/* Mobile Filter Button */}
                <Sheet>
                  <SheetTrigger asChild>
                    <Button
                      variant="outline"
                      className="lg:hidden bg-transparent"
                    >
                      <SlidersHorizontal className="h-4 w-4 mr-2" />
                      Filters
                      {selectedCategories.length + selectedMaterials.length >
                        0 && (
                        <Badge className="ml-2 h-5 w-5 rounded-full p-0 flex items-center justify-center bg-accent text-accent-foreground text-xs">
                          {selectedCategories.length + selectedMaterials.length}
                        </Badge>
                      )}
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-80">
                    <SheetHeader>
                      <SheetTitle>Filters</SheetTitle>
                      <SheetDescription>
                        Filter products by category, price, and material
                      </SheetDescription>
                    </SheetHeader>
                    <div className="mt-6">
                      <FilterSidebar />
                    </div>
                  </SheetContent>
                </Sheet>

                {/* Sort */}
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="featured">Featured</SelectItem>
                    <SelectItem value="newest">Newest</SelectItem>
                    <SelectItem value="price-low">
                      Price: Low to High
                    </SelectItem>
                    <SelectItem value="price-high">
                      Price: High to Low
                    </SelectItem>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                  </SelectContent>
                </Select>

                {/* View Toggle */}
                <div className="flex border border-border rounded-lg">
                  <Button
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                    className="rounded-r-none"
                  >
                    <Grid3X3 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                    className="rounded-l-none"
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* No Results */}
            {sortedProducts.length === 0 && (
              <div className="text-center py-12">
                <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
                  <Search className="h-12 w-12 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  No products found
                </h3>
                <p className="text-muted-foreground mb-6">
                  {searchQuery
                    ? `No products match your search for "${searchQuery}"`
                    : "No products match your current filters"}
                </p>
                <Button
                  onClick={clearAllFilters}
                  className="bg-accent hover:bg-accent/90 text-accent-foreground"
                >
                  Clear All Filters
                </Button>
              </div>
            )}

            {/* Products Grid/List */}
            {sortedProducts.length > 0 && (
              <>
                {viewMode === "grid" ? (
                  <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {sortedProducts.map((product) => (
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
                              <Badge className="absolute top-4 left-4 bg-accent text-accent-foreground">
                                New
                              </Badge>
                            )}
                            {product.isBestseller && (
                              <Badge className="absolute top-4 left-4 bg-secondary text-secondary-foreground">
                                Bestseller
                              </Badge>
                            )}
                          </div>
                          <div className="p-4">
                            <div className="flex items-center gap-2 mb-2">
                              <div className="flex items-center">
                                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                <span className="text-sm font-medium ml-1">
                                  {product.rating}
                                </span>
                              </div>
                              <span className="text-sm text-muted-foreground">
                                ({product.reviews})
                              </span>
                            </div>
                            <Link href={`/products/${product.id}`}>
                              <h3 className="font-semibold text-card-foreground mb-2 group-hover:text-accent transition-colors">
                                {product.name}
                              </h3>
                            </Link>
                            <p className="text-sm text-muted-foreground mb-3">
                              {product.category}
                            </p>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <span className="text-lg font-bold text-foreground">
                                  ${product.price}
                                </span>
                                {product.originalPrice && (
                                  <span className="text-sm text-muted-foreground line-through">
                                    ${product.originalPrice}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter className="p-4 pt-0">
                          <Button
                            className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
                            onClick={() => handleAddToCart(product)}
                          >
                            Add to Cart
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-6">
                    {sortedProducts.map((product) => (
                      <Card
                        key={product.id}
                        className="group cursor-pointer hover:shadow-lg transition-all duration-300 border-border bg-card"
                      >
                        <CardContent className="p-6">
                          <div className="flex gap-6">
                            <div className="relative w-48 h-48 flex-shrink-0">
                              <Link href={`/products/${product.id}`}>
                                <img
                                  src={product.image || "/placeholder.svg"}
                                  alt={product.name}
                                  className="w-full h-full object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
                                />
                              </Link>
                              {product.isNew && (
                                <Badge className="absolute top-2 left-2 bg-accent text-accent-foreground">
                                  New
                                </Badge>
                              )}
                              {product.isBestseller && (
                                <Badge className="absolute top-2 left-2 bg-secondary text-secondary-foreground">
                                  Bestseller
                                </Badge>
                              )}
                            </div>
                            <div className="flex-1 flex flex-col justify-between">
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
                                </div>
                                <Link href={`/products/${product.id}`}>
                                  <h3 className="text-xl font-semibold text-card-foreground mb-2 group-hover:text-accent transition-colors">
                                    {product.name}
                                  </h3>
                                </Link>
                                <p className="text-muted-foreground mb-4">
                                  {product.description}
                                </p>
                                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                  <span>Category: {product.category}</span>
                                  <span>Material: {product.material}</span>
                                </div>
                              </div>
                              <div className="flex items-center justify-between mt-4">
                                <div className="flex items-center gap-2">
                                  <span className="text-2xl font-bold text-foreground">
                                    ${product.price}
                                  </span>
                                  {product.originalPrice && (
                                    <span className="text-lg text-muted-foreground line-through">
                                      ${product.originalPrice}
                                    </span>
                                  )}
                                </div>
                                <div className="flex items-center gap-2">
                                  <Button variant="outline" size="icon">
                                    <Heart className="h-4 w-4" />
                                  </Button>
                                  <Button
                                    className="bg-accent hover:bg-accent/90 text-accent-foreground"
                                    onClick={() => handleAddToCart(product)}
                                  >
                                    Add to Cart
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}

                {/* Pagination */}
                <div className="flex justify-center mt-12">
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" disabled>
                      Previous
                    </Button>
                    <Button
                      variant="default"
                      className="bg-accent text-accent-foreground"
                    >
                      1
                    </Button>
                    <Button variant="outline">2</Button>
                    <Button variant="outline">3</Button>
                    <Button variant="outline">Next</Button>
                  </div>
                </div>
              </>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
