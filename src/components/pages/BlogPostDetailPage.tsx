import { Calendar, User, Clock, ArrowLeft, Share2, Facebook, Twitter, Linkedin, Tag } from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Card, CardContent } from "../ui/card";
import { useEffect } from "react";
import { updatePageSEO, createBreadcrumbSchema } from "../../utils/seo";
import { Breadcrumbs } from "../ui/breadcrumbs";

interface BlogPostDetailPageProps {
  onNavigate: (page: string, params?: any) => void;
  postId: string;
}

export function BlogPostDetailPage({ onNavigate, postId }: BlogPostDetailPageProps) {
  // Map blog authors to agent IDs
  const getAgentIdByAuthor = (authorName: string): string | null => {
    const authorToAgentMap: Record<string, string> = {
      "Sarah Johnson": "1", // Maps to Sarah Mitchell
      "Michael Chen": "2", // Maps to Michael Chen
      "Lisa Rodriguez": "3", // Maps to Emily Rodriguez
    };
    return authorToAgentMap[authorName] || null;
  };

  // This would typically come from a data service or props
  const blogPosts = [
    {
      id: "1",
      title: "10 Tips for First-Time Home Buyers",
      excerpt: "Essential advice for navigating your first property purchase with confidence and avoiding common pitfalls.",
      content: `
        <p>Buying your first home is one of the most significant financial decisions you'll ever make. It's an exciting milestone, but it can also feel overwhelming with so many factors to consider. Here are ten essential tips to help you navigate the process with confidence.</p>
        
        <h2>1. Get Pre-Approved for a Mortgage</h2>
        <p>Before you start house hunting, get pre-approved for a mortgage. This will give you a clear understanding of how much you can afford and shows sellers that you're a serious buyer. Pre-approval involves a lender reviewing your financial information and credit score to determine the loan amount you qualify for.</p>
        
        <h2>2. Determine Your Budget</h2>
        <p>Don't just rely on what the bank says you can afford. Calculate what you're comfortable paying monthly, considering all your expenses, savings goals, and potential changes in income. Remember to factor in property taxes, insurance, HOA fees, and maintenance costs.</p>
        
        <h2>3. Research Neighborhoods Thoroughly</h2>
        <p>Location is crucial in real estate. Research potential neighborhoods by visiting at different times of day and days of the week. Consider factors like commute times, school districts, safety, amenities, and future development plans that might affect property values.</p>
        
        <h2>4. Work with a Qualified Real Estate Agent</h2>
        <p>A good real estate agent will guide you through the entire process, from finding properties to negotiating offers. Look for someone with experience in your target area and price range, and don't hesitate to interview multiple agents before making your choice.</p>
        
        <h2>5. Don't Skip the Home Inspection</h2>
        <p>A professional home inspection can reveal potential issues that aren't visible during a casual walk-through. This could save you thousands of dollars in unexpected repairs. If significant issues are found, you can negotiate with the seller for repairs or a price reduction.</p>
        
        <h2>6. Understand All Costs Involved</h2>
        <p>Beyond the down payment, you'll need money for closing costs (typically 2-5% of the home's price), moving expenses, immediate repairs or improvements, and an emergency fund for unexpected issues.</p>
        
        <h2>7. Be Patient and Don't Rush</h2>
        <p>The perfect home might not be the first one you see. Take your time to find a property that meets your needs and fits your budget. Don't let emotions drive your decisions, especially in a competitive market.</p>
        
        <h2>8. Consider Future Needs</h2>
        <p>Think about how your needs might change over the next 5-10 years. Will you need more space for a growing family? Is the location suitable for your long-term career plans? Buying with the future in mind can save you from having to move again soon.</p>
        
        <h2>9. Review All Documents Carefully</h2>
        <p>Read and understand all contracts, disclosures, and documents before signing. Don't hesitate to ask questions or request clarification on anything you don't understand. Consider having a real estate attorney review important documents.</p>
        
        <h2>10. Prepare for the Unexpected</h2>
        <p>Home buying can be unpredictable. Deals can fall through, inspections might reveal issues, or financing could hit snags. Stay flexible and have backup plans. Remember that finding the right home is worth the wait and effort.</p>
        
        <p><strong>Conclusion:</strong> Buying your first home is a journey that requires preparation, patience, and the right support team. By following these tips and working with experienced professionals, you'll be well-equipped to make informed decisions and find a home you'll love for years to come.</p>
      `,
      author: "Sarah Johnson",
      authorBio: "Sarah is a licensed real estate agent with over 8 years of experience helping first-time buyers find their perfect homes.",
      date: "March 15, 2024",
      readTime: "5 min read",
      category: "Home Buying",
      tags: ["First-time buyers", "Home buying tips", "Real estate advice", "Mortgage"],
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=500&fit=crop",
      relatedPosts: ["2", "3"]
    },
    {
      id: "2",
      title: "Real Estate Market Trends 2024",
      excerpt: "Analyzing current market conditions and what they mean for buyers and sellers in today's economy.",
      content: `
        <p>The real estate market in 2024 continues to evolve, shaped by economic factors, demographic shifts, and changing buyer preferences. Understanding these trends is crucial for both buyers and sellers making decisions in today's market.</p>
        
        <h2>Current Market Overview</h2>
        <p>The 2024 real estate market is characterized by a gradual normalization following the unprecedented changes of recent years. While we're seeing some cooling from the peak activity of 2021-2022, the market remains robust with steady demand across most regions.</p>
        
        <h2>Key Trends Shaping 2024</h2>
        
        <h3>Interest Rate Stabilization</h3>
        <p>After significant fluctuations, mortgage rates are showing signs of stabilization. This predictability is helping both buyers and sellers make more informed decisions about timing their transactions.</p>
        
        <h3>Inventory Improvements</h3>
        <p>Many markets are seeing gradual increases in available inventory, giving buyers more options than they've had in recent years. However, desirable properties in prime locations continue to move quickly.</p>
        
        <h3>Regional Variations</h3>
        <p>Market conditions vary significantly by region. Urban areas are seeing renewed interest as remote work policies evolve, while suburban markets that boomed during the pandemic are finding a new equilibrium.</p>
        
        <h2>What This Means for Buyers</h2>
        <p>Buyers in 2024 have more negotiating power than in recent years, but competition for well-priced, quality homes remains strong. The key is being prepared with financing and working with experienced agents who understand local market dynamics.</p>
        
        <h2>What This Means for Sellers</h2>
        <p>Sellers need to be more strategic about pricing and presentation. Homes that are properly priced and well-prepared are still selling quickly, but overpriced properties may sit on the market longer than in previous years.</p>
        
        <h2>Looking Ahead</h2>
        <p>The second half of 2024 is expected to bring continued stability with gradual shifts toward a more balanced market. Both buyers and sellers who stay informed and work with knowledgeable professionals will be best positioned for success.</p>
      `,
      author: "Michael Chen",
      authorBio: "Michael is a market analyst and real estate expert with 15 years of experience tracking market trends and economic indicators.",
      date: "March 12, 2024",
      readTime: "8 min read",
      category: "Market Analysis",
      tags: ["Market trends", "Real estate analysis", "2024 market", "Investment"],
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=500&fit=crop",
      relatedPosts: ["1", "3"]
    },
    {
      id: "3",
      title: "Staging Your Home for a Quick Sale",
      excerpt: "Professional tips on how to present your property to attract buyers and maximize your selling price.",
      content: `
        <p>Home staging is the art of preparing your home to appeal to the highest number of potential buyers. When done correctly, staging can help your home sell faster and for a better price. Here's your comprehensive guide to staging success.</p>
        
        <h2>Why Staging Matters</h2>
        <p>Staged homes typically sell 73% faster than non-staged homes and can sell for 1-5% more than the asking price. Staging helps buyers envision themselves living in the space and highlights your home's best features.</p>
        
        <h2>Start with Deep Cleaning</h2>
        <p>Before any staging begins, your home must be spotlessly clean. This includes everything from baseboards to light fixtures. Consider hiring professional cleaners for the best results. A clean home suggests it's been well-maintained.</p>
        
        <h2>Declutter and Depersonalize</h2>
        <p>Remove personal items like family photos, collections, and excess furniture. The goal is to create a neutral space where buyers can imagine their own belongings. Pack away about 50% of your items to make rooms appear larger.</p>
        
        <h2>Focus on Key Rooms</h2>
        
        <h3>Living Room</h3>
        <p>Arrange furniture to create conversation areas and ensure good traffic flow. Add fresh flowers or plants, and make sure there's adequate lighting. Neutral throw pillows and blankets can add warmth without being too personal.</p>
        
        <h3>Kitchen</h3>
        <p>Clear all countertops except for a few carefully chosen items like a bowl of fresh fruit or a coffee maker. Ensure all appliances are sparkling clean and consider small updates like new cabinet hardware if your budget allows.</p>
        
        <h3>Bedrooms</h3>
        <p>Make beds with crisp, neutral linens and add a few decorative pillows. Ensure closets are organized and not overstuffed. A bedroom should feel like a peaceful retreat.</p>
        
        <h3>Bathrooms</h3>
        <p>Replace old towels with fresh, fluffy ones in neutral colors. Add a small plant or fresh flowers. Ensure all fixtures are clean and functioning properly.</p>
        
        <h2>Enhance Curb Appeal</h2>
        <p>First impressions matter enormously. Ensure your lawn is well-maintained, add some colorful plants in pots, clean the front door, and make sure house numbers are clearly visible. Consider a fresh coat of paint on the front door in an appealing color.</p>
        
        <h2>Create Ambiance</h2>
        <p>During showings, open curtains and blinds to let in natural light. Add lamps if rooms seem dark. Play soft background music and consider lighting a vanilla or citrus-scented candle just before showings begin.</p>
        
        <h2>Professional vs. DIY Staging</h2>
        <p>While professional staging can be expensive ($2,000-$4,000), it often pays for itself in faster sales and higher prices. If hiring a professional isn't in your budget, focus on the basics: clean, declutter, neutralize, and highlight your home's best features.</p>
        
        <h2>Final Tips</h2>
        <ul>
          <li>Remove all odors, including pet and cooking smells</li>
          <li>Fix any minor repairs like squeaky doors or dripping faucets</li>
          <li>Set the temperature at a comfortable 68-70 degrees</li>
          <li>Add fresh flowers or plants for a welcoming touch</li>
          <li>Turn on all lights during showings</li>
        </ul>
        
        <p>Remember, staging is about creating an emotional connection with potential buyers. When they can envision themselves living happily in your home, you're much more likely to receive competitive offers.</p>
      `,
      author: "Lisa Rodriguez",
      authorBio: "Lisa is a certified home staging professional and interior designer with over 10 years of experience helping homeowners prepare their properties for sale.",
      date: "March 8, 2024",
      readTime: "6 min read",
      category: "Home Selling",
      tags: ["Home staging", "Selling tips", "Interior design", "Home preparation"],
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=500&fit=crop",
      relatedPosts: ["1", "2"]
    }
  ];

    const post = blogPosts.find(p => p.id === postId);

  // SEO Optimization
  useEffect(() => {
    if (post) {
      const breadcrumbs = [
        { name: "Home", url: "https://rowllyproperties.com" },
        { name: "Blog", url: "https://rowllyproperties.com/blog" },
        { name: post.title, url: `https://rowllyproperties.com/blog/${post.id}` }
      ];

      const articleSchema = {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": post.title,
        "description": post.excerpt,
        "author": {
          "@type": "Person",
          "name": post.author
        },
        "publisher": {
          "@type": "Organization",
          "name": "Rowlly Properties"
        },
        "datePublished": post.date,
        "dateModified": post.date,
        "mainEntityOfPage": `https://rowllyproperties.com/blog/${post.id}`,
        "image": post.image
      };

      updatePageSEO({
        title: `${post.title} | Rowlly Properties Blog`,
        description: post.excerpt,
        keywords: `${post.category}, real estate, ${post.title.toLowerCase().split(' ').join(', ')}`,
        canonical: `https://rowllyproperties.com/blog/${post.id}`,
        ogTitle: post.title,
        ogDescription: post.excerpt,
        ogImage: post.image,
        ogType: "article",
        structuredData: [articleSchema, createBreadcrumbSchema(breadcrumbs)]
      });
    }
  }, [post]);
  const relatedPosts = blogPosts.filter(p => post?.relatedPosts?.includes(p.id));

  if (!post) {
    return (
      <div className="container py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">Blog Post Not Found</h1>
        <p className="text-muted-foreground mb-6">The blog post you're looking for doesn't exist.</p>
        <Button onClick={() => onNavigate("blog")}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Blog
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
            { label: "Blog", onClick: () => onNavigate("blog") },
            { label: post.title, isActive: true }
          ]}
          onNavigate={onNavigate}
        />
      </div>

      <div className="container py-4 md:py-6">
        {/* Back Button */}
        <Button 
          variant="ghost" 
          onClick={() => onNavigate("blog")}
          className="mb-6 hover:bg-primary/5"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Blog
        </Button>

        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <Badge className="mb-4 bg-primary/10 text-primary hover:bg-primary/20">
              {post.category}
            </Badge>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight text-primary">
              {post.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground mb-6">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span>By </span>
                {getAgentIdByAuthor(post.author) ? (
                  <button 
                    onClick={() => onNavigate("agent", { id: getAgentIdByAuthor(post.author) })}
                    className="text-primary hover:text-primary/80 hover:underline transition-colors font-medium"
                  >
                    {post.author}
                  </button>
                ) : (
                  <span>{post.author}</span>
                )}
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{post.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>{post.readTime}</span>
              </div>
            </div>

            {/* Featured Image */}
            <div className="aspect-[21/9] rounded-2xl overflow-hidden mb-8">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Share Buttons */}
            <div className="flex items-center gap-4 pb-6 border-b">
              <span className="text-sm font-medium text-muted-foreground">Share this article:</span>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="hover:bg-blue-50">
                  <Facebook className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm" className="hover:bg-blue-50">
                  <Twitter className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm" className="hover:bg-blue-50">
                  <Linkedin className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm" className="hover:bg-primary/5">
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="mb-8">
            <div 
              className="blog-content text-lg leading-relaxed [&_p]:text-muted-foreground [&_p]:mb-8 [&_p]:leading-relaxed [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-foreground [&_h2]:mt-12 [&_h2]:mb-6 [&_h2]:border-b [&_h2]:border-border/30 [&_h2]:pb-3 [&_h3]:text-xl [&_h3]:font-bold [&_h3]:text-foreground [&_h3]:mt-8 [&_h3]:mb-4 [&_strong]:text-foreground [&_strong]:font-semibold"
              dangerouslySetInnerHTML={{ __html: post.content }} 
            />
          </div>

          {/* Tags */}
          <div className="flex flex-wrap items-center gap-2 mb-8 pb-8 border-b">
            <Tag className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium text-muted-foreground mr-2">Tags:</span>
            {post.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="bg-muted hover:bg-muted/80">
                {tag}
              </Badge>
            ))}
          </div>

          {/* Author Bio */}
          <Card className="bg-muted/30 mb-8">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <User className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">
                    About {getAgentIdByAuthor(post.author) ? (
                      <button 
                        onClick={() => onNavigate("agent", { id: getAgentIdByAuthor(post.author) })}
                        className="text-primary hover:text-primary/80 hover:underline transition-colors"
                      >
                        {post.author}
                      </button>
                    ) : (
                      <span>{post.author}</span>
                    )}
                  </h3>
                  <p className="text-muted-foreground">{post.authorBio}</p>
                  {getAgentIdByAuthor(post.author) && (
                    <button 
                      onClick={() => onNavigate("agent", { id: getAgentIdByAuthor(post.author) })}
                      className="text-primary hover:text-primary/80 text-sm font-medium mt-2 hover:underline transition-colors"
                    >
                      View Agent Profile →
                    </button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Related Articles</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {relatedPosts.map((relatedPost) => (
                  <Card 
                    key={relatedPost.id} 
                    className="group overflow-hidden hover-lift border-0 modern-shadow cursor-pointer bg-background/90 backdrop-blur-sm hover:bg-background transition-all duration-300"
                    onClick={() => onNavigate("blog-post", { id: relatedPost.id })}
                  >
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <img
                        src={relatedPost.image}
                        alt={relatedPost.title}
                        className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                      />
                      <Badge className="absolute top-3 left-3 bg-primary/90 text-primary-foreground backdrop-blur-sm">
                        {relatedPost.category}
                      </Badge>
                    </div>
                    
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold leading-tight group-hover:text-primary transition-colors duration-300 mb-3">
                        {relatedPost.title}
                      </h3>
                      
                      <p className="text-muted-foreground mb-4 leading-relaxed">
                        {relatedPost.excerpt}
                      </p>
                      
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1">
                            <User className="h-4 w-4" />
                            <span>{relatedPost.author}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            <span>{relatedPost.readTime}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          <span>{relatedPost.date}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}