"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"

interface SearchState {
  query: string
  suggestions: string[]
  recentSearches: string[]
  isSearching: boolean
}

interface SearchContextType {
  state: SearchState
  setQuery: (query: string) => void
  performSearch: (query: string) => void
  clearSearch: () => void
  addToRecentSearches: (query: string) => void
  clearRecentSearches: () => void
}

const SearchContext = createContext<SearchContextType | null>(null)

export function SearchProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [state, setState] = useState<SearchState>({
    query: searchParams.get("q") || "",
    suggestions: [],
    recentSearches: [],
    isSearching: false,
  })

  // Load recent searches from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("mogivo-recent-searches")
    if (saved) {
      try {
        const recentSearches = JSON.parse(saved)
        setState((prev) => ({ ...prev, recentSearches }))
      } catch (error) {
        console.error("Failed to load recent searches:", error)
      }
    }
  }, [])

  // Save recent searches to localStorage
  useEffect(() => {
    localStorage.setItem("mogivo-recent-searches", JSON.stringify(state.recentSearches))
  }, [state.recentSearches])

  // Generate search suggestions based on query
  useEffect(() => {
    if (state.query.length > 0) {
      const allSuggestions = [
        "sofa",
        "dining table",
        "bedroom set",
        "coffee table",
        "accent chair",
        "storage cabinet",
        "office desk",
        "bookshelf",
        "ethiopian furniture",
        "wood furniture",
        "fabric sofa",
        "dining room",
        "living room",
        "bedroom furniture",
        "office furniture",
        "storage solutions",
      ]

      const filtered = allSuggestions
        .filter(
          (suggestion) =>
            suggestion.toLowerCase().includes(state.query.toLowerCase()) &&
            suggestion.toLowerCase() !== state.query.toLowerCase(),
        )
        .slice(0, 5)

      setState((prev) => ({ ...prev, suggestions: filtered }))
    } else {
      setState((prev) => ({ ...prev, suggestions: [] }))
    }
  }, [state.query])

  const setQuery = (query: string) => {
    setState((prev) => ({ ...prev, query }))
  }

  const performSearch = (query: string) => {
    if (query.trim()) {
      setState((prev) => ({ ...prev, query: query.trim(), isSearching: true }))
      addToRecentSearches(query.trim())

      // Navigate to products page with search query
      const params = new URLSearchParams()
      params.set("q", query.trim())
      router.push(`/products?${params.toString()}`)
    }
  }

  const clearSearch = () => {
    setState((prev) => ({ ...prev, query: "", suggestions: [], isSearching: false }))
    router.push("/products")
  }

  const addToRecentSearches = (query: string) => {
    setState((prev) => {
      const filtered = prev.recentSearches.filter((search) => search !== query)
      const updated = [query, ...filtered].slice(0, 5) // Keep only 5 recent searches
      return { ...prev, recentSearches: updated }
    })
  }

  const clearRecentSearches = () => {
    setState((prev) => ({ ...prev, recentSearches: [] }))
  }

  return (
    <SearchContext.Provider
      value={{
        state,
        setQuery,
        performSearch,
        clearSearch,
        addToRecentSearches,
        clearRecentSearches,
      }}
    >
      {children}
    </SearchContext.Provider>
  )
}

export function useSearch() {
  const context = useContext(SearchContext)
  if (!context) {
    throw new Error("useSearch must be used within a SearchProvider")
  }
  return context
}
