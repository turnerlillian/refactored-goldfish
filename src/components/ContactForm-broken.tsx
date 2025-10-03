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
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    
    // Reset errors
    setErrors({});
    
    // Basic validation
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }
    
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    
    if (!formData.inquiryType) {
      newErrors.inquiryType = "Please select an inquiry type";
    }
    
    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      // Focus on first error field
      const firstErrorField = Object.keys(newErrors)[0];
      const errorElement = document.getElementById(firstErrorField);
      if (errorElement) {
        errorElement.focus();
      }
      return;
    }
    
    setIsSubmitting(true);
    
    // Mock form submission
    setTimeout(() => {
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
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <Card className="bg-muted/30 h-full">
      <CardHeader className="pb-6">
        <CardTitle>{title || "Contact Us"}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent className="h-full flex flex-col">
        <form onSubmit={handleSubmit} className="space-y-4 flex-1 flex flex-col" noValidate aria-label="Contact form">
          <fieldset className="space-y-4" disabled={isSubmitting}>
            <legend className="sr-only">Contact Information</legend>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  aria-required="true"
                  aria-invalid={errors.name ? "true" : "false"}
                  aria-describedby={errors.name ? "name-error" : undefined}
                  placeholder="John Doe"
                  className={errors.name ? "border-red-500 focus:ring-red-500" : ""}
                />
                {errors.name && (
                  <div id="name-error" className="text-sm text-red-600" role="alert">
                    {errors.name}
                  </div>
                )}
              </div>
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
                  aria-required="true"
                  aria-invalid={errors.email ? "true" : "false"}
                  aria-describedby={errors.email ? "email-error" : undefined}
                  placeholder="john@example.com"
                  className={errors.email ? "border-red-500 focus:ring-red-500" : ""}
                />
                {errors.email && (
                  <div id="email-error" className="text-sm text-red-600" role="alert">
                    {errors.email}
                  </div>
                )}
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

          <div className="space-y-2 flex-1 flex flex-col">
            <Label htmlFor="message">Message *</Label>
            <Textarea
              id="message"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              required
              placeholder="Tell us about your needs..."
              className="flex-1 min-h-[120px]"
            />
          </div>

          <div className="space-y-4 mt-auto">
            <Button type="submit" className="w-full">
              Send Message
            </Button>

            <p className="text-xs text-muted-foreground text-center">
              By submitting this form, you agree to our privacy policy and terms of service.
            </p>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
