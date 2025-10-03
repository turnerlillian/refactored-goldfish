import { useState, useEffect } from "react";
import { Toaster } from "./components/ui/sonner";
import { Header } from "./components/layout/Header";
import { Footer } from "./components/layout/Footer";
import { HomePage } from "./components/pages/HomePage";
import { PropertySearchPage } from "./components/pages/PropertySearchPage";
import { PropertyDetailPage } from "./components/pages/PropertyDetailPage";
import { AgentsPage } from "./components/pages/AgentsPage";
import { AgentProfilePage } from "./components/pages/AgentProfilePage";
import { ContactPage } from "./components/pages/ContactPage";
import { BlogPage } from "./components/pages/BlogPage";
import { BlogPostDetailPage } from "./components/pages/BlogPostDetailPage";
import { PropertyComparisonPage } from "./components/pages/PropertyComparisonPage";

type Page = "home" | "search" | "property" | "agents" | "agent" | "contact" | "blog" | "blog-post" | "compare";

interface NavigationParams {
  id?: string;
  query?: string;
  properties?: string[];
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>("home");
  const [navParams, setNavParams] = useState<NavigationParams>({});
  const [favorites, setFavorites] = useState<string[]>([]);
  const [compareList, setCompareList] = useState<string[]>([]);

  // Load favorites and compare list from localStorage on mount
  useEffect(() => {
    const savedFavorites = localStorage.getItem('property-favorites');
    if (savedFavorites) {
      try {
        setFavorites(JSON.parse(savedFavorites));
      } catch (e) {
        console.error('Failed to parse saved favorites:', e);
      }
    }

    const savedCompare = localStorage.getItem('property-compare');
    if (savedCompare) {
      try {
        setCompareList(JSON.parse(savedCompare));
      } catch (e) {
        console.error('Failed to parse saved compare list:', e);
      }
    }
  }, []);

  // Handlers for favorites and compare
  const handleToggleFavorite = (propertyId: string) => {
    setFavorites(prev => {
      const newFavorites = prev.includes(propertyId)
        ? prev.filter(id => id !== propertyId)
        : [...prev, propertyId];
      localStorage.setItem('property-favorites', JSON.stringify(newFavorites));
      return newFavorites;
    });
  };

  const handleToggleCompare = (propertyId: string) => {
    setCompareList(prev => {
      const newCompareList = prev.includes(propertyId)
        ? prev.filter(id => id !== propertyId)
        : prev.length < 3 // Limit to 3 properties for comparison
          ? [...prev, propertyId]
          : prev; // Don't add if already at limit
      localStorage.setItem('property-compare', JSON.stringify(newCompareList));
      return newCompareList;
    });
  };

  // Function to parse URL and get current page/params
  const parseUrl = () => {
    const path = window.location.pathname;
    const searchParams = new URLSearchParams(window.location.search);
    
    if (path === "/" || path === "") {
      return { page: "home" as Page, params: {} };
    } else if (path === "/search") {
      return { 
        page: "search" as Page, 
        params: { query: searchParams.get("q") || "" }
      };
    } else if (path.startsWith("/property/")) {
      const id = path.split("/property/")[1];
      return { page: "property" as Page, params: { id } };
    } else if (path === "/agents") {
      return { page: "agents" as Page, params: {} };
    } else if (path.startsWith("/agent/")) {
      const id = path.split("/agent/")[1];
      return { page: "agent" as Page, params: { id } };
    } else if (path === "/contact") {
      return { page: "contact" as Page, params: {} };
    } else if (path === "/blog") {
      return { page: "blog" as Page, params: {} };
    } else if (path.startsWith("/blog/")) {
      const id = path.split("/blog/")[1];
      return { page: "blog-post" as Page, params: { id } };
    } else if (path === "/compare") {
      const properties = searchParams.get("properties")?.split(",") || [];
      return { page: "compare" as Page, params: { properties } };
    }
    
    // Default to home for unknown paths
    return { page: "home" as Page, params: {} };
  };

  // Initialize state from URL on load
  useEffect(() => {
    const { page, params } = parseUrl();
    setCurrentPage(page);
    setNavParams(params);
  }, []);

  // Listen for browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      const { page, params } = parseUrl();
      setCurrentPage(page);
      setNavParams(params);
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const handleNavigate = (page: string, params?: NavigationParams) => {
    const newPage = page as Page;
    setCurrentPage(newPage);
    setNavParams(params || {});
    
    // Update URL based on page and params
    let url = "/";
    if (newPage === "search") {
      url = "/search";
      if (params?.query) {
        url += `?q=${encodeURIComponent(params.query)}`;
      }
    } else if (newPage === "property" && params?.id) {
      url = `/property/${params.id}`;
    } else if (newPage === "agents") {
      url = "/agents";
    } else if (newPage === "agent" && params?.id) {
      url = `/agent/${params.id}`;
    } else if (newPage === "contact") {
      url = "/contact";
    } else if (newPage === "blog") {
      url = "/blog";
    } else if (newPage === "compare" && params?.properties) {
      url = `/compare?properties=${params.properties.join(",")}`;
    }
    
    // Push new state to browser history
    if (url !== window.location.pathname + window.location.search) {
      window.history.pushState({}, "", url);
    }
    
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Skip link for keyboard navigation */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 bg-primary text-primary-foreground px-4 py-2 rounded z-50 focus:outline-2 focus:outline-offset-2 focus:outline-secondary"
      >
        Skip to main content
      </a>
      
      <Header currentPage={currentPage} onNavigate={handleNavigate} />
      
      <main id="main-content" className="flex-1" role="main">
        {currentPage === "home" && <HomePage onNavigate={handleNavigate} />}
        {currentPage === "search" && (
          <PropertySearchPage 
            onNavigate={handleNavigate} 
            initialQuery={navParams.query}
            favorites={favorites}
            onToggleFavorite={handleToggleFavorite}
            compareList={compareList}
            onToggleCompare={handleToggleCompare}
          />
        )}
        {currentPage === "property" && navParams.id && (
          <PropertyDetailPage 
            propertyId={navParams.id} 
            onNavigate={handleNavigate}
          />
        )}
        {currentPage === "agents" && <AgentsPage onNavigate={handleNavigate} />}
        {currentPage === "agent" && navParams.id && (
          <AgentProfilePage 
            agentId={navParams.id} 
            onNavigate={handleNavigate}
          />
        )}
        {currentPage === "contact" && <ContactPage />}
        {currentPage === "blog" && <BlogPage onNavigate={handleNavigate} />}
        {currentPage === "blog-post" && navParams.id && (
          <BlogPostDetailPage 
            postId={navParams.id} 
            onNavigate={handleNavigate}
          />
        )}
        {currentPage === "compare" && navParams.properties && (
          <PropertyComparisonPage 
            onNavigate={handleNavigate}
            propertyIds={navParams.properties}
          />
        )}
      </main>

      <Footer onNavigate={handleNavigate} />
      <Toaster />
    </div>
  );
}
