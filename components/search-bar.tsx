"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Search, X, Clock, TrendingUp } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useSearch } from "@/contexts/search-context"

interface SearchBarProps {
  className?: string
  placeholder?: string
  showSuggestions?: boolean
}

export function SearchBar({
  className = "",
  placeholder = "Search furniture & décor...",
  showSuggestions = true,
}: SearchBarProps) {
  const { state, setQuery, performSearch, clearSearch } = useSearch()
  const [isFocused, setIsFocused] = useState(false)
  const [showDropdown, setShowDropdown] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Handle clicks outside to close dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false)
        setIsFocused(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (state.query.trim()) {
      performSearch(state.query)
      setShowDropdown(false)
      inputRef.current?.blur()
    }
  }

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion)
    performSearch(suggestion)
    setShowDropdown(false)
    inputRef.current?.blur()
  }

  const handleFocus = () => {
    setIsFocused(true)
    if (showSuggestions) {
      setShowDropdown(true)
    }
  }

  const handleClear = () => {
    setQuery("")
    clearSearch()
    inputRef.current?.focus()
  }

  const trendingSearches = ["Ethiopian Sofa", "Dining Table", "Office Desk", "Storage Cabinet"]

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <form onSubmit={handleSubmit} className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          ref={inputRef}
          type="text"
          placeholder={placeholder}
          value={state.query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={handleFocus}
          className={`pl-10 pr-10 bg-muted/50 border-border focus:ring-accent ${
            isFocused ? "ring-2 ring-accent/20" : ""
          }`}
        />
        {state.query && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={handleClear}
            className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 text-muted-foreground hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </form>

      {/* Search Dropdown */}
      {showDropdown && showSuggestions && (
        <Card className="absolute top-full left-0 right-0 mt-2 z-50 border-border bg-card shadow-lg">
          <CardContent className="p-4">
            {/* Current Query */}
            {state.query && (
              <div className="mb-4">
                <button
                  onClick={() => handleSuggestionClick(state.query)}
                  className="flex items-center gap-3 w-full text-left p-2 rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <Search className="h-4 w-4 text-muted-foreground" />
                  <span className="text-foreground">Search for "{state.query}"</span>
                </button>
              </div>
            )}

            {/* Suggestions */}
            {state.suggestions.length > 0 && (
              <div className="mb-4">
                <h4 className="text-sm font-medium text-muted-foreground mb-2">Suggestions</h4>
                <div className="space-y-1">
                  {state.suggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="flex items-center gap-3 w-full text-left p-2 rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <Search className="h-4 w-4 text-muted-foreground" />
                      <span className="text-foreground capitalize">{suggestion}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Recent Searches */}
            {state.recentSearches.length > 0 && !state.query && (
              <div className="mb-4">
                <h4 className="text-sm font-medium text-muted-foreground mb-2">Recent Searches</h4>
                <div className="space-y-1">
                  {state.recentSearches.map((search, index) => (
                    <button
                      key={index}
                      onClick={() => handleSuggestionClick(search)}
                      className="flex items-center gap-3 w-full text-left p-2 rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-foreground">{search}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Trending Searches */}
            {!state.query && (
              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-2">Trending</h4>
                <div className="flex flex-wrap gap-2">
                  {trendingSearches.map((trend, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="cursor-pointer hover:bg-accent/20 transition-colors"
                      onClick={() => handleSuggestionClick(trend)}
                    >
                      <TrendingUp className="h-3 w-3 mr-1" />
                      {trend}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
