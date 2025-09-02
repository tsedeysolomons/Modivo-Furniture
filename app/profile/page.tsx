"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import {
  User,
  ShoppingCart,
  Menu,
  Settings,
  Package,
  Heart,
  MapPin,
  Bell,
  LogOut,
  Edit,
  Plus,
  Trash2,
  Star,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { SearchBar } from "@/components/search-bar"
import { useAuth } from "@/contexts/auth-context"
import { useCart } from "@/contexts/cart-context"

export default function ProfilePage() {
  const router = useRouter()
  const { state: authState, logout, isInWishlist, removeFromWishlist } = useAuth()
  const { state: cartState } = useCart()
  const [activeTab, setActiveTab] = useState('overview')

  useEffect(() => {
    if (!authState.isAuthenticated && !authState.isLoading) {
      router.push('/login')
    }
  }, [authState.isAuthenticated, authState.isLoading, router])

  if (authState.isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center mx-auto mb-4">
            <span className="text-accent-foreground font-bold text-lg font-serif">M</span>
          </div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  if (!authState.user) {
    return null
  }

  const handleLogout = () => {
    logout()
    router.push('/')
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'bg-green-100 text-green-800'
      case 'processing': return 'bg-blue-100 text-blue-800'
      case 'shipped': return 'bg-purple-100 text-purple-800'
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'cancelled': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  // Mock wishlist products
  const wishlistProducts = [
    {
      id: 2,
      name: "Habesha Dining Table",
      price: 899,
      image: "/ethiopian-dining-table.png",
      rating: 4.9,
      reviews: 89,
    },
    {
      id: 5,
      name: "Berbere Accent Chair",
      price: 599,
      image: "/placeholder.svg?height=300&width=300&text=Accent+Chair",
      rating: 4.5,
      reviews: 92,
    },
  ].filter(product => isInWishlist(product.id))

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
              <span className="text-2xl font-bold font-serif text-foreground">Modivo Furinture </span>
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
                    {cartState.itemCount}
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

      {/* Breadcrumb */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-accent transition-colors">Home</Link>
          <span>/</span>
          <span className="text-foreground">Profile</span>
        </div>
      </div>

      <div className="container mx-auto px-4 pb-12">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="border-border bg-card">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4 mb-6">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={authState.user.avatar || "/placeholder.svg"} alt={authState.user.name} />
                    <AvatarFallback className="bg-accent text-accent-foreground text-lg font-semibold">
                      {authState.user.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h2 className="text-lg font-semibold text-foreground">{authState.user.name}</h2>
                    <p className="text-sm text-muted-foreground">{authState.user.email}</p>
                  </div>
                </div>

                <nav className="space-y-2">
                  <Button
                    variant={activeTab === 'overview' ? 'default' : 'ghost'}
                    className="w-full justify-start"
                    onClick={() => setActiveTab('overview')}
                  >
                    <User className="mr-2 h-4 w-4" />
                    Overview
                  </Button>
                  <Button
                    variant={activeTab === 'orders' ? 'default' : 'ghost'}
                    className="w-full justify-start"
                    onClick={() => setActiveTab('orders')}
                  >
                    <Package className="mr-2 h-4 w-4" />
                    Orders
                  </Button>
                  <Button
                    variant={activeTab === 'wishlist' ? 'default' : 'ghost'}
                    className="w-full justify-start"
                    onClick={() => setActiveTab('wishlist')}
                  >
                    <Heart className="mr-2 h-4 w-4" />
                    Wishlist
                  </Button>
                  <Button
                    variant={activeTab === 'addresses' ? 'default' : 'ghost'}
                    className="w-full justify-start"
                    onClick={() => setActiveTab('addresses')}
                  >
                    <MapPin className="mr-2 h-4 w-4" />
                    Addresses
                  </Button>
                  <Button
                    variant={activeTab === 'settings' ? 'default' : 'ghost'}
                    className="w-full justify-start"
                    onClick={() => setActiveTab('settings')}
                  >
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </Button>
                </nav>

                <div className="mt-6 pt-6 border-t border-border">
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
                    onClick={handleLogout}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign Out
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div>
                  <h1 className="text-3xl font-bold font-serif text-foreground mb-2">Welcome back, {authState.user.name.split(' ')[0]}!</h1>
                  <p className="text-muted-foreground">Manage your account and track your orders</p>
                </div>

                {/* Quick Stats */}
                <div className="grid md:grid-cols-3 gap-6">
                  <Card className="border-border bg-card">
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-4">
                        <div className="p-3 bg-accent/10 rounded-lg">
                          <Package className="h-6 w-6 text-accent" />
                        </div>
                        <div>
                          <p className="text-2xl font-bold text-foreground">{authState.orders.length}</p>
                          <p className="text-sm text-muted-foreground">Total Orders</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-border bg-card">
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-4">
                        <div className="p-3 bg-accent/10 rounded-lg">
                          <Heart className="h-6 w-6 text-accent" />
                        </div>
                        <div>
                          <p className="text-2xl font-bold text-foreground">{authState.wishlist.length}</p>
                          <p className="text-sm text-muted-foreground">Wishlist Items</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-border bg-card">
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-4">
                        <div className="p-3 bg-accent/10 rounded-lg">
                          <MapPin className="h-6 w-6 text-accent" />
                        </div>
                        <div>
                          <p className="text-2xl font-bold text-foreground">{authState.user.addresses.length}</p>
                          <p className="text-sm text-muted-foreground">Saved Addresses</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Recent Orders */}
                <Card className="border-border bg-card">
                  <CardHeader>
                    <CardTitle>Recent Orders</CardTitle>
                    <CardDescription>Your latest purchases</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {authState.orders.slice(0, 3).map((order) => (
                      <div key={order.id} className="flex items-center justify-between py-4 border-b border-border last:border-0">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
                            <Package className="h-6 w-6 text-muted-foreground" />
                          </div>
                          <div>
                            <p className="font-medium text-foreground">Order {order.id}</p>
                            <p className="text-sm text-muted-foreground">{order.date} • {order.items.length} items</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge className={getStatusColor(order.status)}>
                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                          </Badge>
                          <p className="text-sm font-medium text-foreground mt-1">${order.total}</p>
                        </div>
                      </div>
                    ))}
                    {authState.orders.length > 3 && (
                      <div className="pt-4">
                        <Button variant="outline" onClick={() => setActiveTab('orders')}>
                          View All Orders
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === 'orders' && (
              <div className="space-y-6">
                <div>
                  <h1 className="text-3xl font-bold font-serif text-foreground mb-2">Order History</h1>
                  <p className="text-muted-foreground">Track and manage your orders</p>
                </div>

                <div className="space-y-4">
                  {authState.orders.map((order) => (
                    <Card key={order.id} className="border-border bg-card">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <h3 className="font-semibold text-foreground">Order {order.id}</h3>
                            <p className="text-sm text-muted-foreground">Placed on {order.date}</p>
                          </div>
                          <Badge className={getStatusColor(order.status)}>
                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                          </Badge>
                        </div>

                        <div className="space-y-3">
                          {order.items.map((item) => (
                            <div key={item.id} className="flex items-center space-x-4">
                              <img 
                                src={item.image || "/placeholder.svg"} 
                                alt={item.name}
                                className="w-16 h-16 object-cover rounded-lg"
                              />
                              <div className="flex-1">
                                <p className="font-medium text-foreground">{item.name}</p>
                                <p className="text-sm text-muted-foreground">Quantity: {item.quantity}</p>
                              </div>
                              <p className="font-medium text-foreground">${item.price * item.quantity}</p>
                            </div>
                          ))}
                        </div>

                        <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
                          <p className="text-lg font-semibold text-foreground">Total: ${order.total}</p>
                          <div className="space-x-2">
                            <Button variant="outline" size="sm">View Details</Button>
                            {order.status === 'delivered' && (
                              <Button variant="outline" size="sm">Reorder</Button>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'wishlist' && (
              <div className="space-y-6">
                <div>
                  <h1 className="text-3xl font-bold font-serif text-foreground mb-2">Wishlist</h1>
                  <p className="text-muted-foreground">Items you've saved for later</p>
                </div>

                {wishlistProducts.length === 0 ? (
                  <Card className="border-border bg-card">
                    <CardContent className="p-12 text-center">
                      <Heart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-foreground mb-2">Your wishlist is empty</h3>
                      <p className="text-muted-foreground mb-6">Start adding items you love to your wishlist</p>
                      <Link href="/products">
                        <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">
                          Browse Products
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {wishlistProducts.map((product) => (
                      <Card key={product.id} className="border-border bg-card group">
                        <CardContent className="p-0">
                          <div className="relative overflow-hidden rounded-t-lg">
                            <Link href={`/products/${product.id}`}>
                              <img 
                                src={product.image || "/placeholder.svg"} 
                                alt={product.name}
                                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                              />
                            </Link>
                            <Button
                              size="icon"
                              variant="ghost"
                              onClick={() => removeFromWishlist(product.id)}
                              className="absolute top-2 right-2 bg-background/80 hover:bg-background text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
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
                              <h3 className="font-semibold text-foreground mb-2 group-hover:text-accent transition-colors">
                                {product.name}
                              </h3>
                            </Link>
                            <p className="text-lg font-bold text-foreground mb-4">${product.price}</p>
                            <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
                              Add to Cart
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'addresses' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-3xl font-bold font-serif text-foreground mb-2">Addresses</h1>
                    <p className="text-muted-foreground">Manage your shipping addresses</p>
                  </div>
                  <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Address
                  </Button>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {authState.user.addresses.map((address) => (
                    <Card key={address.id} className="border-border bg-card">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="font-semibold text-foreground">{address.name}</h3>
                            <Badge variant="outline" className="mt-1">
                              {address.type.charAt(0).toUpperCase() + address.type.slice(1)}
                            </Badge>
                            {address.isDefault && (
                              <Badge className="ml-2 bg-accent text-accent-foreground">Default</Badge>
                            )}
                          </div>
                          <div className="flex space-x-2">
                            <Button variant="ghost" size="icon">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="text-red-600 hover:text-red-700">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        <div className="text-sm text-muted-foreground space-y-1">
                          <p>{address.street}</p>
                          <p>{address.city}, {address.state} {address.zipCode}</p>
                          <p>{address.country}</p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="space-y-6">
                <div>
                  <h1 className="text-3xl font-bold font-serif text-foreground mb-2">Account Settings</h1>
                  <p className="text-muted-foreground">Manage your account preferences</p>
                </div>

                <div className="space-y-6">
                  <Card className="border-border bg-card">
                    <CardHeader>
                      <CardTitle>Personal Information</CardTitle>
                      <CardDescription>Update your personal details</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium text-foreground">Full Name</label>
                          <p className="text-muted-foreground">{authState.user.name}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-foreground">Email</label>
                          <p className="text-muted-foreground">{authState.user.email}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-foreground">Phone</label>
                          <p className="text-muted-foreground">{authState.user.phone || 'Not provided'}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-foreground">Member Since</label>
                          <p className="text-muted-foreground">{authState.user.createdAt}</p>
                        </div>
                      </div>
                      <Button variant="outline">
                        <Edit className="mr-2 h-4 w-4" />
                        Edit Information
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="border-border bg-card">
                    <CardHeader>
                      <CardTitle>Preferences</CardTitle>
                      <CardDescription>Manage your communication preferences</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-foreground">Newsletter</p>
                          <p className="text-sm text-muted-foreground">Receive updates about new products and offers</p>
                        </div>
                        <Badge className={authState.user.preferences.newsletter ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                          {authState.user.preferences.newsletter ? 'Enabled' : 'Disabled'}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-foreground">Notifications</p>
                          <p className="text-sm text-muted-foreground">Get notified about order updates</p>
                        </div>
                        <Badge className={authState.user.preferences.notifications ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                          {authState.user.preferences.notifications ? 'Enabled' : 'Disabled'}
                        </Badge>
                      </div>
                      <Button variant="outline">
                        <Bell className="mr-2 h-4 w-4" />
                        Update Preferences
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="border-border bg-card">
                    <CardHeader>
                      <CardTitle>Security</CardTitle>
                      <CardDescription>Manage your account security</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <Button variant="outline">Change Password</Button>
                      <Button variant="outline" className="text-red-600 hover:text-red-700 hover:bg-red-50 bg-transparent">
                        Delete Account
                      </Button>
                    </CardContent>
                  </Card>
                </div\
