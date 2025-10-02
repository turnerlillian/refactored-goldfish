import { Mail, Phone, MapPin, Clock, Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { Input } from "../ui/input";
import { ContactForm } from "../ContactForm";
import { useEffect } from "react";
import { updatePageSEO, seoConfigs } from "../../utils/seo";

export function ContactPage() {
  // SEO Optimization
  useEffect(() => {
    updatePageSEO(seoConfigs.contact);
  }, []);
  return (
    <div className="container py-12">
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h1>Ready to Get Started?</h1>
        <p className="text-lg text-muted-foreground mt-4">
          Schedule your complimentary consultation today. Our licensed real estate professionals are standing by 
          to provide expert guidance and personalized solutions for all your property needs.
        </p>
        <div className="flex flex-wrap justify-center items-center gap-6 mt-6 text-sm text-muted-foreground">
          <span>✓ Licensed & Bonded</span>
          <span>✓ Free Consultation</span>
          <span>✓ Same-Day Response</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {/* Contact Information */}
        <div className="lg:col-span-1 space-y-6 flex flex-col">
          <Card className="bg-muted/30 flex-1">
            <CardContent className="p-8 h-full flex flex-col">
              <h3 className="mb-6">Contact Information</h3>
                
                <div className="space-y-4 flex-1">
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 flex-shrink-0">
                      <Phone className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Phone</p>
                      <a href="tel:5550000000" className="hover:text-primary transition-colors">
                        (555) 000-0000
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 flex-shrink-0">
                      <Mail className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Email</p>
                      <a href="mailto:info@rowlly.com" className="hover:text-primary transition-colors">
                        info@rowlly.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 flex-shrink-0">
                      <MapPin className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Address</p>
                      <p>123 Real Estate Ave<br />Suite 100<br />Los Angeles, CA 90001</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 flex-shrink-0">
                      <Clock className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Office Hours</p>
                      <p>Monday - Friday<br />9:00 AM - 6:00 PM<br />Saturday: 10:00 AM - 4:00 PM</p>
                    </div>
                  </div>
                </div>
              
              <div className="pt-6 border-t mt-auto">
                <h4 className="mb-4">Follow Us</h4>
                <div className="flex gap-3">
                  <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-colors">
                    <Facebook className="h-5 w-5" />
                  </a>
                  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-colors">
                    <Instagram className="h-5 w-5" />
                  </a>
                  <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-colors">
                    <Linkedin className="h-5 w-5" />
                  </a>
                  <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-colors">
                    <Twitter className="h-5 w-5" />
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-2 flex">
          <div className="w-full">
            <ContactForm
              title="Send us a Message"
              description="Fill out the form below and we'll get back to you within 24 hours."
            />
          </div>
        </div>
      </div>

      {/* Map Placeholder */}
      <div className="max-w-6xl mx-auto mt-12">
        <Card className="overflow-hidden p-0 gap-0">
          <div className="aspect-[21/9] bg-muted flex items-center justify-center">
            <div className="text-center text-muted-foreground">
              <MapPin className="h-12 w-12 mx-auto mb-3" />
              <p>Interactive Map</p>
              <p className="text-sm mt-1">Google Maps integration would display our office location</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Newsletter Signup */}
      <div className="max-w-2xl mx-auto mt-8">
        <Card className="bg-muted/30">
          <CardContent className="p-8">
            <h3 className="mb-4 text-center">Stay Updated</h3>
            <p className="text-muted-foreground mb-6 text-center">
              Subscribe to our newsletter for the latest property listings and market insights.
            </p>
            <div className="flex gap-2 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Your email"
                className="flex-1"
              />
              <button className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground hover:bg-primary/90 transition-colors whitespace-nowrap">
                Subscribe
              </button>
            </div>
            <p className="text-xs text-muted-foreground mt-2 text-center">
              Integration with email marketing platforms (Mailchimp, SendGrid, etc.)
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
