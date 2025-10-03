import { ArrowLeft, Bed, Bath, Maximize, MapPin, Calendar, DollarSign } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { properties } from "../../data/mockData";
import { ImageWithFallback } from "../ImageWithFallback";
import { updatePageSEO } from "../../utils/seo";
import { useEffect } from "react";

interface PropertyComparisonPageProps {
  onNavigate: (page: string, params?: any) => void;
  propertyIds: string[];
}

export function PropertyComparisonPage({ onNavigate, propertyIds }: PropertyComparisonPageProps) {
  const comparisonProperties = properties.filter(property => propertyIds.includes(property.id));

  useEffect(() => {
    updatePageSEO({
      title: "Property Comparison | Rowlly Properties",
      description: "Compare properties side by side to make the best decision for your next home.",
      canonical: "https://rowllyproperties.com/compare"
    });
  }, []);

  if (comparisonProperties.length === 0) {
    return (
      <div className="container py-12">
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold">Property Comparison</h1>
          <p className="text-muted-foreground">No properties selected for comparison.</p>
          <Button onClick={() => onNavigate("search")}>
            Back to Search
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-12">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="icon"
            onClick={() => onNavigate("search")}
            aria-label="Back to search results"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Property Comparison</h1>
            <p className="text-muted-foreground">
              Comparing {comparisonProperties.length} {comparisonProperties.length === 1 ? 'property' : 'properties'}
            </p>
          </div>
        </div>

        {/* Comparison Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {comparisonProperties.map((property) => {
            const formattedPrice = property.price.toLocaleString('en-US', { 
              style: 'currency', 
              currency: 'USD', 
              maximumFractionDigits: 0 
            });

            return (
              <Card key={property.id} className="overflow-hidden">
                <div className="relative aspect-[4/3]">
                  <ImageWithFallback
                    src={property.images[0]}
                    alt={`${property.title} - Property comparison view`}
                    className="w-full h-full object-cover"
                  />
                  {property.featured && (
                    <Badge className="absolute top-3 left-3 bg-secondary text-black font-semibold">
                      Featured
                    </Badge>
                  )}
                  <Badge 
                    variant="secondary" 
                    className="absolute bottom-3 left-3 bg-background/95 backdrop-blur-sm text-foreground"
                  >
                    {property.status}
                  </Badge>
                </div>

                <CardHeader className="pb-4">
                  <CardTitle className="text-lg leading-tight">{property.title}</CardTitle>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="h-4 w-4 text-primary flex-shrink-0" />
                    <span className="text-sm">
                      {property.address}, {property.city}, {property.state}
                    </span>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Price */}
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-primary" />
                    <span className="font-bold text-xl text-primary">{formattedPrice}</span>
                  </div>

                  {/* Key Stats */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Bed className="h-4 w-4 text-primary" />
                        <span className="text-sm">Bedrooms</span>
                      </div>
                      <span className="font-medium">{property.bedrooms}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Bath className="h-4 w-4 text-primary" />
                        <span className="text-sm">Bathrooms</span>
                      </div>
                      <span className="font-medium">{property.bathrooms}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Maximize className="h-4 w-4 text-primary" />
                        <span className="text-sm">Square Feet</span>
                      </div>
                      <span className="font-medium">{property.sqft.toLocaleString()}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-primary" />
                        <span className="text-sm">Year Built</span>
                      </div>
                      <span className="font-medium">{property.yearBuilt}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm">Property Type</span>
                      <Badge variant="outline">{property.propertyType}</Badge>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm">Price per Sq Ft</span>
                      <span className="font-medium">
                        ${property.financial.pricePerSqft.toLocaleString()}
                      </span>
                    </div>

                    {property.financial.hoa > 0 && (
                      <div className="flex items-center justify-between">
                        <span className="text-sm">HOA Fee</span>
                        <span className="font-medium">
                          ${property.financial.hoa.toLocaleString()}/month
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Features */}
                  {property.features && property.features.length > 0 && (
                    <div className="space-y-2">
                      <h4 className="font-medium text-sm">Key Features</h4>
                      <div className="flex flex-wrap gap-1">
                        {property.features.slice(0, 6).map((feature, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {feature}
                          </Badge>
                        ))}
                        {property.features.length > 6 && (
                          <Badge variant="secondary" className="text-xs">
                            +{property.features.length - 6} more
                          </Badge>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex gap-2 pt-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                      onClick={() => onNavigate("property", { id: property.id })}
                    >
                      View Details
                    </Button>
                    <Button
                      variant="default"
                      size="sm"
                      className="flex-1"
                      onClick={() => onNavigate("contact")}
                    >
                      Contact Agent
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className="text-center space-y-4 py-8 border-t">
          <h2 className="text-2xl font-bold">Ready to Schedule a Viewing?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our expert agents are ready to help you explore these properties and find your perfect home.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button size="lg" onClick={() => onNavigate("contact")}>
              Contact an Agent
            </Button>
            <Button variant="outline" size="lg" onClick={() => onNavigate("search")}>
              Continue Searching
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}