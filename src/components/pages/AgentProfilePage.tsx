import { ArrowLeft, Star, Award, TrendingUp, Mail, Phone, Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";
import { PropertyCard } from "../PropertyCard";
import { ContactForm } from "../ContactForm";
import { agents, properties } from "../../data/mockData";
import { useEffect } from "react";
import { updatePageSEO, createPersonSchema, createBreadcrumbSchema } from "../../utils/seo";

interface AgentProfilePageProps {
  agentId: string;
  onNavigate: (page: string, params?: any) => void;
}

export function AgentProfilePage({ agentId, onNavigate }: AgentProfilePageProps) {
  const agent = agents.find((a) => a.id === agentId);
  const agentProperties = properties.filter((p) => p.agentId === agentId).slice(0, 3);

  // SEO Optimization
  useEffect(() => {
    if (agent) {
      const breadcrumbs = [
        { name: "Home", url: "https://rowllyproperties.com" },
        { name: "Agents", url: "https://rowllyproperties.com/agents" },
        { name: agent.name, url: `https://rowllyproperties.com/agent/${agent.id}` }
      ];

      updatePageSEO({
        title: `${agent.name} - Expert Real Estate Agent | Rowlly Properties`,
        description: `Meet ${agent.name}, ${agent.title} at Rowlly Properties. ${agent.bio} Contact ${agent.name.split(' ')[0]} for expert real estate guidance.`,
        keywords: `${agent.name}, real estate agent, ${agent.title}, property expert, realtor`,
        canonical: `https://rowllyproperties.com/agent/${agent.id}`,
        ogTitle: `${agent.name} - Real Estate Expert`,
        ogDescription: `${agent.title} • ${agent.sales} Sales • ${agent.rating}★ Rating`,
        ogImage: agent.image,
        ogType: "profile",
        structuredData: [
          createPersonSchema(agent),
          createBreadcrumbSchema(breadcrumbs)
        ]
      });
    }
  }, [agent]);

  if (!agent) {
    return (
      <div className="container py-16 text-center">
        <h2>Agent not found</h2>
        <Button onClick={() => onNavigate("agents")} className="mt-4">
          Back to Agents
        </Button>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="border-b">
        <div className="container py-4">
          <Button variant="ghost" onClick={() => onNavigate("agents")}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Agents
          </Button>
        </div>
      </div>

      {/* Agent Profile */}
      <div className="container py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Profile Header */}
            <Card className="bg-muted/30">
              <CardContent className="p-8">
                <div className="flex flex-col md:flex-row gap-6 items-start">
                  <Avatar className="h-32 w-32">
                    <AvatarImage src={agent.image} alt={agent.name} />
                    <AvatarFallback>{agent.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>

                  <div className="flex-1 space-y-4">
                    <div>
                      <h1>{agent.name}</h1>
                      <p className="text-lg text-muted-foreground mt-1">{agent.title}</p>
                    </div>

                    <div className="flex flex-wrap gap-4">
                      <div className="flex items-center gap-2">
                        <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                        <span>{agent.rating} Rating</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Award className="h-5 w-5 text-primary" />
                        <span>{agent.reviews} Reviews</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <TrendingUp className="h-5 w-5 text-primary" />
                        <span>{agent.sales} Sales</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {agent.specialties.map((specialty, index) => (
                        <Badge key={index} variant="secondary">
                          {specialty}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex gap-3">
                      {agent.social.facebook && (
                        <a href={agent.social.facebook} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                          <Facebook className="h-5 w-5" />
                        </a>
                      )}
                      {agent.social.instagram && (
                        <a href={agent.social.instagram} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                          <Instagram className="h-5 w-5" />
                        </a>
                      )}
                      {agent.social.linkedin && (
                        <a href={agent.social.linkedin} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                          <Linkedin className="h-5 w-5" />
                        </a>
                      )}
                      {agent.social.twitter && (
                        <a href={agent.social.twitter} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                          <Twitter className="h-5 w-5" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* About */}
            <Card className="bg-muted/30">
              <CardHeader>
                <CardTitle>About {agent.name.split(' ')[0]}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">{agent.bio}</p>

                <Separator />

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Experience</p>
                    <p>{agent.experience} years</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Languages</p>
                    <p>{agent.languages.join(', ')}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="bg-muted/30">
                <CardContent className="p-6 text-center">
                  <TrendingUp className="h-8 w-8 mx-auto mb-2 text-primary" />
                  <div className="text-2xl mb-1">{agent.sales}</div>
                  <p className="text-sm text-muted-foreground">Properties Sold</p>
                </CardContent>
              </Card>
              <Card className="bg-muted/30">
                <CardContent className="p-6 text-center">
                  <Star className="h-8 w-8 mx-auto mb-2 text-yellow-400 fill-yellow-400" />
                  <div className="text-2xl mb-1">{agent.rating}</div>
                  <p className="text-sm text-muted-foreground">Average Rating</p>
                </CardContent>
              </Card>
              <Card className="bg-muted/30">
                <CardContent className="p-6 text-center">
                  <Award className="h-8 w-8 mx-auto mb-2 text-primary" />
                  <div className="text-2xl mb-1">{agent.experience}</div>
                  <p className="text-sm text-muted-foreground">Years Experience</p>
                </CardContent>
              </Card>
            </div>

            {/* Active Listings */}
            {agentProperties.length > 0 && (
              <Card className="bg-muted/30">
                <CardHeader>
                  <CardTitle>Active Listings</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {agentProperties.map((property) => (
                      <PropertyCard
                        key={property.id}
                        property={property}
                        onViewDetails={(id) => onNavigate("property", { id })}
                      />
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Card */}
            <Card className="bg-muted/30">
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start" asChild>
                  <a href={`tel:${agent.phone}`}>
                    <Phone className="h-4 w-4 mr-2" />
                    {agent.phone}
                  </a>
                </Button>
                <Button variant="outline" className="w-full justify-start" asChild>
                  <a href={`mailto:${agent.email}`}>
                    <Mail className="h-4 w-4 mr-2" />
                    Email Agent
                  </a>
                </Button>
              </CardContent>
            </Card>

            {/* Contact Form */}
            <div className="max-w-md mx-auto">
              <ContactForm
                title="Get in Touch"
                description={`Send a message to ${agent.name.split(' ')[0]}`}
                agentId={agent.id}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
