import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { toast } from "sonner";

interface ContactFormProps {
  title?: string;
  description?: string;
  propertyId?: string;
  agentId?: string;
}

export function ContactForm({ title, description, propertyId, agentId }: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    inquiryType: "",
    message: "",
  });

  // Prevent scroll on input focus
  useEffect(() => {
    const preventScrollOnFocus = (e: FocusEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.tagName === 'SELECT') {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
        
        // Use setTimeout to ensure the scroll happens after the browser's default behavior
        setTimeout(() => {
          window.scrollTo(scrollLeft, scrollTop);
        }, 0);
      }
    };

    document.addEventListener('focusin', preventScrollOnFocus, true);
    
    return () => {
      document.removeEventListener('focusin', preventScrollOnFocus, true);
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mock form submission
    console.log("Form submitted:", { ...formData, propertyId, agentId });
    toast.success("Message sent successfully! We'll get back to you soon.");
    
    // Reset form
    setFormData({
      name: "",
      email: "",
      phone: "",
      inquiryType: "",
      message: "",
    });
  };

  return (
    <Card className="bg-muted/30">
      <CardContent className="p-8">
        <h3 className="mb-4">{title || "Contact Us"}</h3>
        {description && <p className="text-muted-foreground mb-6">{description}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                placeholder="John Doe"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                placeholder="john@example.com"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="(555) 123-4567"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="inquiryType">Inquiry Type *</Label>
              <Select
                value={formData.inquiryType}
                onValueChange={(value: string) => setFormData({ ...formData, inquiryType: value })}
                required
              >
                <SelectTrigger id="inquiryType">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="viewing">Schedule a Viewing</SelectItem>
                  <SelectItem value="information">Request Information</SelectItem>
                  <SelectItem value="offer">Make an Offer</SelectItem>
                  <SelectItem value="general">General Inquiry</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Message *</Label>
            <Textarea
              id="message"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              required
              placeholder="Tell us about your needs..."
              rows={5}
            />
          </div>

          <Button type="submit" className="w-full">
            Send Message
          </Button>

          <p className="text-xs text-muted-foreground text-center">
            By submitting this form, you agree to our privacy policy and terms of service.
          </p>
        </form>
      </CardContent>
    </Card>
  );
}
