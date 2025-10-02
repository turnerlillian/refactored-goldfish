import { useState, useMemo, useEffect, useCallback } from "react";
import { SlidersHorizontal, X, Search, MapPin, ArrowUpDown, Grid, List } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Slider } from "../ui/slider";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet";
import { Badge } from "../ui/badge";
import { PropertyCard } from "../PropertyCard";
import { properties } from "../../data/mockData";

interface PropertySearchPageProps {
  onNavigate: (page: string, params?: any) => void;
  initialQuery?: string;
}

export function PropertySearchPage({ onNavigate, initialQuery = "" }: PropertySearchPageProps) {
  const [filters, setFilters] = useState({
    search: initialQuery,
    propertyType: "all",
    minPrice: 0,
    maxPrice: 5000000,
    bedrooms: "any",
    bathrooms: "any",
    minSqft: 0,
    maxSqft: 10000,
    status: "all",
    featured: "all",
    sortBy: "price-low",
  });

  const [viewMode, setViewMode] = useState("grid");
  const [searchSuggestions, setSearchSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);

  // Generate search suggestions
  const allLocations = useMemo(() => {
    const locations = new Set<string>();
    properties.forEach(property => {
      locations.add(property.city);
      locations.add(property.state);
      locations.add(`${property.city}, ${property.state}`);
      locations.add(property.zip);
    });
    return Array.from(locations);
  }, []);

  // Update suggestions based on search input
  useEffect(() => {
    if (filters.search && filters.search.length > 0) {
      const suggestions = allLocations
        .filter(location => location.toLowerCase().includes(filters.search.toLowerCase()))
        .slice(0, 5);
      setSearchSuggestions(suggestions);
    } else {
      setSearchSuggestions([]);
    }
  }, [filters.search, allLocations]);

  const filteredAndSortedProperties = useMemo(() => {
    let filtered = properties.filter((property) => {
      // Search filter - enhanced with better matching
      if (filters.search && filters.search.trim()) {
        const searchLower = filters.search.toLowerCase().trim();
        const searchTerms = searchLower.split(' ').filter(term => term.length > 0);
        
        const searchableText = [
          property.title,
          property.description || '',
          property.address,
          property.city,
          property.state,
          property.zip,
          property.propertyType,
          ...property.features || []
        ].join(' ').toLowerCase();
        
        // Check if all search terms are found in the searchable text
        const matchesSearch = searchTerms.every(term => searchableText.includes(term));
        
        if (!matchesSearch) return false;
      }

      // Property type filter
      if (filters.propertyType !== "all" && property.propertyType !== filters.propertyType) {
        return false;
      }

      // Status filter
      if (filters.status !== "all" && property.status !== filters.status) {
        return false;
      }

      // Featured filter
      if (filters.featured === "featured" && !property.featured) {
        return false;
      } else if (filters.featured === "regular" && property.featured) {
        return false;
      }

      // Price filter
      if (property.price < filters.minPrice || property.price > filters.maxPrice) {
        return false;
      }

      // Bedrooms filter
      if (filters.bedrooms !== "any") {
        const minBedrooms = parseInt(filters.bedrooms);
        if (property.bedrooms < minBedrooms) return false;
      }

      // Bathrooms filter
      if (filters.bathrooms !== "any") {
        const minBathrooms = parseFloat(filters.bathrooms);
        if (property.bathrooms < minBathrooms) return false;
      }

      // Square footage filter
      if (property.sqft < filters.minSqft || property.sqft > filters.maxSqft) {
        return false;
      }

      return true;
    });

    // Sort the filtered results
    filtered.sort((a, b) => {
      switch (filters.sortBy) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "sqft-large":
          return b.sqft - a.sqft;
        case "sqft-small":
          return a.sqft - b.sqft;
        case "bedrooms":
          return b.bedrooms - a.bedrooms;
        case "newest":
          return b.id.localeCompare(a.id); // Sort by ID as proxy for newest
        case "featured":
          return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
        default:
          return 0;
      }
    });

    return filtered;
  }, [filters]);

  const FilterPanel = useCallback(() => (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="search">Search Properties</Label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            id="search"
            placeholder={searchFocused || filters.search ? "" : "Search..."}
            value={filters.search}
            onChange={(e) => {
              setFilters({ ...filters, search: e.target.value });
              setShowSuggestions(e.target.value.length > 0);
            }}
            onFocus={() => {
              setSearchFocused(true);
              setShowSuggestions(filters.search.length > 0);
            }}
            onBlur={() => {
              setSearchFocused(false);
              setTimeout(() => setShowSuggestions(false), 200);
            }}
            className="pl-10 pr-20"
          />
          {filters.search && (
            <Button
              variant="ghost"
              size="sm"
              className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
              onClick={() => {
                setFilters({ ...filters, search: "" });
                setShowSuggestions(false);
              }}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
          {showSuggestions && searchSuggestions.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-background border rounded-md shadow-lg z-10">
              {searchSuggestions.map((suggestion, index) => (
                <button
                  key={index}
                  className="w-full text-left px-4 py-2 hover:bg-accent hover:text-accent-foreground transition-colors flex items-center gap-2"
                  onClick={() => {
                    setFilters({ ...filters, search: suggestion });
                    setShowSuggestions(false);
                  }}
                >
                  <MapPin className="h-3 w-3 text-muted-foreground" />
                  {suggestion}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="propertyType">Property Type</Label>
        <Select
          value={filters.propertyType}
          onValueChange={(value: string) => setFilters({ ...filters, propertyType: value })}
        >
          <SelectTrigger id="propertyType">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="Single Family Home">Single Family</SelectItem>
            <SelectItem value="Condo">Condo</SelectItem>
            <SelectItem value="Loft">Loft</SelectItem>
            <SelectItem value="Townhouse">Townhouse</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-3">
        <Label>Price Range</Label>
        <div className="px-2">
          <Slider
            value={[filters.minPrice, filters.maxPrice]}
            min={0}
            max={5000000}
            step={50000}
            onValueChange={([min, max]: [number, number]) => setFilters({ ...filters, minPrice: min, maxPrice: max })}
          />
        </div>
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>${(filters.minPrice / 1000).toFixed(0)}K</span>
          <span>${(filters.maxPrice / 1000000).toFixed(1)}M</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="bedrooms">Bedrooms</Label>
          <Select
            value={filters.bedrooms}
            onValueChange={(value: string) => setFilters({ ...filters, bedrooms: value })}
          >
            <SelectTrigger id="bedrooms">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Any</SelectItem>
              <SelectItem value="1">1+</SelectItem>
              <SelectItem value="2">2+</SelectItem>
              <SelectItem value="3">3+</SelectItem>
              <SelectItem value="4">4+</SelectItem>
              <SelectItem value="5">5+</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="bathrooms">Bathrooms</Label>
          <Select
            value={filters.bathrooms}
            onValueChange={(value: string) => setFilters({ ...filters, bathrooms: value })}
          >
            <SelectTrigger id="bathrooms">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Any</SelectItem>
              <SelectItem value="1">1+</SelectItem>
              <SelectItem value="2">2+</SelectItem>
              <SelectItem value="3">3+</SelectItem>
              <SelectItem value="4">4+</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-3">
        <Label>Square Footage Range</Label>
        <div className="px-2">
          <Slider
            value={[filters.minSqft, filters.maxSqft]}
            min={0}
            max={10000}
            step={100}
            onValueChange={([min, max]: [number, number]) => setFilters({ ...filters, minSqft: min, maxSqft: max })}
          />
        </div>
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>{filters.minSqft.toLocaleString()} sq ft</span>
          <span>{filters.maxSqft.toLocaleString()} sq ft</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="status">Status</Label>
          <Select
            value={filters.status}
            onValueChange={(value: string) => setFilters({ ...filters, status: value })}
          >
            <SelectTrigger id="status">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="For Sale">For Sale</SelectItem>
              <SelectItem value="For Rent">For Rent</SelectItem>
              <SelectItem value="Sold">Sold</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="featured">Featured</Label>
          <Select
            value={filters.featured}
            onValueChange={(value: string) => setFilters({ ...filters, featured: value })}
          >
            <SelectTrigger id="featured">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="featured">Featured Only</SelectItem>
              <SelectItem value="regular">Regular Only</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Button
        variant="outline"
        className="w-full"
        onClick={() => setFilters({
          search: "",
          propertyType: "all",
          minPrice: 0,
          maxPrice: 5000000,
          bedrooms: "any",
          bathrooms: "any",
          minSqft: 0,
          maxSqft: 10000,
          status: "all",
          featured: "all",
          sortBy: "price-low",
        })}
      >
        <X className="h-4 w-4 mr-2" />
        Clear Filters
      </Button>
    </div>
  ), [filters, searchSuggestions, showSuggestions, searchFocused]);

  return (
    <div>
      <div className="container py-12">
        {/* Enhanced Header with Search Stats and Controls */}
        <div className="space-y-4 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-primary">Property Search</h1>
              <div className="flex flex-wrap items-center gap-2 mt-2">
                <p className="text-muted-foreground text-sm">
                  {filteredAndSortedProperties.length} {filteredAndSortedProperties.length === 1 ? 'property' : 'properties'} found
                  {filters.search && (
                    <span> for "{filters.search}"</span>
                  )}
                </p>
                {(filters.search || filters.propertyType !== "all" || filters.status !== "all") && (
                  <Badge variant="secondary" className="text-xs bg-primary/10 text-primary border border-primary/20">
                  Filtered
                </Badge>
              )}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* View Mode Toggle */}
            <div className="hidden sm:flex border rounded-lg p-1">
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("grid")}
                className="h-8 w-8 p-0"
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("list")}
                className="h-8 w-8 p-0"
              >
                <List className="h-4 w-4" />
              </Button>
            </div>

            {/* Sort Dropdown */}
            <Select
              value={filters.sortBy}
              onValueChange={(value: string) => setFilters({ ...filters, sortBy: value })}
            >
              <SelectTrigger className="w-[200px]">
                <ArrowUpDown className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="sqft-large">Size: Large to Small</SelectItem>
                <SelectItem value="sqft-small">Size: Small to Large</SelectItem>
                <SelectItem value="bedrooms">Most Bedrooms</SelectItem>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="featured">Featured First</SelectItem>
              </SelectContent>
            </Select>

            {/* Mobile Filter Toggle */}
            <Sheet>
              <SheetTrigger className="lg:hidden" asChild>
                <Button variant="outline" size="sm">
                  <SlidersHorizontal className="h-4 w-4 mr-1" />
                  Filter
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80">
                <SheetHeader>
                  <SheetTitle>Search Filters</SheetTitle>
                </SheetHeader>
                <div className="mt-6">
                  {FilterPanel()}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Desktop Filters */}
        <div className="hidden lg:block">
          <Card>
            <CardHeader>
              <CardTitle>Filters</CardTitle>
            </CardHeader>
            <CardContent>
              {FilterPanel()}
            </CardContent>
          </Card>
        </div>

        {/* Property Results */}
        <div className="lg:col-span-3">
          {filteredAndSortedProperties.length === 0 ? (
            <Card>
              <CardContent className="py-16 text-center space-y-4">
                <div className="w-16 h-16 mx-auto bg-muted rounded-full flex items-center justify-center">
                  <Search className="h-8 w-8 text-muted-foreground" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold">No properties found</h3>
                  <p className="text-muted-foreground max-w-md mx-auto">
                    {filters.search
                      ? `No properties found matching "${filters.search}". Try different keywords or adjust your filters.`
                      : "No properties match your current criteria. Try adjusting your filters to see more results."}
                  </p>
                </div>
                <Button
                  variant="outline"
                  onClick={() => setFilters({
                    search: "",
                    propertyType: "all",
                    minPrice: 0,
                    maxPrice: 5000000,
                    bedrooms: "any",
                    bathrooms: "any",
                    minSqft: 0,
                    maxSqft: 10000,
                    status: "all",
                    featured: "all",
                    sortBy: "price-low",
                  })}
                >
                  Clear All Filters
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className={`grid gap-6 ${
              viewMode === "grid"
                ? "grid-cols-1 md:grid-cols-2 xl:grid-cols-3"
                : "grid-cols-1"
            }`}>
              {filteredAndSortedProperties.map((property) => (
                <PropertyCard
                  key={property.id}
                  property={property}
                  onViewDetails={(id) => onNavigate("property", { id })}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
    </div>
  );
}
