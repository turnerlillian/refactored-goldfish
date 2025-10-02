import { Mail, Phone, MapPin, Clock, Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { ContactForm } from "../ContactForm";

export function ContactPage() {
  return (
    <div className="container py-12">
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h1>Get in Touch</h1>
        <p className="text-lg text-muted-foreground mt-4">
          Have questions? We're here to help. Reach out to us and we'll get back to you as soon as possible.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {/* Contact Information */}
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardContent className="p-6 space-y-6">
              <div>
                <h3 className="mb-4">Contact Information</h3>
                
                <div className="space-y-4">
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
              </div>

              <div className="pt-6 border-t">
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

          {/* Newsletter Signup */}
          <Card>
            <CardContent className="p-6">
              <h3 className="mb-2">Stay Updated</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Subscribe to our newsletter for the latest property listings and market insights.
              </p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex h-10 w-full rounded-md border border-input bg-input-background px-3 py-2 text-sm"
                />
                <button className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground hover:bg-primary/90 transition-colors whitespace-nowrap">
                  Subscribe
                </button>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Integration with email marketing platforms (Mailchimp, SendGrid, etc.)
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-2">
          <ContactForm
            title="Send us a Message"
            description="Fill out the form below and we'll get back to you within 24 hours."
          />
        </div>
      </div>

      {/* Map Placeholder */}
      <div className="max-w-6xl mx-auto mt-12">
        <Card>
          <CardContent className="p-0">
            <div className="aspect-[21/9] bg-muted rounded-lg flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <MapPin className="h-12 w-12 mx-auto mb-3" />
                <p>Interactive Map</p>
                <p className="text-sm mt-1">Google Maps integration would display our office location</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
