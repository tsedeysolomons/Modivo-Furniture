"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

export interface User {
  id: string
  email: string
  name: string
  avatar?: string
  phone?: string
  addresses: Address[]
  preferences: {
    newsletter: boolean
    notifications: boolean
  }
  createdAt: string
}

export interface Address {
  id: string
  type: "home" | "work" | "other"
  name: string
  street: string
  city: string
  state: string
  zipCode: string
  country: string
  isDefault: boolean
}

export interface Order {
  id: string
  date: string
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled"
  total: number
  items: {
    id: number
    name: string
    price: number
    quantity: number
    image: string
  }[]
  shippingAddress: Address
}

interface AuthState {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
  orders: Order[]
  wishlist: number[]
}

interface AuthContextType {
  state: AuthState
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  signup: (name: string, email: string, password: string) => Promise<{ success: boolean; error?: string }>
  logout: () => void
  updateProfile: (updates: Partial<User>) => Promise<{ success: boolean; error?: string }>
  addAddress: (address: Omit<Address, "id">) => void
  updateAddress: (id: string, updates: Partial<Address>) => void
  removeAddress: (id: string) => void
  addToWishlist: (productId: number) => void
  removeFromWishlist: (productId: number) => void
  isInWishlist: (productId: number) => boolean
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    isLoading: true,
    isAuthenticated: false,
    orders: [],
    wishlist: [],
  })

  // Mock user data for demonstration
  const mockUser: User = {
    id: "1",
    email: "user@example.com",
    name: "John Doe",
    avatar: "/placeholder.svg?height=100&width=100&text=JD",
    phone: "+1 (555) 123-4567",
    addresses: [
      {
        id: "1",
        type: "home",
        name: "Home Address",
        street: "123 Main Street",
        city: "New York",
        state: "NY",
        zipCode: "10001",
        country: "United States",
        isDefault: true,
      },
    ],
    preferences: {
      newsletter: true,
      notifications: true,
    },
    createdAt: "2024-01-01",
  }

  const mockOrders: Order[] = [
    {
      id: "ORD-001",
      date: "2024-01-15",
      status: "delivered",
      total: 1299,
      items: [
        {
          id: 1,
          name: "Addis Comfort Sofa",
          price: 1299,
          quantity: 1,
          image: "/beige-sofa-ethiopian-style.png",
        },
      ],
      shippingAddress: mockUser.addresses[0],
    },
    {
      id: "ORD-002",
      date: "2024-01-20",
      status: "processing",
      total: 1548,
      items: [
        {
          id: 2,
          name: "Habesha Dining Table",
          price: 899,
          quantity: 1,
          image: "/ethiopian-dining-table.png",
        },
        {
          id: 4,
          name: "Injera Coffee Table",
          price: 449,
          quantity: 1,
          image: "/placeholder.svg?height=300&width=300&text=Coffee+Table",
        },
      ],
      shippingAddress: mockUser.addresses[0],
    },
  ]

  // Load auth state from localStorage on mount
  useEffect(() => {
    const savedAuth = localStorage.getItem("mogivo-auth")
    const savedWishlist = localStorage.getItem("mogivo-wishlist")

    if (savedAuth) {
      try {
        const authData = JSON.parse(savedAuth)
        setState((prev) => ({
          ...prev,
          user: authData.user,
          isAuthenticated: true,
          orders: mockOrders,
          wishlist: savedWishlist ? JSON.parse(savedWishlist) : [],
          isLoading: false,
        }))
      } catch (error) {
        console.error("Failed to load auth state:", error)
        setState((prev) => ({ ...prev, isLoading: false }))
      }
    } else {
      setState((prev) => ({ ...prev, isLoading: false }))
    }
  }, [])

  // Save auth state to localStorage
  useEffect(() => {
    if (state.user) {
      localStorage.setItem("mogivo-auth", JSON.stringify({ user: state.user }))
    } else {
      localStorage.removeItem("mogivo-auth")
    }
  }, [state.user])

  // Save wishlist to localStorage
  useEffect(() => {
    localStorage.setItem("mogivo-wishlist", JSON.stringify(state.wishlist))
  }, [state.wishlist])

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    setState((prev) => ({ ...prev, isLoading: true }))

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Mock authentication - in real app, this would call your API
    if (email === "user@example.com" && password === "password") {
      setState((prev) => ({
        ...prev,
        user: mockUser,
        isAuthenticated: true,
        orders: mockOrders,
        isLoading: false,
      }))
      return { success: true }
    } else {
      setState((prev) => ({ ...prev, isLoading: false }))
      return { success: false, error: "Invalid email or password" }
    }
  }

  const signup = async (
    name: string,
    email: string,
    password: string,
  ): Promise<{ success: boolean; error?: string }> => {
    setState((prev) => ({ ...prev, isLoading: true }))

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Mock signup - in real app, this would call your API
    const newUser: User = {
      ...mockUser,
      id: Date.now().toString(),
      name,
      email,
      addresses: [],
      createdAt: new Date().toISOString(),
    }

    setState((prev) => ({
      ...prev,
      user: newUser,
      isAuthenticated: true,
      orders: [],
      isLoading: false,
    }))

    return { success: true }
  }

  const logout = () => {
    setState((prev) => ({
      ...prev,
      user: null,
      isAuthenticated: false,
      orders: [],
      wishlist: [],
    }))
  }

  const updateProfile = async (updates: Partial<User>): Promise<{ success: boolean; error?: string }> => {
    if (!state.user) return { success: false, error: "Not authenticated" }

    setState((prev) => ({
      ...prev,
      user: prev.user ? { ...prev.user, ...updates } : null,
    }))

    return { success: true }
  }

  const addAddress = (address: Omit<Address, "id">) => {
    if (!state.user) return

    const newAddress: Address = {
      ...address,
      id: Date.now().toString(),
    }

    setState((prev) => ({
      ...prev,
      user: prev.user
        ? {
            ...prev.user,
            addresses: [...prev.user.addresses, newAddress],
          }
        : null,
    }))
  }

  const updateAddress = (id: string, updates: Partial<Address>) => {
    if (!state.user) return

    setState((prev) => ({
      ...prev,
      user: prev.user
        ? {
            ...prev.user,
            addresses: prev.user.addresses.map((addr) => (addr.id === id ? { ...addr, ...updates } : addr)),
          }
        : null,
    }))
  }

  const removeAddress = (id: string) => {
    if (!state.user) return

    setState((prev) => ({
      ...prev,
      user: prev.user
        ? {
            ...prev.user,
            addresses: prev.user.addresses.filter((addr) => addr.id !== id),
          }
        : null,
    }))
  }

  const addToWishlist = (productId: number) => {
    setState((prev) => ({
      ...prev,
      wishlist: prev.wishlist.includes(productId) ? prev.wishlist : [...prev.wishlist, productId],
    }))
  }

  const removeFromWishlist = (productId: number) => {
    setState((prev) => ({
      ...prev,
      wishlist: prev.wishlist.filter((id) => id !== productId),
    }))
  }

  const isInWishlist = (productId: number) => {
    return state.wishlist.includes(productId)
  }

  return (
    <AuthContext.Provider
      value={{
        state,
        login,
        signup,
        logout,
        updateProfile,
        addAddress,
        updateAddress,
        removeAddress,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
