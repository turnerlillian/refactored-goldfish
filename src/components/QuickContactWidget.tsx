import { useState } from "react";
import { MessageCircle, Phone, Mail, X, ChevronUp, HelpCircle } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

interface QuickContactWidgetProps {
  onNavigate: (page: string, params?: any) => void;
}

export function QuickContactWidget({ onNavigate }: QuickContactWidgetProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const ContactOption = ({ 
    icon: Icon, 
    label, 
    description, 
    action, 
    primary = false 
  }: {
    icon: any;
    label: string;
    description: string;
    action: () => void;
    primary?: boolean;
  }) => (
    <Button
      variant={primary ? "default" : "outline"}
      className="w-full justify-start gap-3 h-auto p-3 text-left"
      onClick={action}
    >
      <Icon className="h-4 w-4 flex-shrink-0" />
      <div className="flex-1 min-w-0">
        <div className="font-medium">{label}</div>
        <div className="text-xs opacity-75 truncate">{description}</div>
      </div>
    </Button>
  );

  if (!isExpanded) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          size="lg"
          className="rounded-full h-14 w-14 shadow-lg hover:shadow-xl transition-all duration-200 animate-pulse-slow"
          onClick={() => setIsExpanded(true)}
          aria-label="Open quick contact options"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Card className="w-80 shadow-xl border-2 border-primary/20 bg-background/95 backdrop-blur-sm">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <HelpCircle className="h-4 w-4 text-primary-foreground" />
              </div>
              <CardTitle className="text-lg">Need Help?</CardTitle>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => setIsExpanded(false)}
              aria-label="Close quick contact"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-sm text-muted-foreground">
            Get instant support from our real estate experts
          </p>
        </CardHeader>
        
        <CardContent className="space-y-3">
          <ContactOption
            icon={MessageCircle}
            label="Live Chat"
            description="Chat with our team now"
            action={() => {
              // Simple chat simulation - in a real app, this would integrate with a chat service
              alert("Chat feature coming soon! For immediate assistance, please call us at (555) 012-3456 or use our contact form.");
              setIsExpanded(false);
            }}
            primary={true}
          />
          
          <ContactOption
            icon={Phone}
            label="Call Now"
            description="(555) 012-3456"
            action={() => {
              window.open("tel:+1-555-0123", "_self");
              setIsExpanded(false);
            }}
          />
          
          <ContactOption
            icon={Mail}
            label="Send Message"
            description="Get a detailed response"
            action={() => {
              onNavigate("contact");
              setIsExpanded(false);
            }}
          />
          
          <div className="border-t pt-3">
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 h-auto p-3 text-left"
              onClick={() => {
                onNavigate("help");
                setIsExpanded(false);
              }}
            >
              <HelpCircle className="h-4 w-4 flex-shrink-0" />
              <div className="flex-1">
                <div className="font-medium">Help & FAQ</div>
                <div className="text-xs opacity-75">Find answers instantly</div>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Add this to globals.css for the pulse animation
const pulseAnimation = `
@keyframes pulse-slow {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.8;
  }
}

.animate-pulse-slow {
  animation: pulse-slow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
`;