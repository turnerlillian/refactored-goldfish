import { Bed, Bath, Maximize, MapPin, Heart } from "lucide-react";
import { Card, CardContent, CardFooter } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Property } from "../data/mockData";
import { ImageWithFallback } from "./ImageWithFallback";

interface PropertyCardProps {
  property: Property;
  onViewDetails: (id: string) => void;
}

export function PropertyCard({ property, onViewDetails }: PropertyCardProps) {
  const formattedPrice = property.price.toLocaleString('en-US', { 
    style: 'currency', 
    currency: 'USD', 
    maximumFractionDigits: 0 
  });
  
  return (
    <Card 
      className="group overflow-hidden hover-lift border-0 modern-shadow cursor-pointer bg-background/90 backdrop-blur-sm hover:bg-background transition-all duration-300" 
      onClick={() => onViewDetails(property.id)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onViewDetails(property.id);
        }
      }}
      tabIndex={0}
      role="button"
      aria-label={`View details for ${property.title} - ${formattedPrice} ${property.propertyType} in ${property.city}, ${property.state}`}
      itemScope
      itemType="https://schema.org/RealEstateListing"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <ImageWithFallback
          src={property.images[0]}
          alt={`${property.title} - ${property.bedrooms} bedroom ${property.propertyType} located at ${property.address}, ${property.city}, ${property.state}. Listed at ${formattedPrice}.`}
          className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105 group-hover:brightness-110"
          itemProp="image"
        />
        <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" aria-hidden="true" />
        
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-3 right-3 bg-background/95 backdrop-blur-sm hover:bg-background hover:scale-110 transition-all duration-200 shadow-lg border border-background/20 focus:outline-2 focus:outline-offset-2 focus:outline-secondary"
          onClick={(e: React.MouseEvent) => {
            e.stopPropagation();
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.stopPropagation();
            }
          }}
          aria-label={`Add ${property.title} to favorites`}
        >
          <Heart className="h-4 w-4 text-muted-foreground hover:text-red-500 transition-colors" aria-hidden="true" />
        </Button>
        
        {property.featured && (
          <Badge className="absolute top-3 left-3 bg-secondary text-black font-semibold shadow-lg backdrop-blur-sm">
            Featured
          </Badge>
        )}
        
        <Badge 
          variant="secondary" 
          className="absolute bottom-3 left-3 bg-background/95 backdrop-blur-sm text-foreground font-medium shadow-sm border border-background/20"
          itemProp="category"
        >
          {property.status}
        </Badge>
      </div>
      
      <CardContent className="p-3 sm:p-4">
        <div className="space-y-2 sm:space-y-3">
          <div className="space-y-1">
            <h3 className="font-bold text-lg group-hover:text-primary transition-colors leading-tight h-12 flex items-start" itemProp="name">
              {property.title}
            </h3>
            <p className="text-primary font-bold text-xl h-7 flex items-center" itemProp="price" content={property.price.toString()}>
              {formattedPrice}
            </p>
          </div>
          
          <div className="flex items-start gap-2 text-muted-foreground h-10">
            <MapPin className="h-4 w-4 flex-shrink-0 text-primary mt-0.5" aria-hidden="true" />
            <span className="line-clamp-2 text-sm leading-relaxed" itemProp="address">
              {property.address}, {property.city}, {property.state}
            </span>
          </div>

          <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs h-8 items-start">
            <div className="flex items-center gap-1">
              <Bed className="h-3 w-3 text-primary" aria-hidden="true" />
              <span className="font-medium" aria-label={`${property.bedrooms} bedrooms`}>{property.bedrooms} bed</span>
            </div>
            <div className="flex items-center gap-1">
              <Bath className="h-3 w-3 text-primary" aria-hidden="true" />
              <span className="font-medium" aria-label={`${property.bathrooms} bathrooms`}>{property.bathrooms} bath</span>
            </div>
            <div className="flex items-center gap-1">
              <Maximize className="h-3 w-3 text-primary" aria-hidden="true" />
              <span className="font-medium" aria-label={`${property.sqft.toLocaleString()} square feet`}>{property.sqft.toLocaleString()} sqft</span>
            </div>
          </div>
            <div className="flex items-center gap-1.5">
              <div className="p-1 rounded-lg bg-primary/10 flex-shrink-0">
                <Bed className="h-3 w-3 text-primary" />
              </div>
              <span className="font-medium whitespace-nowrap">{property.bedrooms} Beds</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="p-1 rounded-lg bg-primary/10 flex-shrink-0">
                <Bath className="h-3 w-3 text-primary" />
              </div>
              <span className="font-medium whitespace-nowrap">{property.bathrooms} Baths</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="p-1 rounded-lg bg-primary/10 flex-shrink-0">
                <Maximize className="h-3 w-3 text-primary" />
              </div>
              <span className="font-medium whitespace-nowrap">{property.sqft.toLocaleString()} sqft</span>
            </div>
          </div>
        </div>
      </CardContent>

            <CardFooter className="p-3 sm:p-4 pt-0">
        <Button 
          variant="outline" 
          className="w-full h-10 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-200 focus:outline-2 focus:outline-offset-2 focus:outline-secondary" 
          onClick={(e: React.MouseEvent) => {
            e.stopPropagation();
            onViewDetails(property.id);
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.stopPropagation();
              onViewDetails(property.id);
            }
          }}
          aria-label={`View full details for ${property.title}`}
        >
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
}
