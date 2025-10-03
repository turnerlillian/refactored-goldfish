import { Search, TrendingUp, Award, Users, ArrowRight } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Card, CardContent } from "../ui/card";
import { PropertyCard } from "../PropertyCard";
import { properties } from "../../data/mockData";
import { useState, useEffect } from "react";
import { updatePageSEO, seoConfigs, createOrganizationSchema } from "../../utils/seo";

interface HomePageProps {
  onNavigate: (page: string, params?: any) => void;
}

export function HomePage({ onNavigate }: HomePageProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [isLoadingProperties, setIsLoadingProperties] = useState(true);
  const [showSearchSuggestions, setShowSearchSuggestions] = useState(false);
  const featuredProperties = properties.filter(p => p.featured);

  // Search suggestions based on common queries
  const searchSuggestions = [
    "Los Angeles condos",
    "Beverly Hills homes",
    "Santa Monica apartments",
    "Downtown LA lofts",
    "Hollywood studios",
    "Malibu beachfront",
    "Luxury homes under $2M",
    "3 bedroom houses"
  ];

  const filteredSuggestions = searchSuggestions.filter(suggestion =>
    suggestion.toLowerCase().includes(searchQuery.toLowerCase()) && 
    searchQuery.length > 0
  ).slice(0, 5);

  // SEO Optimization
  useEffect(() => {
    updatePageSEO({
      ...seoConfigs.home,
      structuredData: createOrganizationSchema()
    });
  }, []);

  // Simulate loading properties
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoadingProperties(false);
    }, 400); // Quick load for better UX
    
    return () => clearTimeout(timer);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim().length < 2) {
      // Show user feedback for short searches
      return;
    }
    onNavigate("search", { query: searchQuery.trim() });
  };

  const handleSuggestionClick = (suggestion: string) => {
    setSearchQuery(suggestion);
    setShowSearchSuggestions(false);
    onNavigate("search", { query: suggestion });
  };

  const handleSearchFocus = () => {
    setIsFocused(true);
    setShowSearchSuggestions(true);
  };

  const handleSearchBlur = () => {
    // Delay hiding suggestions to allow clicking
    setTimeout(() => {
      setIsFocused(false);
      setShowSearchSuggestions(false);
    }, 200);
  };

  const stats = [
    { icon: TrendingUp, value: "$50M+", label: "In Sales Volume" },
    { icon: Award, value: "15+", label: "Years Experience" },
    { icon: Users, value: "98%", label: "Client Satisfaction" },
    { icon: Search, value: "<30", label: "Avg. Days on Market" },
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="py-12 md:py-16 lg:py-20 relative overflow-hidden min-h-[70vh] flex items-center" aria-label="Welcome and property search">
        <div className="absolute inset-0 bg-primary" aria-hidden="true" />
        <div className="absolute inset-0 bg-black/20" aria-hidden="true" />
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-primary/30 rounded-full blur-3xl float-animation" aria-hidden="true" />
        
        <div className="container relative z-10">
          <div className="text-center-section fade-in text-primary-foreground homepage-hero">
            <h1 className="text-5xl lg:text-7xl font-bold leading-tight mb-6">
              Find Your Perfect
              <span className="block text-secondary">Luxury Home</span>
            </h1>
            
            <p className="text-xl text-primary-foreground/90 max-w-3xl mx-auto mb-6 leading-relaxed">
              With over 15 years of proven success, we've helped 5,000+ families find their perfect home. 
              Experience personalized service backed by local expertise and cutting-edge technology.
            </p>
            
            <div className="flex flex-wrap justify-center items-center gap-6 text-primary-foreground/80 mb-10 text-sm font-medium">
              <div className="flex items-center gap-2">
                <Award className="h-4 w-4" aria-hidden="true" />
                <span>Licensed & Certified</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4" aria-hidden="true" />
                <span>Top 1% of Agents</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4" aria-hidden="true" />
                <span>200+ 5-Star Reviews</span>
              </div>
            </div>
            
            <div className="relative max-w-2xl mx-auto mb-8">
              <div className="bg-transparent backdrop-blur-sm p-3 rounded-2xl shadow-lg border-2 border-primary-foreground/30">
                <form onSubmit={handleSearch} role="search" aria-label="Property search">
                  <div className="flex gap-3">
                    <div className="flex-1 relative">
                      <label htmlFor="property-search" className="sr-only">
                        Search for properties by location, type, or features
                      </label>
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary-foreground/70 h-4 w-4 z-10" aria-hidden="true" />
                      <Input
                        id="property-search"
                        type="search"
                        placeholder={isFocused ? "Type to search..." : "Search by location, property type, or features..."}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onFocus={handleSearchFocus}
                        onBlur={handleSearchBlur}
                        aria-describedby="search-description"
                        aria-expanded={showSearchSuggestions && filteredSuggestions.length > 0}
                        aria-haspopup="listbox"
                        role="combobox"
                        className="pl-10 h-12 border-0 bg-transparent text-base text-primary-foreground placeholder:text-primary-foreground/70 focus-visible:ring-2 focus-visible:ring-secondary/50"
                      />
                      <div id="search-description" className="sr-only">
                        Enter keywords to search for properties. Use suggestions or press enter to search.
                      </div>
                      
                      {/* Search Suggestions Dropdown */}
                      {showSearchSuggestions && filteredSuggestions.length > 0 && (
                        <div className="absolute top-full left-0 right-0 mt-1 bg-background/95 backdrop-blur-sm border-2 border-primary/20 rounded-xl shadow-lg z-20" role="listbox">
                          {filteredSuggestions.map((suggestion, index) => (
                            <button
                              key={suggestion}
                              type="button"
                              onClick={() => handleSuggestionClick(suggestion)}
                              className="w-full text-left px-4 py-3 hover:bg-primary/10 transition-colors first:rounded-t-xl last:rounded-b-xl flex items-center gap-2"
                              role="option"
                            >
                              <Search className="h-3 w-3 text-muted-foreground" aria-hidden="true" />
                              <span className="text-sm">{suggestion}</span>
                            </button>
                          ))}
                        </div>
                      )}
                      
                      {/* Show helper text for short queries */}
                      {searchQuery.length > 0 && searchQuery.length < 2 && (
                        <div className="absolute top-full left-0 right-0 mt-1 bg-amber-50 border-2 border-amber-200 rounded-xl p-3 z-20">
                          <div className="text-sm text-amber-800 flex items-center gap-2">
                            <span className="text-amber-500">💡</span>
                            Please enter at least 2 characters to search
                          </div>
                        </div>
                      )}
                    </div>
                    <Button 
                      type="submit" 
                      size="lg" 
                      disabled={searchQuery.trim().length < 2}
                      className="h-12 px-6 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200 bg-secondary hover:bg-secondary/90 text-black focus:outline-2 focus:outline-offset-2 focus:outline-secondary btn-press disabled:opacity-50 disabled:cursor-not-allowed"
                      aria-label="Search for properties"
                    >
                      Search
                      <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-12 md:py-16 lg:py-20 bg-muted/50" aria-labelledby="featured-properties">
        <div className="container">
          <div className="text-center-section header-spacing">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <Award className="h-4 w-4" aria-hidden="true" />
              <span>Featured Properties</span>
            </div>
            <h2 id="featured-properties" className="text-4xl lg:text-5xl font-bold mb-6">
              Discover Your Next
              <span className="text-primary block">Dream Property</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Explore our handpicked selection of premium properties, each offering unique features and exceptional value
            </p>
          </div>

          <div className="card-grid card-grid-3" role="list" aria-label="Featured properties">
            {isLoadingProperties ? (
              // Simple loading state - better for accessibility
              <div className="col-span-full flex justify-center items-center py-16" role="status" aria-live="polite">
                <div className="text-center space-y-4">
                  <div className="animate-spin rounded-full h-8 w-8 border-2 border-primary/20 border-t-primary mx-auto"></div>
                  <p className="text-muted-foreground">Loading featured properties...</p>
                </div>
              </div>
            ) : (
              // Show actual property cards
              featuredProperties.map((property, index) => (
                <div 
                  key={property.id} 
                  className="fade-in-stagger" 
                  role="listitem" 
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <PropertyCard
                    property={property}
                    onViewDetails={(id) => onNavigate("property", { id })}
                  />
                </div>
              ))
            )}
          </div>

          <div className="text-center mt-12">
            <Button 
              size="lg" 
              onClick={() => onNavigate("search")} 
              className="h-14 px-8 rounded-xl font-semibold bg-primary hover:bg-primary/90 transition-all duration-200 shadow-lg hover:shadow-xl focus:outline-2 focus:outline-offset-2 focus:outline-secondary btn-press interactive-scale"
              aria-label="View all available properties"
            >
              View All Properties
              <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="section-padding bg-background" aria-labelledby="company-stats">
        <div className="container">
          <h2 id="company-stats" className="sr-only">Company Statistics and Achievements</h2>
          <div className="card-grid card-grid-4" role="list" aria-label="Company achievements and statistics">
            {stats.map((stat, index) => (
              <Card key={index} className="group text-center p-8 hover-lift border-0 modern-shadow bg-background backdrop-blur-sm fade-in-stagger" role="listitem" style={{ animationDelay: `${index * 100}ms` }}>
                <CardContent className="p-0">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 mx-auto mb-6 group-hover:scale-110 transition-transform duration-200">
                    <stat.icon className="h-8 w-8 text-primary" aria-hidden="true" />
                  </div>
                  <div className="text-4xl font-bold text-primary mb-2" aria-label={`${stat.value} ${stat.label}`}>{stat.value}</div>
                  <div className="text-muted-foreground font-medium">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="section-padding relative overflow-hidden" aria-labelledby="why-choose-us">
        <div className="absolute inset-0 bg-muted/30" aria-hidden="true" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" aria-hidden="true" />
        
        <div className="container relative">
          <div className="text-center-section header-spacing">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <Award className="h-4 w-4" aria-hidden="true" />
              <span>Why Choose Us</span>
            </div>
            <h2 id="why-choose-us" className="text-4xl lg:text-5xl font-bold mb-6">Why Top Performers Choose
              <span className="text-primary block">Rowlly Properties</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Join the ranks of successful investors and homeowners who trust our proven track record, 
              market expertise, and commitment to exceptional results
            </p>
          </div>

          <div className="card-grid card-grid-3" role="list" aria-label="Our key advantages">
            <Card className="group hover-lift border-0 modern-shadow bg-background/80 backdrop-blur-sm relative overflow-hidden" role="listitem">
              <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" aria-hidden="true" />
              <CardContent className="relative p-10 text-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-primary/10 mx-auto mb-8 group-hover:scale-110 transition-transform duration-300">
                  <Search className="h-10 w-10 text-primary" aria-hidden="true" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Smart Search Technology</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Find your perfect home with our AI-powered search filters and personalized recommendations that learn your preferences.
                </p>
              </CardContent>
            </Card>

            <Card className="group hover-lift border-0 modern-shadow bg-background/80 backdrop-blur-sm relative overflow-hidden" role="listitem">
              <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" aria-hidden="true" />
              <CardContent className="relative p-10 text-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-primary/10 mx-auto mb-8 group-hover:scale-110 transition-transform duration-300">
                  <Award className="h-10 w-10 text-primary" aria-hidden="true" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Expert Guidance</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Work with seasoned professionals who know the local market inside and out, ensuring you make informed decisions.
                </p>
              </CardContent>
            </Card>

            <Card className="group hover-lift border-0 modern-shadow bg-background/80 backdrop-blur-sm relative overflow-hidden" role="listitem">
              <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" aria-hidden="true" />
              <CardContent className="relative p-10 text-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-primary/10 mx-auto mb-8 group-hover:scale-110 transition-transform duration-300">
                  <Users className="h-10 w-10 text-primary" aria-hidden="true" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Trusted Partnership</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Join thousands of satisfied clients who have found their dream homes with our dedicated, transparent service.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding relative overflow-hidden" aria-labelledby="get-started">
        <div className="absolute inset-0 bg-primary" aria-hidden="true" />
        <div className="absolute inset-0 opacity-20 bg-primary/30" aria-hidden="true" />
        
        <div className="container relative">
          <div className="text-center-section text-primary-foreground">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-foreground/20 backdrop-blur-sm text-primary-foreground text-sm font-medium mb-8">
              <Award className="h-4 w-4" aria-hidden="true" />
              <span>Ready to Get Started?</span>
            </div>
            
            <h2 id="get-started" className="text-4xl lg:text-6xl font-bold mb-6 text-primary-foreground">
              Your Next Home is
              <span className="block text-secondary">Just a Click Away</span>
            </h2>
            
            <p className="text-xl text-primary-foreground/90 max-w-3xl mx-auto mb-12 leading-relaxed">
              Schedule your complimentary consultation today. Our expert team is standing by to provide 
              personalized guidance and exclusive market insights.
            </p>
            
            <div className="btn-group">
              <Button 
                size="lg" 
                variant="secondary" 
                onClick={() => onNavigate("search")}
                className="h-16 px-12 text-lg font-semibold rounded-2xl shadow-2xl hover:shadow-3xl transform transition-all duration-200 focus:outline-2 focus:outline-offset-2 focus:outline-secondary btn-press interactive-scale"
                aria-label="Browse premium property listings"
              >
                <Search className="mr-3 h-6 w-6" aria-hidden="true" />
                Browse Premium Properties
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="h-16 px-12 text-lg font-semibold rounded-2xl bg-transparent border-2 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 backdrop-blur-sm shadow-2xl hover:shadow-3xl transform transition-all duration-200 focus:outline-2 focus:outline-offset-2 focus:outline-secondary btn-press interactive-scale" 
                onClick={() => onNavigate("contact")}
                aria-label="Get free real estate consultation"
              >
                <Users className="mr-3 h-6 w-6" aria-hidden="true" />
                Get Free Consultation
              </Button>
            </div>
            
            <div className="mt-16 flex flex-wrap justify-center items-center gap-8 text-primary-foreground/70">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" aria-hidden="true" />
                <span className="text-sm font-medium">$50M+ in Sales Volume</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="h-5 w-5" aria-hidden="true" />
                <span className="text-sm font-medium">Top 1% Performance</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5" aria-hidden="true" />
                <span className="text-sm font-medium">98% Client Satisfaction</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}