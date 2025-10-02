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

type Page = "home" | "search" | "property" | "agents" | "agent" | "contact" | "blog" | "blog-post";

interface NavigationParams {
  id?: string;
  query?: string;
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>("home");
  const [navParams, setNavParams] = useState<NavigationParams>({});

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
    }
    
    // Push new state to browser history
    if (url !== window.location.pathname + window.location.search) {
      window.history.pushState({}, "", url);
    }
    
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header currentPage={currentPage} onNavigate={handleNavigate} />
      
      <main className="flex-1">
        {currentPage === "home" && <HomePage onNavigate={handleNavigate} />}
        {currentPage === "search" && (
          <PropertySearchPage 
            onNavigate={handleNavigate} 
            initialQuery={navParams.query}
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
      </main>

      <Footer onNavigate={handleNavigate} />
      <Toaster />
    </div>
  );
}
