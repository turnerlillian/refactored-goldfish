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
  return (
    <Card className="group overflow-hidden hover-lift border-0 modern-shadow cursor-pointer bg-white/90 backdrop-blur-sm hover:bg-white transition-all duration-300" onClick={() => onViewDetails(property.id)}>
      <div className="relative aspect-[4/3] overflow-hidden">
        <ImageWithFallback
          src={property.images[0]}
          alt={property.title}
          className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105 group-hover:brightness-110"
        />
        <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm hover:bg-white hover:scale-110 transition-all duration-200 shadow-lg border border-white/20"
          onClick={(e: React.MouseEvent) => {
            e.stopPropagation();
          }}
        >
          <Heart className="h-4 w-4 text-muted-foreground hover:text-red-500 transition-colors" />
        </Button>
        
        {property.featured && (
          <Badge className="absolute top-3 left-3 bg-secondary text-black font-semibold shadow-lg backdrop-blur-sm">
            Featured
          </Badge>
        )}
        
        <Badge 
          variant="secondary" 
          className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-sm text-foreground font-medium shadow-sm border border-white/20"
        >
          {property.status}
        </Badge>
      </div>
      
      <CardContent className="p-3 sm:p-4">
        <div className="space-y-2 sm:space-y-3">
          <div className="space-y-1">
            <h3 className="font-bold text-lg group-hover:text-primary transition-colors leading-tight h-12 flex items-start">
              {property.title}
            </h3>
            <p className="text-primary font-bold text-xl h-7 flex items-center">
              ${property.price.toLocaleString()}
            </p>
          </div>
          
          <div className="flex items-start gap-2 text-muted-foreground h-10">
            <MapPin className="h-4 w-4 flex-shrink-0 text-primary mt-0.5" />
            <span className="line-clamp-2 text-sm leading-relaxed">
              {property.address}, {property.city}, {property.state}
            </span>
          </div>

          <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs h-8 items-start">
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

      <CardFooter className="p-3 sm:p-4 pt-1">
        <Button 
          className="w-full h-9 sm:h-10 font-semibold rounded-xl shadow-md hover:shadow-lg hover:scale-[0.98] transition-all duration-200 text-sm" 
          onClick={(e: React.MouseEvent) => {
            e.stopPropagation();
            onViewDetails(property.id);
          }}
        >
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
}
