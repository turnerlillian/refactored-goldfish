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
  const [fieldTouched, setFieldTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Real-time validation functions
  const validateEmail = (email: string): string => {
    if (!email.trim()) return "Email is required";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return "Please enter a valid email address";
    return "";
  };

  const validatePhone = (phone: string): string => {
    if (!phone.trim()) return ""; // Phone is optional
    
    // Remove all formatting characters to check just the digits
    const digitsOnly = phone.replace(/[\s\-\.\(\)\+]/g, "");
    
    // Accept phone numbers with 10-15 digits (covers US and international)
    if (digitsOnly.length < 10 || digitsOnly.length > 15) {
      return "Please enter a valid phone number (10-15 digits)";
    }
    
    // Check if it contains only digits (after removing formatting)
    if (!/^\d+$/.test(digitsOnly)) {
      return "Phone number should contain only numbers and formatting characters";
    }
    
    return "";
  };

  const validateName = (name: string): string => {
    if (!name.trim()) return "Full name is required";
    if (name.trim().length < 2) return "Name must be at least 2 characters";
    return "";
  };

  const validateMessage = (message: string): string => {
    if (!message.trim()) return "Message is required";
    if (message.trim().length < 10) return "Message must be at least 10 characters";
    return "";
  };

  // Handle field changes with real-time validation
  const handleFieldChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Only validate if field has been touched
    if (fieldTouched[field]) {
      const newErrors = { ...errors };
      
      switch (field) {
        case 'email':
          const emailError = validateEmail(value);
          if (emailError) newErrors.email = emailError;
          else delete newErrors.email;
          break;
        case 'phone':
          const phoneError = validatePhone(value);
          if (phoneError) newErrors.phone = phoneError;
          else delete newErrors.phone;
          break;
        case 'name':
          const nameError = validateName(value);
          if (nameError) newErrors.name = nameError;
          else delete newErrors.name;
          break;
        case 'message':
          const messageError = validateMessage(value);
          if (messageError) newErrors.message = messageError;
          else delete newErrors.message;
          break;
        case 'inquiryType':
          if (value) delete newErrors.inquiryType;
          else newErrors.inquiryType = "Please select an inquiry type";
          break;
      }
      
      setErrors(newErrors);
    }
  };

  // Handle field blur to mark as touched
  const handleFieldBlur = (field: string) => {
    setFieldTouched(prev => ({ ...prev, [field]: true }));
    
    // Trigger validation on blur
    const value = formData[field as keyof typeof formData];
    handleFieldChange(field, value);
  };

  // Format phone number as user types
  const formatPhoneNumber = (value: string): string => {
    // Remove all non-digit characters
    const phoneNumber = value.replace(/[^\d]/g, '');
    const phoneNumberLength = phoneNumber.length;
    
    // Don't format if empty
    if (phoneNumberLength === 0) return '';
    
    // Format based on length
    if (phoneNumberLength < 4) {
      return phoneNumber;
    } else if (phoneNumberLength < 7) {
      return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
    } else if (phoneNumberLength <= 10) {
      return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`;
    } else {
      // For numbers longer than 10 digits (international), show differently
      return `+${phoneNumber.slice(0, phoneNumberLength - 10)} (${phoneNumber.slice(phoneNumberLength - 10, phoneNumberLength - 7)}) ${phoneNumber.slice(phoneNumberLength - 7, phoneNumberLength - 4)}-${phoneNumber.slice(phoneNumberLength - 4)}`;
    }
  };

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
    
    // Mark all fields as touched
    const allFields = ['name', 'email', 'phone', 'inquiryType', 'message'];
    setFieldTouched(Object.fromEntries(allFields.map(field => [field, true])));
    
    // Comprehensive validation
    const newErrors: Record<string, string> = {};
    
    const nameError = validateName(formData.name);
    if (nameError) newErrors.name = nameError;
    
    const emailError = validateEmail(formData.email);
    if (emailError) newErrors.email = emailError;
    
    const phoneError = validatePhone(formData.phone);
    if (phoneError) newErrors.phone = phoneError;
    
    if (!formData.inquiryType) {
      newErrors.inquiryType = "Please select an inquiry type";
    }
    
    const messageError = validateMessage(formData.message);
    if (messageError) newErrors.message = messageError;
    
    setErrors(newErrors);
    
    if (Object.keys(newErrors).length > 0) {
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
                  onChange={(e) => handleFieldChange('name', e.target.value)}
                  onBlur={() => handleFieldBlur('name')}
                  required
                  aria-required="true"
                  aria-invalid={errors.name ? "true" : "false"}
                  aria-describedby={errors.name ? "name-error" : "name-help"}
                  placeholder="Enter your full name"
                  className={errors.name ? "border-red-500 focus:ring-red-500" : ""}
                />
                <div id="name-help" className="text-xs text-muted-foreground">
                  {!errors.name && !fieldTouched.name && "Please enter your full legal name"}
                </div>
                {errors.name && (
                  <div id="name-error" className="text-sm text-red-600 flex items-center gap-1" role="alert">
                    <span className="text-red-500">⚠</span>
                    {errors.name}
                  </div>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleFieldChange('email', e.target.value)}
                  onBlur={() => handleFieldBlur('email')}
                  required
                  aria-required="true"
                  aria-invalid={errors.email ? "true" : "false"}
                  aria-describedby={errors.email ? "email-error" : "email-help"}
                  placeholder="your.email@example.com"
                  className={errors.email ? "border-red-500 focus:ring-red-500" : ""}
                />
                <div id="email-help" className="text-xs text-muted-foreground">
                  {!errors.email && !fieldTouched.email && "We'll use this to respond to your inquiry"}
                </div>
                {errors.email && (
                  <div id="email-error" className="text-sm text-red-600 flex items-center gap-1" role="alert">
                    <span className="text-red-500">⚠</span>
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
                  onChange={(e) => {
                    const formatted = formatPhoneNumber(e.target.value);
                    handleFieldChange('phone', formatted);
                  }}
                  onBlur={() => handleFieldBlur('phone')}
                  placeholder="(555) 123-4567 or +1 555 123 4567"
                  aria-describedby={errors.phone ? "phone-error" : "phone-description"}
                  className={errors.phone ? "border-red-500 focus:ring-red-500" : ""}
                />
                <div id="phone-description" className="text-xs text-muted-foreground">
                  {!errors.phone && "Optional. US or international numbers accepted (10-15 digits)."}
                </div>
                {errors.phone && (
                  <div id="phone-error" className="text-sm text-red-600 flex items-center gap-1" role="alert">
                    <span className="text-red-500">⚠</span>
                    {errors.phone}
                  </div>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="inquiryType">Inquiry Type *</Label>
                <Select
                  value={formData.inquiryType}
                  onValueChange={(value: string) => handleFieldChange('inquiryType', value)}
                  required
                >
                  <SelectTrigger 
                    id="inquiryType"
                    aria-required="true"
                    aria-invalid={errors.inquiryType ? "true" : "false"}
                    aria-describedby={errors.inquiryType ? "inquiryType-error" : "inquiryType-help"}
                    className={errors.inquiryType ? "border-red-500 focus:ring-red-500" : ""}
                    onBlur={() => handleFieldBlur('inquiryType')}
                  >
                    <SelectValue placeholder="Select the type of inquiry" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="viewing">🏠 Schedule a Property Viewing</SelectItem>
                    <SelectItem value="information">📋 Request Property Information</SelectItem>
                    <SelectItem value="offer">💰 Make an Offer</SelectItem>
                    <SelectItem value="selling">🏡 Selling My Property</SelectItem>
                    <SelectItem value="renting">🔑 Rental Inquiry</SelectItem>
                    <SelectItem value="investment">📈 Investment Opportunities</SelectItem>
                    <SelectItem value="general">💬 General Question</SelectItem>
                    <SelectItem value="partnership">🤝 Business Partnership</SelectItem>
                  </SelectContent>
                </Select>
                <div id="inquiryType-help" className="text-xs text-muted-foreground">
                  {!errors.inquiryType && "Help us direct your inquiry to the right specialist"}
                </div>
                {errors.inquiryType && (
                  <div id="inquiryType-error" className="text-sm text-red-600 flex items-center gap-1" role="alert">
                    <span className="text-red-500">⚠</span>
                    {errors.inquiryType}
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-2 flex-1 flex flex-col">
              <Label htmlFor="message">Message *</Label>
              <Textarea
                id="message"
                value={formData.message}
                onChange={(e) => handleFieldChange('message', e.target.value)}
                onBlur={() => handleFieldBlur('message')}
                required
                aria-required="true"
                aria-invalid={errors.message ? "true" : "false"}
                aria-describedby={errors.message ? "message-error" : "message-description"}
                placeholder="Tell us about your real estate needs, timeline, budget, and any specific questions..."
                className={`flex-1 min-h-[120px] ${errors.message ? "border-red-500 focus:ring-red-500" : ""}`}
              />
              <div className="flex justify-between items-center">
                <div id="message-description" className="text-xs text-muted-foreground">
                  {!errors.message && `${formData.message.length}/500 characters (minimum 10)`}
                </div>
                {formData.message.length > 0 && formData.message.length < 10 && fieldTouched.message && (
                  <div className="text-xs text-amber-600">
                    {10 - formData.message.length} more characters needed
                  </div>
                )}
              </div>
              {errors.message && (
                <div id="message-error" className="text-sm text-red-600 flex items-center gap-1" role="alert">
                  <span className="text-red-500">⚠</span>
                  {errors.message}
                </div>
              )}
            </div>
          </fieldset>

          <div className="space-y-4 mt-auto">
            <Button 
              type="submit" 
              className="w-full focus:outline-2 focus:outline-offset-2 focus:outline-secondary btn-press" 
              disabled={isSubmitting}
              aria-describedby="submit-description"
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </Button>
            
            <div id="submit-description" className="sr-only">
              Submit your contact form to send your message to our team.
            </div>

            <p className="text-xs text-muted-foreground text-center">
              By submitting this form, you agree to our{" "}
              <button 
                type="button" 
                className="underline hover:no-underline focus:outline-2 focus:outline-offset-2 focus:outline-secondary transition-all duration-200 hover:text-primary"
                onClick={() => toast.info("Privacy policy page would open here")}
              >
                privacy policy
              </button>{" "}
              and{" "}
              <button 
                type="button" 
                className="underline hover:no-underline focus:outline-2 focus:outline-offset-2 focus:outline-secondary transition-all duration-200 hover:text-primary"
                onClick={() => toast.info("Terms of service page would open here")}
              >
                terms of service
              </button>.
            </p>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}