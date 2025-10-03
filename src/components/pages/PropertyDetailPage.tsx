import { useState, useEffect } from "react";
import { ArrowLeft, Bed, Bath, Maximize, MapPin, Heart, Share2, Calendar, DollarSign, Star, Phone, Mail } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { ContactForm } from "../ContactForm";
import { properties, agents } from "../../data/mockData";
import { ImageWithFallback } from "../ImageWithFallback";
import { updatePageSEO, createPropertySchema, createBreadcrumbSchema } from "../../utils/seo";
import { Breadcrumbs } from "../ui/breadcrumbs";

interface PropertyDetailPageProps {
  propertyId: string;
  onNavigate: (page: string, params?: any) => void;
  favorites?: string[];
  onToggleFavorite?: (propertyId: string) => void;
}

export function PropertyDetailPage({ propertyId, onNavigate, favorites = [], onToggleFavorite }: PropertyDetailPageProps) {
  const property = properties.find((p) => p.id === propertyId);
  const agent = property ? agents.find((a) => a.id === property.agentId) : null;
  const [selectedImage, setSelectedImage] = useState(0);
  const isFavorited = favorites.includes(propertyId);

  // Handle share functionality
  const handleShare = async () => {
    const shareData = {
      title: property?.title || 'Property',
      text: `Check out this property: ${property?.title}`,
      url: window.location.href,
    };

    try {
      if (navigator.share && navigator.canShare?.(shareData)) {
        await navigator.share(shareData);
      } else {
        // Fallback: copy to clipboard
        await navigator.clipboard.writeText(window.location.href);
        // You could add a toast notification here
        console.log('Property link copied to clipboard!');
      }
    } catch (error) {
      console.error('Error sharing:', error);
      // Fallback: copy to clipboard
      try {
        await navigator.clipboard.writeText(window.location.href);
        console.log('Property link copied to clipboard!');
      } catch (clipboardError) {
        console.error('Failed to copy to clipboard:', clipboardError);
      }
    }
  };

  // SEO Optimization
  useEffect(() => {
    if (property) {
      const breadcrumbs = [
        { name: "Home", url: "https://rowllyproperties.com" },
        { name: "Properties", url: "https://rowllyproperties.com/search" },
        { name: property.title, url: `https://rowllyproperties.com/property/${property.id}` }
      ];

      updatePageSEO({
        title: `${property.title} - ${property.price.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })} | Rowlly Properties`,
        description: `${property.description} Located in ${property.city}, ${property.state}. ${property.bedrooms} beds, ${property.bathrooms} baths, ${property.sqft} sqft. Contact our expert agents today.`,
        keywords: `${property.title}, ${property.city} ${property.state}, ${property.propertyType}, real estate, property for sale`,
        canonical: `https://rowllyproperties.com/property/${property.id}`,
        ogTitle: `${property.title} - Premium Real Estate`,
        ogDescription: `${property.price.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })} • ${property.bedrooms} beds • ${property.bathrooms} baths • ${property.sqft} sqft`,
        ogImage: property.images[0],
        ogType: "article",
        structuredData: [
          createPropertySchema(property),
          createBreadcrumbSchema(breadcrumbs)
        ]
      });
    }
  }, [property]);

  if (!property) {
    return (
      <div className="container py-16 text-center">
        <h2>Property not found</h2>
        <Button onClick={() => onNavigate("search")} className="mt-4">
          Back to Search
        </Button>
      </div>
    );
  }

  return (
    <div>
      {/* Breadcrumbs */}
      <div className="container py-0.5 md:py-1">
        <Breadcrumbs 
          items={[
            { label: "Search Homes", onClick: () => onNavigate("search") },
            { label: property.title, isActive: true }
          ]}
          onNavigate={onNavigate}
        />
      </div>

      {/* Header */}
      <div className="border-b">
        <div className="container py-4">
          <Button variant="ghost" onClick={() => onNavigate("search")} className="mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Search
          </Button>
        </div>
      </div>

      {/* Property Title & Key Info */}
      <div className="container py-6">
        <Card className="bg-muted/30">
          <CardContent className="p-6 lg:p-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div>
                <h1 className="text-3xl lg:text-4xl font-bold text-primary mb-2">{property.title}</h1>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>
                    {property.address}, {property.city}, {property.state} {property.zip}
                  </span>
                </div>
              </div>
              <div className="flex flex-col lg:items-end">
                <Badge>{property.status}</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Image Gallery */}
      <div className="container py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          <div className="lg:col-span-3">
            <div className="relative aspect-[16/10] rounded-lg overflow-hidden">
              <ImageWithFallback
                src={property.images[selectedImage] || property.images[0]}
                alt={property.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 right-4 flex gap-2">
                <Button 
                  variant="secondary" 
                  size="icon"
                  onClick={() => onToggleFavorite?.(propertyId)}
                  className={`transition-colors ${
                    isFavorited 
                      ? "bg-red-100 hover:bg-red-200 text-red-600" 
                      : "bg-background/80 hover:bg-background"
                  }`}
                  aria-label={isFavorited ? "Remove from favorites" : "Add to favorites"}
                >
                  <Heart className={`h-4 w-4 ${
                    isFavorited ? "fill-current" : ""
                  }`} />
                </Button>
                <Button 
                  variant="secondary" 
                  size="icon"
                  onClick={handleShare}
                  className="bg-background/80 hover:bg-background"
                  aria-label="Share property"
                >
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-4 gap-2 mt-4">
              {property.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-[4/3] rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImage === index ? "border-primary" : "border-transparent"
                  }`}
                >
                  <ImageWithFallback
                    src={image}
                    alt={`${property.title} - Image ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Quick Info Card */}
          <div className="lg:col-span-1 flex justify-center">
            <div className="w-full max-w-md">
              <Card className="bg-muted/30">
                <CardContent className="p-8 space-y-4">
                <div>
                  <div className="text-3xl text-primary mb-2">
                    ${property.price.toLocaleString()}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    ${property.financial.pricePerSqft}/sqft
                  </p>
                </div>

                <Separator />

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Bedrooms</span>
                    <span className="flex items-center gap-1">
                      <Bed className="h-4 w-4" />
                      {property.bedrooms}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Bathrooms</span>
                    <span className="flex items-center gap-1">
                      <Bath className="h-4 w-4" />
                      {property.bathrooms}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Square Feet</span>
                    <span className="flex items-center gap-1">
                      <Maximize className="h-4 w-4" />
                      {property.sqft.toLocaleString()}
                    </span>
                  </div>
                </div>

                <Separator />

                <Button className="w-full" onClick={() => {
                  const formElement = document.getElementById('schedule-tour-form');
                  if (formElement) {
                    formElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }}> 
                  <Calendar className="h-4 w-4 mr-2" />
                  Schedule Tour
                </Button>
                <Button variant="outline" className="w-full" onClick={() => onNavigate("contact")}>
                  Request Info
                </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Property Details */}
      <div className="container pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {/* Overview */}
            <Card className="bg-muted/30">
              <CardContent className="p-8 space-y-6">
                <div>
                  <h3 className="mb-3">Description</h3>
                  <p className="text-muted-foreground">{property.description}</p>
                </div>

                <Separator />

                <div>
                  <h3 className="mb-3">Property Details</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Property Type</p>
                      <p>{property.propertyType}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Year Built</p>
                      <p>{property.yearBuilt}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Lot Size</p>
                      <p>{property.lotSize}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">HOA Fees</p>
                      <p>{property.financial.hoa === 0 ? "None" : `$${property.financial.hoa}/mo`}</p>
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="mb-3">Features & Amenities</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {property.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Financial Information */}
            <Card className="bg-muted/30">
              <CardContent className="p-4 md:p-8">
                <h3 className="mb-4 md:mb-6 flex items-center gap-2 text-lg md:text-xl font-semibold">
                  <DollarSign className="h-5 w-5" />
                  Financial Information
                </h3>
                <div className="space-y-6">
                  <div>
                    <h4 className="mb-3 text-base font-medium">Tax History</h4>
                    <div className="space-y-3">
                      {property.financial.taxHistory.map((tax) => (
                        <div key={tax.year} className="flex items-center justify-between py-2 border-b border-border/50 last:border-0">
                          <span className="text-sm text-muted-foreground font-medium">{tax.year}</span>
                          <span className="font-semibold">${tax.amount.toLocaleString()}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Separator className="my-6" />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground font-medium">Est. Monthly Payment</p>
                      <p className="text-2xl md:text-xl font-bold text-primary">
                        ${Math.round((property.price * 0.05) / 12).toLocaleString()}
                      </p>
                      <p className="text-xs text-muted-foreground leading-relaxed">Based on 20% down, 6.5% APR</p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground font-medium">Price per Sqft</p>
                      <p className="text-2xl md:text-xl font-bold text-primary">${property.financial.pricePerSqft}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Neighborhood */}
            <Card className="bg-muted/30">
              <CardContent className="p-4 md:p-8">
                <h3 className="mb-4 md:mb-6 flex items-center gap-2 text-lg md:text-xl font-semibold">
                  <MapPin className="h-5 w-5" />
                  Neighborhood
                </h3>
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
                    <div className="flex items-center gap-2">
                      <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                      <span className="text-lg font-semibold">{property.neighborhood.rating}/5</span>
                    </div>
                    <span className="text-sm text-muted-foreground font-medium">Neighborhood Rating</span>
                  </div>

                  <Separator className="my-6" />

                  <div>
                    <h4 className="mb-4 text-base font-medium">Nearby Schools</h4>
                    <div className="space-y-3">
                      {property.neighborhood.schools.map((school, index) => (
                        <div key={index} className="flex items-center justify-between py-2 border-b border-border/50 last:border-0">
                          <span className="text-sm font-medium">{school.name}</span>
                          <Badge variant="secondary" className="font-semibold">{school.rating}/10</Badge>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Separator className="my-6" />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground font-medium">Walk Score</p>
                      <p className="text-2xl md:text-xl font-bold text-primary">{property.neighborhood.walkScore}/100</p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground font-medium">Transit Score</p>
                      <p className="text-2xl md:text-xl font-bold text-primary">{property.neighborhood.transitScore}/100</p>
                    </div>
                  </div>

                  {/* Map Placeholder */}
                  <div className="aspect-video bg-muted rounded-lg flex items-center justify-center mt-6">
                    <div className="text-center text-muted-foreground">
                      <MapPin className="h-8 w-8 mx-auto mb-2" />
                      <p className="text-sm font-medium">Interactive Map</p>
                      <p className="text-xs">Google Maps integration would go here</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Agent Card */}
            {agent && (
              <Card className="bg-muted/30">
                <CardContent className="p-8 space-y-4">
                  <h3 className="mb-4">Contact Agent</h3>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={agent.image} alt={agent.name} />
                      <AvatarFallback>{agent.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{agent.name}</p>
                      <p className="text-sm text-muted-foreground">{agent.title}</p>
                      <div className="flex items-center gap-1 mt-1">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm">{agent.rating} ({agent.reviews} reviews)</span>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <Button variant="outline" className="w-full justify-start" asChild>
                      <a href={`tel:${agent.phone}`} className="flex items-center truncate">
                        <Phone className="h-4 w-4 mr-2 flex-shrink-0" />
                        <span className="truncate">{agent.phone}</span>
                      </a>
                    </Button>
                    <Button variant="outline" className="w-full justify-start" asChild>
                      <a href={`mailto:${agent.email}`} className="flex items-center">
                        <Mail className="h-4 w-4 mr-2 flex-shrink-0" />
                        <span>Email Agent</span>
                      </a>
                    </Button>
                  </div>

                  <Button className="w-full" onClick={() => onNavigate("agent", { id: agent.id })}>
                    View Full Profile
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Contact Form */}
            <div id="schedule-tour-form" className="max-w-md mx-auto">
              <ContactForm
                title="Schedule a Tour"
                description="Interested in this property? Fill out the form below."
                propertyId={property.id}
                agentId={property.agentId}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
