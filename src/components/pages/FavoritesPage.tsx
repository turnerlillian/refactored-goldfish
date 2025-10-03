import { useEffect } from "react";
import { Heart, Home, Search, Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { PropertyCard } from "../PropertyCard";
import { properties } from "../../data/mockData";
import { updatePageSEO } from "../../utils/seo";
import { Breadcrumbs } from "../ui/breadcrumbs";

interface FavoritesPageProps {
  onNavigate: (page: string, params?: any) => void;
  favorites: string[];
  onToggleFavorite: (propertyId: string) => void;
  compareList?: string[];
  onToggleCompare?: (propertyId: string) => void;
}

export function FavoritesPage({ 
  onNavigate, 
  favorites, 
  onToggleFavorite, 
  compareList = [], 
  onToggleCompare 
}: FavoritesPageProps) {
  const favoriteProperties = properties.filter(property => favorites.includes(property.id));

  // Clear all favorites function
  const handleClearAllFavorites = () => {
    // Remove each favorite individually to trigger proper state updates
    favorites.forEach(propertyId => {
      onToggleFavorite(propertyId);
    });
  };

  // SEO Optimization
  useEffect(() => {
    updatePageSEO({
      title: "My Favorite Properties | Rowlly Properties",
      description: "View and manage your favorite properties. Keep track of homes you're interested in and compare them easily.",
      canonical: "https://rowllyproperties.com/favorites",
      keywords: "favorite properties, saved homes, property wishlist, real estate favorites"
    });
  }, []);

  if (favoriteProperties.length === 0) {
    return (
      <div>
        {/* Breadcrumbs */}
        <div className="container py-0.5 md:py-1">
          <Breadcrumbs 
            items={[
              { label: "My Favorites", isActive: true }
            ]}
            onNavigate={onNavigate}
          />
        </div>

        <div className="container py-4 md:py-6">
          <div className="max-w-6xl mx-auto text-center space-y-8">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted mx-auto">
            <Heart className="h-10 w-10 text-muted-foreground" />
          </div>
          <div className="space-y-2">
            <h1 className="text-3xl font-bold">No Favorites Yet</h1>
            <p className="text-lg text-muted-foreground">
              Start exploring properties and save your favorites for easy access later.
            </p>
          </div>
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">
              Click the <Heart className="h-4 w-4 inline mx-1" /> heart icon on any property to add it to your favorites.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button onClick={() => onNavigate("search")} className="flex items-center gap-2">
                <Search className="h-4 w-4" />
                Browse Properties
              </Button>
              <Button variant="outline" onClick={() => onNavigate("home")} className="flex items-center gap-2">
                <Home className="h-4 w-4" />
                Back to Home
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
    );
  }

  return (
    <div>
      {/* Breadcrumbs */}
      <div className="container py-0.5 md:py-1">
        <Breadcrumbs 
          items={[
            { label: "My Favorites", isActive: true }
          ]}
          onNavigate={onNavigate}
        />
      </div>

      <div className="container py-4 md:py-6">
        <div className="space-y-6">
          {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mx-auto">
            <Heart className="h-8 w-8 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">My Favorite Properties</h1>
            <p className="text-muted-foreground mt-2">
              {favoriteProperties.length} {favoriteProperties.length === 1 ? 'property' : 'properties'} saved
            </p>
          </div>
        </div>

        {/* Quick Actions */}
        <Card className="bg-muted/30">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-center sm:text-left">
                <h3 className="font-semibold mb-1">Manage Your Favorites</h3>
                <p className="text-sm text-muted-foreground">
                  Compare properties, schedule tours, or continue browsing for more options.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-2">
                {favoriteProperties.length >= 2 && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onNavigate("compare", { properties: favorites.slice(0, 3) })}
                    className="flex items-center gap-2"
                  >
                    Compare All
                  </Button>
                )}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onNavigate("search")}
                  className="flex items-center gap-2"
                >
                  <Search className="h-4 w-4" />
                  Find More Properties
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={handleClearAllFavorites}
                  className="flex items-center gap-2"
                >
                  <Trash2 className="h-4 w-4" />
                  Clear All
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Properties Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favoriteProperties.map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
              onViewDetails={(id) => onNavigate("property", { id })}
              isFavorite={true}
              onToggleFavorite={() => onToggleFavorite(property.id)}
              isInCompare={compareList.includes(property.id)}
              onToggleCompare={() => onToggleCompare?.(property.id)}
              canAddToCompare={compareList.length < 3 || compareList.includes(property.id)}
            />
          ))}
        </div>

        {/* Additional Actions */}
        <div className="text-center pt-8">
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Need help deciding? Our expert agents are here to assist you.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button variant="outline" onClick={() => onNavigate("contact")}>
                Contact an Agent
              </Button>
              <Button variant="outline" onClick={() => onNavigate("agents")}>
                View All Agents
              </Button>
            </div>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
}