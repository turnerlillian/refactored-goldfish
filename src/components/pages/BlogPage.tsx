import { Calendar, User, Clock, ArrowRight, Search, Filter, SortDesc } from "lucide-react";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { useState } from "react";

interface BlogPageProps {
  onNavigate: (page: string, params?: any) => void;
}

export function BlogPage({ onNavigate }: BlogPageProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  
  // Map blog authors to agent IDs
  const getAgentIdByAuthor = (authorName: string): string | null => {
    const authorToAgentMap: Record<string, string> = {
      "Sarah Johnson": "1", // Maps to Sarah Mitchell
      "Michael Chen": "2", // Maps to Michael Chen
      "Lisa Rodriguez": "3", // Maps to Emily Rodriguez
    };
    return authorToAgentMap[authorName] || null;
  };
  
  const blogPosts = [
    {
      id: 1,
      title: "10 Tips for First-Time Home Buyers",
      excerpt: "Essential advice for navigating your first property purchase with confidence and avoiding common pitfalls.",
      author: "Sarah Johnson",
      date: "March 15, 2024",
      readTime: "5 min read",
      category: "Home Buying",
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&h=400&fit=crop",
    },
    {
      id: 2,
      title: "Real Estate Market Trends 2024",
      excerpt: "Analyzing current market conditions and what they mean for buyers and sellers in today's economy.",
      author: "Michael Chen",
      date: "March 12, 2024",
      readTime: "8 min read",
      category: "Market Analysis",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&h=400&fit=crop",
    },
    {
      id: 3,
      title: "Staging Your Home for a Quick Sale",
      excerpt: "Professional tips on how to present your property to attract buyers and maximize your selling price.",
      author: "Lisa Rodriguez",
      date: "March 8, 2024",
      readTime: "6 min read",
      category: "Home Selling",
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&h=400&fit=crop",
    },
  ];

  // Get unique categories for filter buttons
  const categories = ["all", ...Array.from(new Set(blogPosts.map(post => post.category)))];

  // Filter and sort blog posts
  const filteredAndSortedPosts = blogPosts
    .filter(post => {
      const matchesSearch = searchQuery === "" || 
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.author.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = selectedCategory === "all" || post.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "oldest":
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        case "title":
          return a.title.localeCompare(b.title);
        case "author":
          return a.author.localeCompare(b.author);
        case "newest":
        default:
          return new Date(b.date).getTime() - new Date(a.date).getTime();
      }
    });

  const clearAllFilters = () => {
    setSearchQuery("");
    setSelectedCategory("all");
    setSortBy("newest");
  };

  const hasActiveFilters = searchQuery !== "" || selectedCategory !== "all" || sortBy !== "newest";

  return (
    <div>
      <div className="container py-12">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1>Real Estate Blog</h1>
          <p className="text-lg text-muted-foreground mt-4">
            Stay informed with the latest insights, tips, and trends in real estate
          </p>
        </div>
        
        {/* Search Section */}
        <div className="mb-12">
          {/* Search Bar */}
          <div className="max-w-xl mx-auto relative">
            <div className="bg-background/90 backdrop-blur-sm p-3 rounded-2xl shadow-lg border">
              <div className="flex gap-3">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Search blog posts..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 h-12 border-0 bg-background text-base"
                  />
                </div>
                <Button 
                  variant="outline" 
                  className="h-12 px-6"
                  onClick={() => setSearchQuery("")}
                >
                  Clear
                </Button>
              </div>
            </div>
          </div>
          
          {/* Filter Controls */}
          <div className="max-w-4xl mx-auto mt-6">
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
              {/* Category Filter Buttons */}
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                    className={`capitalize ${
                      selectedCategory === category 
                        ? "bg-primary text-primary-foreground" 
                        : "hover:bg-primary/10"
                    }`}
                  >
                    {category === "all" ? "All Categories" : category}
                  </Button>
                ))}
              </div>
              
              {/* Sort and Clear Controls */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <SortDesc className="h-4 w-4 text-muted-foreground" />
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-[140px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="newest">Newest</SelectItem>
                      <SelectItem value="oldest">Oldest</SelectItem>
                      <SelectItem value="title">Title A-Z</SelectItem>
                      <SelectItem value="author">Author A-Z</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearAllFilters}
                  className={`text-muted-foreground hover:text-foreground ${
                    hasActiveFilters ? "opacity-100" : "opacity-50"
                  }`}
                >
                  <Filter className="h-4 w-4 mr-1" />
                  Clear All
                </Button>
              </div>
            </div>
            
            {/* Results Summary */}
            <div className="mt-4 text-center">
              <p className="text-sm text-muted-foreground">
                Showing {filteredAndSortedPosts.length} of {blogPosts.length} posts
                {selectedCategory !== "all" && (
                  <span> in "{selectedCategory}"</span>
                )}
                {searchQuery && (
                  <span> matching "{searchQuery}"</span>
                )}
              </p>
            </div>
          </div>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredAndSortedPosts.length > 0 ? (
            filteredAndSortedPosts.map((post, index) => (
              <Card 
                key={post.id} 
                className="group overflow-hidden hover-lift border-0 modern-shadow cursor-pointer bg-white/90 backdrop-blur-sm hover:bg-white transition-all duration-300 h-full flex flex-col"
                onClick={() => onNavigate("blog-post", { id: post.id.toString() })}
              >
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <Badge className="absolute top-3 left-3 bg-primary/90 text-primary-foreground backdrop-blur-sm">
                  {post.category}
                </Badge>
              </div>
              
              <div className="flex flex-col flex-grow p-4">
                <div className="space-y-1 mb-2">
                  <h3 className="font-bold text-lg leading-tight group-hover:text-primary transition-colors duration-300 h-12 flex items-start line-clamp-2">
                    {post.title}
                  </h3>
                </div>
                
                <div className="flex-grow mb-5">
                  <p className="text-muted-foreground leading-relaxed line-clamp-3 h-[5.25rem]">
                    {post.excerpt}
                  </p>
                </div>
                
                <div className="text-sm text-muted-foreground mb-4 space-y-2 h-16">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <User className="h-4 w-4" />
                      {getAgentIdByAuthor(post.author) ? (
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            onNavigate("agent", { id: getAgentIdByAuthor(post.author) });
                          }}
                          className="text-primary hover:text-primary/80 hover:underline transition-colors font-medium truncate"
                        >
                          {post.author}
                        </button>
                      ) : (
                        <span className="truncate">{post.author}</span>
                      )}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span className="whitespace-nowrap">{post.readTime}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span className="whitespace-nowrap">{post.date}</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between text-primary group-hover:text-primary/80 transition-colors duration-300 mt-auto h-6">
                  <span className="text-sm font-medium">Read More</span>
                  <ArrowRight className="h-4 w-4" />
                </div>
              </div>
            </Card>
          ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-lg text-muted-foreground mb-4">
                No blog posts found
                {searchQuery && ` matching "${searchQuery}"`}
                {selectedCategory !== "all" && ` in "${selectedCategory}"`}
              </p>
              <Button variant="outline" onClick={clearAllFilters}>
                Clear All Filters
              </Button>
            </div>
          )}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <Card className="glass-effect p-8 border border-white/20 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-4 text-primary">Ready to Start Your Real Estate Journey?</h2>
            <p className="text-muted-foreground mb-6">
              Connect with our expert team for personalized guidance on buying, selling, or investing in properties.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                onClick={() => onNavigate("contact")}
                className="bg-primary hover:bg-primary/90 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Contact Us Today
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                onClick={() => onNavigate("search")}
                className="border-primary/20 hover:bg-primary/5 hover:scale-105 transition-all duration-300"
              >
                Browse Properties
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
