import { useState } from "react";
import { ArrowLeft, Bed, Bath, Maximize, MapPin, Heart, Share2, Calendar, DollarSign, Star, Phone, Mail } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { ContactForm } from "../ContactForm";
import { properties, agents } from "../../data/mockData";
import { ImageWithFallback } from "../ImageWithFallback";

interface PropertyDetailPageProps {
  propertyId: string;
  onNavigate: (page: string, params?: any) => void;
}

export function PropertyDetailPage({ propertyId, onNavigate }: PropertyDetailPageProps) {
  const property = properties.find((p) => p.id === propertyId);
  const agent = property ? agents.find((a) => a.id === property.agentId) : null;
  const [selectedImage, setSelectedImage] = useState(0);

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
      {/* Header */}
      <div className="border-b">
        <div className="container py-4">
          <Button variant="ghost" onClick={() => onNavigate("search")} className="mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Search
          </Button>
        </div>
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
                <Button variant="secondary" size="icon">
                  <Heart className="h-4 w-4" />
                </Button>
                <Button variant="secondary" size="icon">
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
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardContent className="p-6 space-y-4">
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

                <Button className="w-full" onClick={() => onNavigate("contact")}>
                  <Calendar className="h-4 w-4 mr-2" />
                  Schedule Tour
                </Button>
                <Button variant="outline" className="w-full">
                  Request Info
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Property Details */}
      <div className="container pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {/* Overview */}
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle>{property.title}</CardTitle>
                    <div className="flex items-center gap-2 mt-2 text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      <span>
                        {property.address}, {property.city}, {property.state} {property.zip}
                      </span>
                    </div>
                  </div>
                  <Badge>{property.status}</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
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
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5" />
                  Financial Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="mb-3">Tax History</h4>
                  <div className="space-y-2">
                    {property.financial.taxHistory.map((tax) => (
                      <div key={tax.year} className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">{tax.year}</span>
                        <span>${tax.amount.toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Est. Monthly Payment</p>
                    <p className="text-xl">
                      ${Math.round((property.price * 0.05) / 12).toLocaleString()}
                    </p>
                    <p className="text-xs text-muted-foreground">Based on 20% down, 6.5% APR</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Price per Sqft</p>
                    <p className="text-xl">${property.financial.pricePerSqft}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Neighborhood */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Neighborhood
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    <span>{property.neighborhood.rating}/5</span>
                  </div>
                  <span className="text-sm text-muted-foreground">Neighborhood Rating</span>
                </div>

                <Separator />

                <div>
                  <h4 className="mb-3">Nearby Schools</h4>
                  <div className="space-y-2">
                    {property.neighborhood.schools.map((school, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-sm">{school.name}</span>
                        <Badge variant="secondary">{school.rating}/10</Badge>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Walk Score</p>
                    <p className="text-xl">{property.neighborhood.walkScore}/100</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Transit Score</p>
                    <p className="text-xl">{property.neighborhood.transitScore}/100</p>
                  </div>
                </div>

                {/* Map Placeholder */}
                <div className="aspect-video bg-muted rounded-lg flex items-center justify-center mt-4">
                  <div className="text-center text-muted-foreground">
                    <MapPin className="h-8 w-8 mx-auto mb-2" />
                    <p className="text-sm">Interactive Map</p>
                    <p className="text-xs">Google Maps integration would go here</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Agent Card */}
            {agent && (
              <Card>
                <CardHeader>
                  <CardTitle>Contact Agent</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
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
                      <a href={`tel:${agent.phone}`}>
                        <Phone className="h-4 w-4 mr-2" />
                        {agent.phone}
                      </a>
                    </Button>
                    <Button variant="outline" className="w-full justify-start" asChild>
                      <a href={`mailto:${agent.email}`}>
                        <Mail className="h-4 w-4 mr-2" />
                        Email Agent
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
  );
}
