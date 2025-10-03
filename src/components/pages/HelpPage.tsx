import { useState, useEffect } from "react";
import { Search, Phone, Mail, MessageCircle, ChevronDown, ChevronRight, Home, Key, DollarSign, FileText, Shield, Calculator, ChevronUp, X } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../ui/collapsible";
import { Badge } from "../ui/badge";
import { updatePageSEO, seoConfigs } from "../../utils/seo";
import { Breadcrumbs } from "../ui/breadcrumbs";

interface HelpPageProps {
  onNavigate: (page: string, params?: any) => void;
}

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
  tags: string[];
}

const faqData: FAQItem[] = [
  // Buying Process
  {
    id: "buying-process",
    question: "What are the steps to buying a home?",
    answer: "The home buying process typically involves: 1) Getting pre-approved for a mortgage to understand your budget, 2) Finding a qualified real estate agent, 3) Searching for properties that meet your needs, 4) Making an offer on your chosen home, 5) Getting a home inspection, 6) Finalizing your mortgage, 7) Closing on the property. Our agents will guide you through each step.",
    category: "Buying",
    tags: ["process", "steps", "mortgage", "beginner"]
  },
  {
    id: "pre-approval",
    question: "What is mortgage pre-approval and why do I need it?",
    answer: "Mortgage pre-approval is when a lender reviews your financial information and gives you a conditional commitment for a specific loan amount. You need it because: it shows sellers you're serious, helps you understand your budget, speeds up the buying process, and strengthens your offer in competitive markets.",
    category: "Buying",
    tags: ["mortgage", "financing", "pre-approval"]
  },
  {
    id: "down-payment",
    question: "How much should I save for a down payment?",
    answer: "Down payments typically range from 3% to 20% of the home's purchase price. While 20% is ideal to avoid private mortgage insurance (PMI), many first-time buyer programs allow as little as 3-5% down. Factor in additional costs like closing costs (2-3% of purchase price), moving expenses, and emergency funds.",
    category: "Buying",
    tags: ["down-payment", "financing", "first-time-buyer"]
  },
  {
    id: "closing-costs",
    question: "What are closing costs and how much should I expect?",
    answer: "Closing costs are fees associated with finalizing your home purchase, typically 2-3% of the purchase price. They include: loan origination fees, appraisal, title insurance, attorney fees, property taxes, and homeowner's insurance. Your lender will provide a detailed estimate before closing.",
    category: "Buying",
    tags: ["closing", "costs", "fees"]
  },
  
  // Renting Process
  {
    id: "renting-process",
    question: "How do I rent a property?",
    answer: "To rent a property: 1) Determine your budget (rent should be 30% or less of your income), 2) Search for properties in your desired area, 3) Schedule viewings, 4) Submit a rental application with required documents, 5) Pass credit and background checks, 6) Sign the lease agreement, 7) Pay security deposit and first month's rent. We can help you find the perfect rental.",
    category: "Renting",
    tags: ["process", "application", "budget", "beginner"]
  },
  {
    id: "rental-application",
    question: "What documents do I need for a rental application?",
    answer: "Typical rental application documents include: government-issued photo ID, proof of income (pay stubs, employment letter, tax returns), bank statements, references from previous landlords, credit report (some landlords will run this themselves), and completed rental application form. Having these ready speeds up the process.",
    category: "Renting",
    tags: ["application", "documents", "requirements"]
  },
  {
    id: "security-deposit",
    question: "How much is a typical security deposit?",
    answer: "Security deposits are typically 1-2 months' rent, depending on your location and the property. This money is held to cover potential damages beyond normal wear and tear. You should receive your deposit back within 30 days of moving out, minus any legitimate deductions. Always document the property's condition when moving in.",
    category: "Renting",
    tags: ["deposit", "moving", "lease"]
  },
  
  // Market & Pricing
  {
    id: "market-value",
    question: "How do I know if a property is priced fairly?",
    answer: "To assess fair pricing: research comparable properties ('comps') in the area, consider recent sale prices of similar homes, factor in property condition and features, understand local market trends, and work with an experienced agent who knows the market. Our agents provide detailed market analyses to help you make informed decisions.",
    category: "Pricing",
    tags: ["market", "pricing", "value", "comps"]
  },
  {
    id: "negotiation",
    question: "Can I negotiate the price on a property?",
    answer: "Yes, in most cases you can negotiate. For buying: consider market conditions, property condition, how long it's been listed, and recent comparable sales. For renting: negotiation is possible, especially for longer leases or if you're an excellent tenant. Our agents are skilled negotiators who will advocate for your best interests.",
    category: "Pricing",
    tags: ["negotiation", "offers", "strategy"]
  },
  
  // Legal & Documentation
  {
    id: "home-inspection",
    question: "Do I need a home inspection?",
    answer: "While not legally required, a home inspection is highly recommended when buying. It identifies potential problems like structural issues, electrical problems, plumbing concerns, or safety hazards. This typically costs $300-500 but can save thousands if major issues are discovered. You can negotiate repairs or price adjustments based on findings.",
    category: "Legal",
    tags: ["inspection", "due-diligence", "safety"]
  },
  {
    id: "real-estate-agent",
    question: "Do I need a real estate agent?",
    answer: "While not required, a qualified agent provides valuable services: market knowledge, negotiation skills, paperwork handling, professional network (inspectors, lenders, attorneys), and guidance through complex processes. For buyers, the seller typically pays agent commissions. Our experienced agents are here to help you succeed.",
    category: "Legal",
    tags: ["agent", "representation", "services"]
  },
  
  // Financing
  {
    id: "credit-score",
    question: "What credit score do I need to buy a home?",
    answer: "Credit score requirements vary by loan type: Conventional loans typically require 620+, FHA loans allow 580+ (or 500+ with higher down payment), VA loans have no minimum but lenders prefer 620+, and USDA loans typically require 640+. Higher scores get better interest rates. If your score needs improvement, we can recommend credit counseling services.",
    category: "Financing",
    tags: ["credit", "score", "loans", "qualification"]
  },
  {
    id: "first-time-buyer",
    question: "Are there special programs for first-time home buyers?",
    answer: "Yes! First-time buyer programs include: FHA loans with low down payments, VA loans for veterans, USDA loans for rural areas, state and local down payment assistance programs, and tax credits. These programs often offer reduced down payments, lower interest rates, or closing cost assistance. Our agents can help you explore available options.",
    category: "Financing",
    tags: ["first-time-buyer", "programs", "assistance"]
  }
];

const categories = ["All", "Buying", "Renting", "Pricing", "Legal", "Financing"];

export function HelpPage({ onNavigate }: HelpPageProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [openItems, setOpenItems] = useState<string[]>([]);
  const [isPopularGuidesOpen, setIsPopularGuidesOpen] = useState(true);
  const [searchFocused, setSearchFocused] = useState(false);

  useEffect(() => {
    updatePageSEO({
      title: "Help & FAQ - Real Estate Guide | Rowlly Properties",
      description: "Get expert guidance on buying, renting, and real estate processes. Find answers to common questions and get quick support from our team.",
      canonical: "https://rowllyproperties.com/help"
    });
  }, []);

  const filteredFAQs = faqData.filter(faq => {
    const matchesSearch = searchQuery === "" || 
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory === "All" || faq.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const toggleItem = (id: string) => {
    setOpenItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const QuickContactCard = ({ icon: Icon, title, description, action, actionText, primary = false }: {
    icon: any;
    title: string;
    description: string;
    action: () => void;
    actionText: string;
    primary?: boolean;
  }) => (
    <Card className={`bg-muted/30 h-full flex flex-col transition-all duration-200 hover:shadow-lg ${primary ? 'border-primary/50 bg-primary/10' : ''}`}>
      <CardContent className="p-8 h-full flex flex-col">
        <div className="text-center flex-1 flex flex-col justify-center items-center">
          <div className={`w-12 h-12 mx-auto rounded-full flex items-center justify-center ${primary ? 'bg-primary text-primary-foreground' : 'bg-background'}`}>
            <Icon className="h-6 w-6" />
          </div>
          <h3 className="mt-4 text-center text-base font-semibold">{title}</h3>
          <p className="text-sm text-muted-foreground mt-2 min-h-[2.5rem] flex items-center justify-center text-center">{description}</p>
        </div>
        <div className="pt-4">
          <Button 
            onClick={action}
            className="w-full"
            variant={primary ? "default" : "outline"}
          >
            {actionText}
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div>
      <div className="container py-0.5 md:py-1">
        <Breadcrumbs 
          items={[
            { label: "Help & FAQ", isActive: true }
          ]}
          onNavigate={onNavigate}
        />
      </div>
      <div className="container py-4 md:py-6">
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h1>Help & FAQ</h1>
        <p className="text-lg text-muted-foreground mt-4">
          Find answers to common questions about buying, renting, and navigating the real estate process. 
          Our expert guides are written in plain language to help you succeed.
        </p>
        <div className="flex flex-wrap justify-center items-center gap-6 mt-6 text-sm text-muted-foreground">
          <span>✓ Expert Guidance</span>
          <span>✓ Plain Language</span>
          <span>✓ Instant Answers</span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto space-y-8">

        {/* Quick Contact Options */}
        <section aria-labelledby="quick-contact-heading">
          <h2 id="quick-contact-heading" className="text-2xl font-bold text-center mb-6">Get Help Now</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <QuickContactCard
              icon={MessageCircle}
              title="Live Chat"
              description="Chat with our team for immediate assistance"
              action={() => {
                // Simple chat simulation
                alert("Chat feature coming soon! For now, please call or email us.");
              }}
              actionText="Start Chat"
              primary={true}
            />
            <QuickContactCard
              icon={Phone}
              title="Call Us"
              description="Speak directly with a real estate expert"
              action={() => window.open("tel:+1-555-0123", "_self")}
              actionText="(555) 012-3456"
            />
            <QuickContactCard
              icon={Mail}
              title="Email Support"
              description="Send us your questions anytime"
              action={() => onNavigate("contact")}
              actionText="Send Email"
            />
          </div>
        </section>

        {/* Search and Filter */}
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder={searchFocused || searchQuery ? "" : "Search FAQ..."}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => {
                setTimeout(() => setSearchFocused(false), 200);
              }}
              className="pl-10 pr-12 text-sm placeholder:text-ellipsis placeholder:text-sm"
            />
            {searchQuery && (
              <Button
                variant="ghost"
                size="sm"
                className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
                onClick={() => setSearchQuery("")}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
          
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className="text-xs"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Popular Guides Section */}
        <Collapsible
          open={isPopularGuidesOpen}
          onOpenChange={setIsPopularGuidesOpen}
        >
          <div className="flex items-center gap-2 mb-6">
            <h2 id="popular-guides-heading" className="text-2xl font-bold">Popular Guides</h2>
            <CollapsibleTrigger asChild>
              <Button 
                variant="ghost" 
                size="sm"
                className="p-1 h-8 w-8"
                aria-label={isPopularGuidesOpen ? "Hide popular guides" : "Show popular guides"}
              >
                {isPopularGuidesOpen ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
              </Button>
            </CollapsibleTrigger>
          </div>
          
          <CollapsibleContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              <Card className="bg-muted/30 hover:shadow-lg transition-all duration-200 cursor-pointer border-2 hover:border-primary/30 hover:bg-primary/5 interactive-scale group" onClick={() => setSelectedCategory("Buying")}>
                <CardContent className="p-8 text-center">
                  <div className="w-12 h-12 mx-auto rounded-full bg-primary/10 group-hover:bg-primary group-hover:scale-110 transition-all duration-200 flex items-center justify-center mb-6">
                    <Home className="w-8 h-8 text-primary group-hover:text-primary-foreground transition-colors duration-200" />
                  </div>
                  <h3 className="text-base font-semibold group-hover:text-primary transition-colors duration-200 mb-4">First-Time Buying</h3>
                  <p className="text-sm text-muted-foreground mb-4">Complete guide to purchasing your first home</p>
                  <div className="mt-3 text-xs text-primary font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    Click to explore →
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-muted/30 hover:shadow-lg transition-all duration-200 cursor-pointer border-2 hover:border-primary/30 hover:bg-primary/5 interactive-scale group" onClick={() => setSelectedCategory("Renting")}>
                <CardContent className="p-8 text-center">
                  <div className="w-12 h-12 mx-auto rounded-full bg-primary/10 group-hover:bg-primary group-hover:scale-110 transition-all duration-200 flex items-center justify-center mb-6">
                    <Key className="w-8 h-8 text-primary group-hover:text-primary-foreground transition-colors duration-200" />
                  </div>
                  <h3 className="text-base font-semibold group-hover:text-primary transition-colors duration-200 mb-4">Renting Made Easy</h3>
                  <p className="text-sm text-muted-foreground mb-4">Everything you need to know about renting</p>
                  <div className="mt-3 text-xs text-primary font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    Click to explore →
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-muted/30 hover:shadow-lg transition-all duration-200 cursor-pointer border-2 hover:border-primary/30 hover:bg-primary/5 interactive-scale group" onClick={() => setSelectedCategory("Financing")}>
                <CardContent className="p-8 text-center">
                  <div className="w-12 h-12 mx-auto rounded-full bg-primary/10 group-hover:bg-primary group-hover:scale-110 transition-all duration-200 flex items-center justify-center mb-6">
                    <Calculator className="w-8 h-8 text-primary group-hover:text-primary-foreground transition-colors duration-200" />
                  </div>
                  <h3 className="text-base font-semibold group-hover:text-primary transition-colors duration-200 mb-4">Financing Options</h3>
                  <p className="text-sm text-muted-foreground mb-4">Understand mortgages and payment programs</p>
                  <div className="mt-3 text-xs text-primary font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    Click to explore →
                  </div>
                </CardContent>
              </Card>
            </div>
          </CollapsibleContent>
        </Collapsible>

        {/* FAQ Results */}
        <section aria-labelledby="faq-results-heading">
          <div className="flex items-center justify-between mb-6">
            <h2 id="faq-results-heading" className="text-2xl font-bold">
              {searchQuery || selectedCategory !== "All" ? "Search Results" : "Frequently Asked Questions"}
            </h2>
            <Badge variant="secondary">
              {filteredFAQs.length} {filteredFAQs.length === 1 ? 'result' : 'results'}
            </Badge>
          </div>

          {filteredFAQs.length === 0 ? (
            <Card className="bg-muted/30">
              <CardContent className="p-8 py-12 text-center">
                <Search className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-base font-semibold mb-2">No results found</h3>
                <p className="text-muted-foreground mb-4">
                  Try different keywords or browse all categories. 
                  Can't find what you're looking for?
                </p>
                <Button onClick={() => onNavigate("contact")}>
                  Contact Us Directly
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {filteredFAQs.map((faq) => (
                <Collapsible
                  key={faq.id}
                  open={openItems.includes(faq.id)}
                  onOpenChange={() => toggleItem(faq.id)}
                >
                  <Card className="bg-muted/30 overflow-hidden">
                    <CollapsibleTrigger className="w-full">
                      <CardContent className="p-8 text-left hover:bg-muted/50 transition-colors">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <Badge variant="outline" className="text-xs">
                                {faq.category}
                              </Badge>
                            </div>
                            <h3 className="text-base font-semibold leading-relaxed text-left">
                              {faq.question}
                            </h3>
                          </div>
                          {openItems.includes(faq.id) ? (
                            <ChevronDown className="h-5 w-5 text-muted-foreground" />
                          ) : (
                            <ChevronRight className="h-5 w-5 text-muted-foreground" />
                          )}
                        </div>
                      </CardContent>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <CardContent className="p-8 pt-0">
                        <div className="bg-muted/30 rounded-lg p-4">
                          <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                            {faq.answer}
                          </p>
                          <div className="flex flex-wrap gap-1 mt-3">
                            {faq.tags.map((tag) => (
                              <Badge key={tag} variant="secondary" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </CollapsibleContent>
                  </Card>
                </Collapsible>
              ))}
            </div>
          )}
        </section>

        {/* Still Need Help Section */}
        <Card className="bg-muted/30">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Still Need Help?</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Our experienced real estate professionals are here to guide you through every step of your journey. 
              Whether you're buying your first home or looking for an investment property, we're here to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" onClick={() => onNavigate("contact")}>
                <Mail className="h-4 w-4 mr-2" />
                Contact an Agent
              </Button>
              <Button variant="outline" size="lg" onClick={() => onNavigate("search")}>
                <Home className="h-4 w-4 mr-2" />
                Browse Properties
              </Button>
            </div>
          </CardContent>
        </Card>
        </div>
      </div>
    </div>
  );
}