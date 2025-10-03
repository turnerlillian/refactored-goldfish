import { Bed, Bath, Maximize, MapPin, Heart, Plus, Minus, Check } from "lucide-react";
import { Card, CardContent, CardFooter } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Property } from "../data/mockData";
import { ImageWithFallback } from "./ImageWithFallback";

interface PropertyCardProps {
  property: Property;
  onViewDetails: (id: string) => void;
  isFavorite?: boolean;
  onToggleFavorite?: () => void;
  isInCompare?: boolean;
  onToggleCompare?: () => void;
  canAddToCompare?: boolean;
}

export function PropertyCard({ 
  property, 
  onViewDetails,
  isFavorite = false,
  onToggleFavorite,
  isInCompare = false,
  onToggleCompare,
  canAddToCompare = true
}: PropertyCardProps) {
  const formattedPrice = property.price.toLocaleString('en-US', { 
    style: 'currency', 
    currency: 'USD', 
    maximumFractionDigits: 0 
  });
  
  return (
    <Card 
      className="group overflow-hidden hover-lift border-2 border-border hover:border-primary/30 modern-shadow cursor-pointer bg-background/90 backdrop-blur-sm hover:bg-background transition-all duration-200 interactive-scale hover:shadow-lg" 
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
        
        {/* Action Buttons */}
        <div className="absolute top-3 right-3 flex gap-2">
          {/* Favorite Button */}
          {onToggleFavorite && (
            <Button
              variant="ghost"
              size="icon"
              className={`bg-background/95 backdrop-blur-sm hover:bg-background/100 transition-all duration-200 shadow-lg border-2 border-background/30 hover:border-primary/50 focus:outline-2 focus:outline-offset-2 focus:outline-secondary btn-press hover:scale-110 ${
                isFavorite ? 'text-red-500 hover:text-red-600' : 'text-muted-foreground hover:text-red-500'
              }`}
              onClick={(e: React.MouseEvent) => {
                e.stopPropagation();
                onToggleFavorite();
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.stopPropagation();
                  e.preventDefault();
                  onToggleFavorite();
                }
              }}
              aria-label={isFavorite ? `Remove ${property.title} from favorites` : `Add ${property.title} to favorites`}
            >
              <Heart className={`h-4 w-4 transition-all ${isFavorite ? 'fill-current' : ''}`} aria-hidden="true" />
            </Button>
          )}

          {/* Compare Button */}
          {onToggleCompare && (
            <Button
              variant="ghost"
              size="icon"
              className={`bg-background/95 backdrop-blur-sm hover:bg-background/100 transition-all duration-200 shadow-lg border-2 border-background/30 hover:border-primary/50 focus:outline-2 focus:outline-offset-2 focus:outline-secondary btn-press hover:scale-110 ${
                isInCompare ? 'text-primary hover:text-primary/80' : 'text-muted-foreground hover:text-primary'
              }`}
              onClick={(e: React.MouseEvent) => {
                e.stopPropagation();
                if (canAddToCompare || isInCompare) {
                  onToggleCompare();
                }
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.stopPropagation();
                  e.preventDefault();
                  if (canAddToCompare || isInCompare) {
                    onToggleCompare();
                  }
                }
              }}
              disabled={!canAddToCompare && !isInCompare}
              aria-label={
                isInCompare 
                  ? `Remove ${property.title} from comparison` 
                  : canAddToCompare 
                    ? `Add ${property.title} to comparison`
                    : 'Comparison list is full (3 properties max)'
              }
            >
              {isInCompare ? (
                <Check className="h-4 w-4" aria-hidden="true" />
              ) : (
                <Plus className="h-4 w-4" aria-hidden="true" />
              )}
            </Button>
          )}
        </div>
        
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
        </div>
      </CardContent>
      
      <CardFooter className="p-3 sm:p-4 pt-0">
        <div className="flex gap-2 w-full">
          <Button 
            variant="outline" 
            className="flex-1 h-10 group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-all duration-200 focus:outline-2 focus:outline-offset-2 focus:outline-secondary btn-press border-2 hover:scale-[1.02]" 
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

          {/* Secondary Compare Button (only show if main compare button is not in top-right) */}
          {onToggleCompare && !onToggleFavorite && (
            <Button
              variant={isInCompare ? "default" : "outline"}
              size="icon"
              className="h-10 w-10 flex-shrink-0 transition-all duration-200 focus:outline-2 focus:outline-offset-2 focus:outline-secondary btn-press hover:scale-[1.02]"
              onClick={(e: React.MouseEvent) => {
                e.stopPropagation();
                if (canAddToCompare || isInCompare) {
                  onToggleCompare();
                }
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.stopPropagation();
                  e.preventDefault();
                  if (canAddToCompare || isInCompare) {
                    onToggleCompare();
                  }
                }
              }}
              disabled={!canAddToCompare && !isInCompare}
              aria-label={
                isInCompare 
                  ? `Remove ${property.title} from comparison` 
                  : canAddToCompare 
                    ? `Add ${property.title} to comparison`
                    : 'Comparison list is full (3 properties max)'
              }
            >
              {isInCompare ? (
                <Check className="h-4 w-4" aria-hidden="true" />
              ) : (
                <Plus className="h-4 w-4" aria-hidden="true" />
              )}
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}