import { Search, TrendingUp, Award, Users, ArrowRight } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Card, CardContent } from "../ui/card";
import { PropertyCard } from "../PropertyCard";
import { properties } from "../../data/mockData";
import { useState } from "react";

interface HomePageProps {
  onNavigate: (page: string, params?: any) => void;
}

export function HomePage({ onNavigate }: HomePageProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const featuredProperties = properties.filter(p => p.featured);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onNavigate("search", { query: searchQuery });
  };

  const stats = [
    { icon: TrendingUp, value: "5,000+", label: "Properties Sold" },
    { icon: Award, value: "15+", label: "Years Experience" },
    { icon: Users, value: "200+", label: "Happy Clients" },
    { icon: Search, value: "24/7", label: "Support Available" },
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="py-12 md:py-16 lg:py-20 relative overflow-hidden min-h-[70vh] flex items-center">
        <div className="absolute inset-0 bg-primary" />
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-primary/30 rounded-full blur-3xl float-animation" />
        
        <div className="container relative z-10">
          <div className="text-center-section fade-in text-primary-foreground homepage-hero">
            <h1 className="text-5xl lg:text-7xl font-bold leading-tight mb-6">
              Find Your Perfect
              <span className="block text-secondary">Dream Home</span>
            </h1>
            
            <p className="text-xl text-primary-foreground/90 max-w-3xl mx-auto mb-10 leading-relaxed">
              Discover exceptional properties with our expert team. Whether you're buying, selling, or investing, 
              we're here to guide you through every step of your real estate journey.
            </p>
            
            <div className="relative max-w-2xl mx-auto mb-8">
              <div className="bg-transparent backdrop-blur-sm p-3 rounded-2xl shadow-lg border-2 border-white/30">
                <form onSubmit={handleSearch} className="flex gap-3">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary-foreground/70 h-4 w-4" />
                    <Input
                      placeholder="Search by location, property type, or features..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 h-12 border-0 bg-transparent text-base text-white placeholder:text-white/70 focus-visible:ring-2 focus-visible:ring-secondary/50"
                    />
                  </div>
                  <Button type="submit" size="lg" className="h-12 px-6 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 bg-secondary hover:bg-secondary/90 text-black">
                    Search
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

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
              <Card key={index} className="group text-center p-8 hover-lift border-0 modern-shadow bg-white backdrop-blur-sm">
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
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">Experience Excellence in
              <span className="text-primary block">Real Estate</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Discover the difference with our professional approach, cutting-edge technology, and personalized service
            </p>
          </div>

          <div className="card-grid card-grid-3">
            <Card className="group hover-lift border-0 modern-shadow bg-white/80 backdrop-blur-sm relative overflow-hidden">
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

            <Card className="group hover-lift border-0 modern-shadow bg-white/80 backdrop-blur-sm relative overflow-hidden">
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

            <Card className="group hover-lift border-0 modern-shadow bg-white/80 backdrop-blur-sm relative overflow-hidden">
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
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm font-medium mb-8">
              <Award className="h-4 w-4" />
              <span>Ready to Get Started?</span>
            </div>
            
            <h2 className="text-4xl lg:text-6xl font-bold mb-6 text-white">
              Your Dream Home is
              <span className="block text-secondary">Just One Click Away</span>
            </h2>
            
            <p className="text-xl text-primary-foreground/90 max-w-3xl mx-auto mb-12 leading-relaxed">
              Get started today and let our expert team guide you through every step of your real estate journey with confidence and ease.
            </p>
            
            <div className="btn-group">
              <Button 
                size="lg" 
                variant="secondary" 
                onClick={() => onNavigate("search")}
                className="h-16 px-12 text-lg font-semibold rounded-2xl shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300"
              >
                <Search className="mr-3 h-6 w-6" />
                Explore Properties
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="h-16 px-12 text-lg font-semibold rounded-2xl bg-transparent border-2 border-white/30 text-white hover:bg-white/10 backdrop-blur-sm transition-all duration-300" 
                onClick={() => onNavigate("contact")}
              >
                <Users className="mr-3 h-6 w-6" />
                Talk to an Expert
              </Button>
            </div>
            
            <div className="mt-16 flex flex-wrap justify-center items-center gap-8 text-primary-foreground/70">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                <span className="text-sm font-medium">5,000+ Homes Sold</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="h-5 w-5" />
                <span className="text-sm font-medium">15+ Years Experience</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                <span className="text-sm font-medium">200+ Happy Families</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
