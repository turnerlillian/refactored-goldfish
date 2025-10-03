import { Home, Mail, Phone, Facebook, Instagram, Linkedin, Twitter } from "lucide-react";

interface FooterProps {
  onNavigate?: (page: string) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="border-t bg-muted/50 mt-auto relative overflow-hidden" role="contentinfo">
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" aria-hidden="true" />
      <div className="container py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary shadow-lg">
                <Home className="h-6 w-6 text-primary-foreground" aria-hidden="true" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold text-primary font-display">Rowlly Properties</span>
                <span className="text-xs text-muted-foreground font-medium tracking-wide">
                  LICENSED REAL ESTATE BROKERAGE
                </span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Award-winning real estate professionals serving clients with integrity and expertise since 2009. 
              Licensed, bonded, and committed to exceptional results.
            </p>
            <nav aria-label="Social media links">
              <ul className="flex gap-3" role="list">
                <li>
                  <a 
                    href="https://facebook.com" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    aria-label="Follow us on Facebook"
                    className="group focus:outline-2 focus:outline-offset-2 focus:outline-secondary rounded-lg"
                  >
                    <div className="w-10 h-10 rounded-lg bg-background/80 backdrop-blur-sm border border-background/20 flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-300 hover:scale-110 shadow-sm">
                      <Facebook className="h-4 w-4" aria-hidden="true" />
                    </div>
                  </a>
                </li>
                <li>
                  <a 
                    href="https://instagram.com" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    aria-label="Follow us on Instagram"
                    className="group focus:outline-2 focus:outline-offset-2 focus:outline-secondary rounded-lg"
                  >
                    <div className="w-10 h-10 rounded-lg bg-background/80 backdrop-blur-sm border border-background/20 flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-300 hover:scale-110 shadow-sm">
                      <Instagram className="h-4 w-4" aria-hidden="true" />
                    </div>
                  </a>
                </li>
                <li>
                  <a 
                    href="https://linkedin.com" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    aria-label="Connect with us on LinkedIn"
                    className="group focus:outline-2 focus:outline-offset-2 focus:outline-secondary rounded-lg"
                  >
                    <div className="w-10 h-10 rounded-lg bg-background/80 backdrop-blur-sm border border-background/20 flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-300 hover:scale-110 shadow-sm">
                      <Linkedin className="h-4 w-4" aria-hidden="true" />
                    </div>
                  </a>
                </li>
                <li>
                  <a 
                    href="https://twitter.com" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    aria-label="Follow us on Twitter"
                    className="group focus:outline-2 focus:outline-offset-2 focus:outline-secondary rounded-lg"
                  >
                    <div className="w-10 h-10 rounded-lg bg-background/80 backdrop-blur-sm border border-background/20 flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-300 hover:scale-110 shadow-sm">
                      <Twitter className="h-4 w-4" aria-hidden="true" />
                    </div>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-4 text-primary font-semibold">Quick Links</h4>
            <nav aria-label="Quick navigation links">
              <ul className="space-y-2 text-sm text-muted-foreground" role="list">
                <li>
                  <button 
                    onClick={() => onNavigate?.("agents")} 
                    className="hover:text-primary transition-colors focus:outline-2 focus:outline-offset-2 focus:outline-secondary rounded"
                    aria-label="Learn about our team and company"
                  >
                    About Us
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => onNavigate?.("search")} 
                    className="hover:text-primary transition-colors focus:outline-2 focus:outline-offset-2 focus:outline-secondary rounded"
                    aria-label="Browse available properties"
                  >
                    Properties
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => onNavigate?.("agents")} 
                    className="hover:text-primary transition-colors focus:outline-2 focus:outline-offset-2 focus:outline-secondary rounded"
                    aria-label="Meet our real estate agents"
                  >
                    Agents
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => onNavigate?.("blog")} 
                    className="hover:text-primary transition-colors focus:outline-2 focus:outline-offset-2 focus:outline-secondary rounded"
                    aria-label="Read our real estate blog"
                  >
                    Blog
                  </button>
                </li>
              </ul>
            </nav>
          </div>

          {/* Services */}
          <div>
            <h4 className="mb-4 text-primary font-semibold">Services</h4>
            <nav aria-label="Our services">
              <ul className="space-y-2 text-sm text-muted-foreground" role="list">
                <li>
                  <button 
                    onClick={() => onNavigate?.("search")} 
                    className="hover:text-primary transition-colors focus:outline-2 focus:outline-offset-2 focus:outline-secondary rounded"
                    aria-label="Find homes for purchase"
                  >
                    Buy a Home
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => onNavigate?.("contact")} 
                    className="hover:text-primary transition-colors focus:outline-2 focus:outline-offset-2 focus:outline-secondary rounded"
                    aria-label="Get help selling your property"
                  >
                    Sell Your Home
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => onNavigate?.("search")} 
                    className="hover:text-primary transition-colors focus:outline-2 focus:outline-offset-2 focus:outline-secondary rounded"
                    aria-label="Find rental properties"
                  >
                    Rent a Property
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => onNavigate?.("contact")} 
                    className="hover:text-primary transition-colors focus:outline-2 focus:outline-offset-2 focus:outline-secondary rounded"
                    aria-label="Learn about property management services"
                  >
                    Property Management
                  </button>
                </li>
              </ul>
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-4 text-primary font-semibold">Contact Us</h4>
            <address className="not-italic">
              <ul className="space-y-3 text-sm text-muted-foreground" role="list">
                <li className="flex items-start gap-2">
                  <Phone className="h-4 w-4 mt-0.5 flex-shrink-0 text-primary" aria-hidden="true" />
                  <a 
                    href="tel:+15550000000" 
                    className="hover:text-primary transition-colors focus:outline-2 focus:outline-offset-2 focus:outline-secondary rounded"
                    aria-label="Call us at (555) 000-0000"
                  >
                    (555) 000-0000
                  </a>
                </li>
                <li className="flex items-start gap-2">
                  <Mail className="h-4 w-4 mt-0.5 flex-shrink-0 text-primary" aria-hidden="true" />
                  <a 
                    href="mailto:info@rowlly.com" 
                    className="hover:text-primary transition-colors focus:outline-2 focus:outline-offset-2 focus:outline-secondary rounded"
                    aria-label="Email us at info@rowlly.com"
                  >
                    info@rowlly.com
                  </a>
                </li>
                <li className="flex items-start gap-2">
                  <Home className="h-4 w-4 mt-0.5 flex-shrink-0 text-primary" aria-hidden="true" />
                  <span>
                    123 Real Estate Ave, Suite 100<br />
                    Los Angeles, CA 90001
                  </span>
                </li>
              </ul>
            </address>
          </div>
        </div>

                <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">\n          <p>&copy; {new Date().getFullYear()} Rowlly Properties. All rights reserved.</p>\n        </div>\n      </div>\n    </footer>\n  );\n}
      </div>
    </footer>
  );
}
