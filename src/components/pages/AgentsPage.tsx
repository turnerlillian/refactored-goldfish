import { Star, Award, TrendingUp, Mail, Phone } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { agents } from "../../data/mockData";
import { useEffect } from "react";
import { updatePageSEO, seoConfigs } from "../../utils/seo";
import { Breadcrumbs } from "../ui/breadcrumbs";

interface AgentsPageProps {
  onNavigate: (page: string, params?: any) => void;
}

export function AgentsPage({ onNavigate }: AgentsPageProps) {
  // SEO Optimization
  useEffect(() => {
    updatePageSEO(seoConfigs.agents);
  }, []);
  return (
    <div>
      <div className="container py-0.5 md:py-1">
        <Breadcrumbs 
          items={[
            { label: "About Rowlly", isActive: true }
          ]}
          onNavigate={onNavigate}
        />
      </div>
      
      <div className="container py-4 md:py-6">
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h1>Meet Your Real Estate Experts</h1>
        <p className="text-lg text-muted-foreground mt-4">
          Our award-winning team of licensed professionals brings decades of combined experience, 
          local market expertise, and proven results to every transaction.
        </p>
        <div className="flex flex-wrap justify-center items-center gap-6 mt-6 text-sm text-muted-foreground">
          <span>✓ Top 1% of Agents</span>
          <span>✓ $50M+ in Sales</span>
          <span>✓ 98% Client Satisfaction</span>
        </div>
      </div>

      {/* Agent Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        {agents.map((agent) => (
          <Card 
            key={agent.id} 
            className="bg-muted/30 overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer hover:scale-[1.02] hover:border-primary/30"
            onClick={() => onNavigate("agent", { id: agent.id })}
          >
            <CardContent className="p-8 space-y-4">
              <div className="flex flex-col items-center text-center">
                <Avatar className="h-24 w-24 mb-4">
                  <AvatarImage src={agent.image} alt={agent.name} />
                  <AvatarFallback>{agent.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>

                <h3>{agent.name}</h3>
                <p className="text-sm text-muted-foreground">{agent.title}</p>

                <div className="flex items-center gap-1 mt-2">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm">{agent.rating} ({agent.reviews} reviews)</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 justify-center">
                {agent.specialties.slice(0, 2).map((specialty, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {specialty}
                  </Badge>
                ))}
              </div>

              <div className="grid grid-cols-3 gap-2 text-center py-3 border-y">
                <div>
                  <div className="flex items-center justify-center mb-1">
                    <TrendingUp className="h-4 w-4 text-primary" />
                  </div>
                  <p className="text-sm">{agent.sales}</p>
                  <p className="text-xs text-muted-foreground">Sales</p>
                </div>
                <div>
                  <div className="flex items-center justify-center mb-1">
                    <Award className="h-4 w-4 text-primary" />
                  </div>
                  <p className="text-sm">{agent.experience}y</p>
                  <p className="text-xs text-muted-foreground">Exp.</p>
                </div>
                <div>
                  <div className="flex items-center justify-center mb-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                  </div>
                  <p className="text-sm">{agent.rating}</p>
                  <p className="text-xs text-muted-foreground">Rating</p>
                </div>
              </div>

              <div className="space-y-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full justify-start" 
                  asChild
                  onClick={(e) => e.stopPropagation()}
                >
                  <a href={`tel:${agent.phone}`}>
                    <Phone className="h-3 w-3 mr-2" />
                    Call
                  </a>
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full justify-start" 
                  asChild
                  onClick={(e) => e.stopPropagation()}
                >
                  <a href={`mailto:${agent.email}`}>
                    <Mail className="h-3 w-3 mr-2" />
                    Email
                  </a>
                </Button>
              </div>

              <Button 
                className="w-full" 
                onClick={(e) => {
                  e.stopPropagation();
                  onNavigate("agent", { id: agent.id });
                }}
              >
                View Full Profile
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* About Us Section */}
      <div className="max-w-4xl mx-auto mb-16">
        <Card className="bg-muted/30">
          <CardContent className="p-8">
            <div className="text-center mb-6">
              <h2 className="mb-4">About Rowlly Properties</h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  As a premier real estate brokerage, Rowlly Properties has earned its reputation through consistent results, ethical practices, and unwavering commitment to client success. With over $50 million in sales volume and recognition as top 1% performers, our team brings proven expertise to every transaction.
                </p>
                
                <p className="text-muted-foreground leading-relaxed">
                  Our licensed professionals leverage advanced market analytics, extensive local knowledge, and strategic marketing to maximize value for our clients. From first-time buyers to seasoned investors, we deliver personalized solutions backed by industry-leading results and 98% client satisfaction ratings.
                </p>
              </div>
              
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="p-4 rounded-lg bg-background/50">
                    <h3 className="text-2xl font-bold text-primary">$50M+</h3>
                    <p className="text-sm text-muted-foreground">Sales Volume</p>
                  </div>
                  <div className="p-4 rounded-lg bg-background/50">
                    <h3 className="text-2xl font-bold text-primary">98%</h3>
                    <p className="text-sm text-muted-foreground">Client Satisfaction</p>
                  </div>
                  <div className="p-4 rounded-lg bg-background/50">
                    <h3 className="text-2xl font-bold text-primary">15+</h3>
                    <p className="text-sm text-muted-foreground">Years Experience</p>
                  </div>
                  <div className="p-4 rounded-lg bg-white/50">
                    <h3 className="text-2xl font-bold text-primary">24/7</h3>
                    <p className="text-sm text-muted-foreground">Support</p>
                  </div>
                </div>
                
                <div className="text-center">
                  <Button 
                    size="lg"
                    onClick={(e) => {
                      e.stopPropagation();
                      onNavigate("contact");
                    }}
                  >
                    Start Your Journey
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-16 max-w-3xl mx-auto text-center">
        <Card className="bg-muted/30">
          <CardContent className="p-8">
            <h2 className="mb-4">Ready to Work with an Agent?</h2>
            <p className="text-muted-foreground mb-6">
              Our experienced team is ready to help you navigate the real estate market and find your perfect property.
            </p>
            <Button 
              size="lg" 
              onClick={(e) => {
                e.stopPropagation();
                onNavigate("contact");
              }}
            >
              Contact Us Today
            </Button>
          </CardContent>
        </Card>
        </div>
      </div>
    </div>
  );
}
