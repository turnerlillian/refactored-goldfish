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
  const featuredProperties = properties.filter(p => p.featured);

  // SEO Optimization
  useEffect(() => {
    updatePageSEO({
      ...seoConfigs.home,
      structuredData: createOrganizationSchema()
    });
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onNavigate("search", { query: searchQuery });
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
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary-foreground/70 h-4 w-4" aria-hidden="true" />
                      <Input
                        id="property-search"
                        type="search"
                        placeholder={isFocused ? "" : "Search by location, property type, or features..."}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        aria-describedby="search-description"
                        className="pl-10 h-12 border-0 bg-transparent text-base text-primary-foreground placeholder:text-primary-foreground/70 focus-visible:ring-2 focus-visible:ring-secondary/50"
                      />
                      <div id="search-description" className="sr-only">
                        Enter keywords to search for properties. Results will be displayed on the search page.
                      </div>
                    </div>
                    <Button 
                      type="submit" 
                      size="lg" 
                      className="h-12 px-6 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 bg-secondary hover:bg-secondary/90 text-black focus:outline-2 focus:outline-offset-2 focus:outline-secondary"
                      aria-label="Search for properties"
                    >
                      Search
                      <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
                    </Button>
                  </div>
                </form>
              </div>
            </div>
                    </div>\n        </div>\n      </section>

      {/* Featured Properties */}
      <section className="py-12 md:py-16 lg:py-20 bg-muted/50">
        <div className="container">
          <div className="text-center-section header-spacing">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <Award className="h-4 w-4" />
              <span>Featured Properties</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Discover Your Next
              <span className="text-primary block">Dream Property</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Explore our handpicked selection of premium properties, each offering unique features and exceptional value
            </p>
          </div>

          <div className="card-grid card-grid-3">
            {featuredProperties.map((property, index) => (
              <div key={property.id} className="fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <PropertyCard
                  property={property}
                  onViewDetails={(id) => onNavigate("property", { id })}
                />
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button size="lg" onClick={() => onNavigate("search")} className="h-14 px-8 rounded-xl font-semibold bg-primary hover:bg-primary/90 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
              View All Properties
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="section-padding bg-background">
        <div className="container">
          <div className="card-grid card-grid-4">
            {stats.map((stat, index) => (
              <Card key={index} className="group text-center p-8 hover-lift border-0 modern-shadow bg-background backdrop-blur-sm">
                <CardContent className="p-0">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <stat.icon className="h-8 w-8 text-primary" />
                  </div>
                  <div className="text-4xl font-bold text-primary mb-2">{stat.value}</div>
                  <div className="text-muted-foreground font-medium">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="section-padding relative overflow-hidden">
        <div className="absolute inset-0 bg-muted/30" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        
        <div className="container relative">
          <div className="text-center-section header-spacing">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <Award className="h-4 w-4" />
              <span>Why Choose Us</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">Why Top Performers Choose
              <span className="text-primary block">Rowlly Properties</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Join the ranks of successful investors and homeowners who trust our proven track record, 
              market expertise, and commitment to exceptional results
            </p>
          </div>

          <div className="card-grid card-grid-3">
            <Card className="group hover-lift border-0 modern-shadow bg-background/80 backdrop-blur-sm relative overflow-hidden">
              <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <CardContent className="relative p-10 text-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-primary/10 mx-auto mb-8 group-hover:scale-110 transition-transform duration-300">
                  <Search className="h-10 w-10 text-primary" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Smart Search Technology</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Find your perfect home with our AI-powered search filters and personalized recommendations that learn your preferences.
                </p>
              </CardContent>
            </Card>

            <Card className="group hover-lift border-0 modern-shadow bg-background/80 backdrop-blur-sm relative overflow-hidden">
              <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <CardContent className="relative p-10 text-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-primary/10 mx-auto mb-8 group-hover:scale-110 transition-transform duration-300">
                  <Award className="h-10 w-10 text-primary" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Expert Guidance</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Work with seasoned professionals who know the local market inside and out, ensuring you make informed decisions.
                </p>
              </CardContent>
            </Card>

            <Card className="group hover-lift border-0 modern-shadow bg-background/80 backdrop-blur-sm relative overflow-hidden">
              <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <CardContent className="relative p-10 text-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-primary/10 mx-auto mb-8 group-hover:scale-110 transition-transform duration-300">
                  <Users className="h-10 w-10 text-primary" />
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
      <section className="section-padding relative overflow-hidden">
        <div className="absolute inset-0 bg-primary" />
        <div className="absolute inset-0 opacity-20 bg-primary/30" />
        
        <div className="container relative">
          <div className="text-center-section text-primary-foreground">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-foreground/20 backdrop-blur-sm text-primary-foreground text-sm font-medium mb-8">
              <Award className="h-4 w-4" />
              <span>Ready to Get Started?</span>
            </div>
            
            <h2 className="text-4xl lg:text-6xl font-bold mb-6 text-primary-foreground">
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
                className="h-16 px-12 text-lg font-semibold rounded-2xl shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300"
              >
                <Search className="mr-3 h-6 w-6" />
                Browse Premium Properties
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="h-16 px-12 text-lg font-semibold rounded-2xl bg-transparent border-2 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 backdrop-blur-sm shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300" 
                onClick={() => onNavigate("contact")}
              >
                <Users className="mr-3 h-6 w-6" />
                Get Free Consultation
              </Button>
            </div>
            
            <div className="mt-16 flex flex-wrap justify-center items-center gap-8 text-primary-foreground/70">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                <span className="text-sm font-medium">$50M+ in Sales Volume</span>
              </div>
                            <div className="flex items-center gap-2">\n                <Award className="h-5 w-5" />\n                <span className="text-sm font-medium">Top 1% Performance</span>\n              </div>\n              <div className="flex items-center gap-2">\n                <Users className="h-5 w-5" />\n                <span className="text-sm font-medium">98% Client Satisfaction</span>\n              </div>\n            </div>\n          </div>\n        </div>\n      </section>\n    </div>\n  );\n}
            </div>
          </div>
        </div>
      </section>
        </div>\n  );\n}
