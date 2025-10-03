import { useState, useMemo, useEffect, useCallback } from "react";
import { SlidersHorizontal, X, Search, MapPin, ArrowUpDown, Grid, List, Heart, Plus, Minus } from "lucide-react";
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
import { updatePageSEO, seoConfigs } from "../../utils/seo";
import { Breadcrumbs } from "../ui/breadcrumbs";

interface PropertySearchPageProps {
  onNavigate: (page: string, params?: any) => void;
  initialQuery?: string;
  favorites?: string[];
  onToggleFavorite?: (propertyId: string) => void;
  compareList?: string[];
  onToggleCompare?: (propertyId: string) => void;
}

export function PropertySearchPage({ 
  onNavigate, 
  initialQuery = "",
  favorites = [],
  onToggleFavorite,
  compareList = [],
  onToggleCompare
}: PropertySearchPageProps) {
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
  const [isLoadingResults, setIsLoadingResults] = useState(false);
  
  // Local state for favorites and compare when no external handlers provided
  const [localFavorites, setLocalFavorites] = useState<string[]>([]);
  const [localCompareList, setLocalCompareList] = useState<string[]>([]);

  // Load favorites and compare list from localStorage on mount
  useEffect(() => {
    if (!onToggleFavorite) {
      const saved = localStorage.getItem('property-favorites');
      if (saved) {
        try {
          setLocalFavorites(JSON.parse(saved));
        } catch (e) {
          console.error('Failed to parse saved favorites:', e);
        }
      }
    }
    
    if (!onToggleCompare) {
      const savedCompare = localStorage.getItem('property-compare');
      if (savedCompare) {
        try {
          setLocalCompareList(JSON.parse(savedCompare));
        } catch (e) {
          console.error('Failed to parse saved compare list:', e);
        }
      }
    }
  }, [onToggleFavorite, onToggleCompare]);

  // Use external or local favorites/compare lists
  const currentFavorites = favorites.length > 0 ? favorites : localFavorites;
  const currentCompareList = compareList.length > 0 ? compareList : localCompareList;

  // Handlers for favorites and compare
  const handleToggleFavorite = useCallback((propertyId: string) => {
    if (onToggleFavorite) {
      onToggleFavorite(propertyId);
    } else {
      setLocalFavorites(prev => {
        const newFavorites = prev.includes(propertyId)
          ? prev.filter(id => id !== propertyId)
          : [...prev, propertyId];
        localStorage.setItem('property-favorites', JSON.stringify(newFavorites));
        return newFavorites;
      });
    }
  }, [onToggleFavorite]);

  const handleToggleCompare = useCallback((propertyId: string) => {
    if (onToggleCompare) {
      onToggleCompare(propertyId);
    } else {
      setLocalCompareList(prev => {
        const newCompareList = prev.includes(propertyId)
          ? prev.filter(id => id !== propertyId)
          : prev.length < 3 // Limit to 3 properties for comparison
            ? [...prev, propertyId]
            : prev; // Don't add if already at limit
        localStorage.setItem('property-compare', JSON.stringify(newCompareList));
        return newCompareList;
      });
    }
  }, [onToggleCompare]);

  const handleClearAllCompare = useCallback(() => {
    if (onToggleCompare) {
      // If using parent state, clear each item individually to trigger parent updates
      currentCompareList.forEach(id => onToggleCompare(id));
    } else {
      // Clear local state
      setLocalCompareList([]);
      localStorage.setItem('property-compare', JSON.stringify([]));
    }
  }, [onToggleCompare, currentCompareList]);

  // Simulate loading when filters change
  useEffect(() => {
    setIsLoadingResults(true);
    const timer = setTimeout(() => {
      setIsLoadingResults(false);
    }, 300); // Quick search for better UX
    
    return () => clearTimeout(timer);
  }, [filters]);
  useEffect(() => {
    const searchTitle = filters.search 
      ? `Properties in ${filters.search} - Search Results | Rowlly Properties`
      : seoConfigs.search.title;
    const searchDescription = filters.search
      ? `Find properties in ${filters.search}. Expert real estate guidance and luxury properties available.`
      : seoConfigs.search.description;
    
    updatePageSEO({
      ...seoConfigs.search,
      title: searchTitle,
      description: searchDescription,
      canonical: filters.search ? `https://rowllyproperties.com/search?q=${encodeURIComponent(filters.search)}` : seoConfigs.search.canonical
    });
  }, [filters.search]);

  // Generate comprehensive search suggestions
  const searchData = useMemo(() => {
    const locations = new Set<string>();
    const propertyTypes = new Set<string>();
    const features = new Set<string>();
    
    properties.forEach(property => {
      locations.add(property.city);
      locations.add(property.state);
      locations.add(`${property.city}, ${property.state}`);
      locations.add(property.zip);
      locations.add(property.address);
      
      propertyTypes.add(property.propertyType);
      
      if (property.features) {
        property.features.forEach(feature => features.add(feature));
      }
    });
    
    return {
      locations: Array.from(locations),
      propertyTypes: Array.from(propertyTypes),
      features: Array.from(features)
    };
  }, []);

  // Enhanced suggestions with categories
  useEffect(() => {
    if (filters.search && filters.search.length > 1) {
      const query = filters.search.toLowerCase().trim();
      const suggestions = [];
      
      // Location suggestions
      const locationMatches = searchData.locations
        .filter(location => location.toLowerCase().includes(query))
        .slice(0, 3)
        .map(location => ({ text: location, type: 'location' }));
      
      // Property type suggestions
      const typeMatches = searchData.propertyTypes
        .filter(type => type.toLowerCase().includes(query))
        .slice(0, 2)
        .map(type => ({ text: type, type: 'propertyType' }));
      
      // Feature suggestions
      const featureMatches = searchData.features
        .filter(feature => feature.toLowerCase().includes(query))
        .slice(0, 2)
        .map(feature => ({ text: feature, type: 'feature' }));
      
      // Combine all suggestions, prioritizing locations
      suggestions.push(...locationMatches, ...typeMatches, ...featureMatches);
      
      setSearchSuggestions(suggestions.slice(0, 7).map(s => s.text));
    } else {
      setSearchSuggestions([]);
    }
  }, [filters.search, searchData]);

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
            placeholder={searchFocused || filters.search ? "" : "Search properties..."}
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
            className="pl-10 pr-20 text-sm placeholder:text-ellipsis placeholder:text-sm"
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
          <SelectTrigger id="propertyType" className="truncate">
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
            <SelectTrigger id="bedrooms" className="truncate">
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
            <SelectTrigger id="bathrooms" className="truncate">
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
            <SelectTrigger id="status" className="truncate">
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
            <SelectTrigger id="featured" className="truncate">
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
      {/* Breadcrumbs */}
      <div className="container py-0.5 md:py-1">
        <Breadcrumbs 
          items={[
            { label: "Search Homes", isActive: true }
          ]}
          onNavigate={onNavigate}
        />
      </div>

      <div className="container py-4 md:py-6">
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
            {/* Favorites Button */}
            <Button
              variant="outline"
              onClick={() => onNavigate("favorites")}
              className="h-10 px-3 py-2 flex items-center gap-2 justify-between text-sm font-normal border-border/50"
            >
              <div className="flex items-center gap-2">
                <span className="text-red-500">❤</span>
                <span className="hidden sm:inline font-normal">Favorites</span>
              </div>
              {favorites.length > 0 && (
                <span className="bg-primary text-primary-foreground text-xs rounded-full px-2 py-0.5 min-w-[20px] h-5 flex items-center justify-center ml-2">
                  {favorites.length}
                </span>
              )}
            </Button>

            {/* View Mode Toggle */}
            <div className="hidden sm:flex rounded-lg overflow-hidden border h-10 items-stretch">
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("grid")}
                className={`h-full w-10 p-0 border-0 flex items-center justify-center ${
                  viewMode === "grid" ? "rounded-l-md rounded-r-none" : "rounded-none"
                }`}
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("list")}
                className={`h-full w-10 p-0 border-0 flex items-center justify-center ${
                  viewMode === "list" ? "rounded-r-md rounded-l-none" : "rounded-none"
                }`}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>

            {/* Sort Dropdown */}
            <Select
              value={filters.sortBy}
              onValueChange={(value: string) => setFilters({ ...filters, sortBy: value })}
            >
              <SelectTrigger className="w-[200px] h-10 truncate">
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
              <SheetContent side="left" className="w-80 flex flex-col">
                <div className="flex items-center gap-3 mb-8 px-4 pt-6 flex-shrink-0">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary shadow-sm">
                    <SlidersHorizontal className="h-5 w-5 text-primary-foreground" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-lg font-bold text-primary font-display">
                      Search Filters
                    </span>
                    <span className="text-xs text-muted-foreground font-medium tracking-wide">
                      REFINE YOUR SEARCH
                    </span>
                  </div>
                </div>
                <div className="flex-1 overflow-y-auto px-4 pb-6 fade-in-stagger">
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
          <Card className="bg-muted/30">
            <CardContent className="p-8">
              <h3 className="mb-6">Filters</h3>
              {FilterPanel()}
            </CardContent>
          </Card>
        </div>

        {/* Property Results */}
        <div className="lg:col-span-3">
          {/* Compare Properties Bar */}
          {currentCompareList.length > 0 && (
            <div className="mb-6 bg-primary/5 border border-primary/20 rounded-lg p-4">
              <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                <div className="flex items-center gap-2 text-sm">
                  <span className="font-medium">Compare ({currentCompareList.length}/3):</span>
                  <div className="flex flex-wrap gap-1">
                    {currentCompareList.map(id => {
                      const property = properties.find(p => p.id === id);
                      return property ? (
                        <Badge key={id} variant="secondary" className="text-xs">
                          {property.title.split(' ').slice(0, 2).join(' ')}
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-4 w-4 ml-1 p-0 hover:bg-destructive hover:text-destructive-foreground"
                            onClick={() => handleToggleCompare(id)}
                            aria-label={`Remove ${property.title} from comparison`}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </Badge>
                      ) : null;
                    })}
                  </div>
                </div>
                <div className="flex gap-2 ml-auto">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleClearAllCompare}
                    className="text-xs"
                  >
                    Clear All
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => {
                      // Navigate to comparison view
                      onNavigate("compare", { properties: currentCompareList });
                    }}
                    disabled={currentCompareList.length < 2}
                  >
                    Compare Properties
                  </Button>
                </div>
              </div>
            </div>
          )}

          {isLoadingResults ? (
            // Simple loading state - better for accessibility
            <div className="flex justify-center items-center py-16" role="status" aria-live="polite">
              <div className="text-center space-y-4">
                <div className="animate-spin rounded-full h-8 w-8 border-2 border-primary/20 border-t-primary mx-auto"></div>
                <p className="text-muted-foreground">Searching properties...</p>
              </div>
            </div>
          ) : filteredAndSortedProperties.length === 0 ? (
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
              {filteredAndSortedProperties.map((property, index) => (
                <div 
                  key={property.id} 
                  className="fade-in-stagger"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <PropertyCard
                    property={property}
                    onViewDetails={(id) => onNavigate("property", { id })}
                    isFavorite={currentFavorites.includes(property.id)}
                    onToggleFavorite={() => handleToggleFavorite(property.id)}
                    isInCompare={currentCompareList.includes(property.id)}
                    onToggleCompare={() => handleToggleCompare(property.id)}
                    canAddToCompare={currentCompareList.length < 3 || currentCompareList.includes(property.id)}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
    </div>
  );
}
