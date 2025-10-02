import { Home, Mail, Phone, Facebook, Instagram, Linkedin, Twitter } from "lucide-react";

interface FooterProps {
  onNavigate?: (page: string) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="border-t bg-muted/50 mt-auto relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="container py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary shadow-lg">
                <Home className="h-6 w-6 text-primary-foreground" />
              </div>
              <span className="text-lg font-bold text-primary">Rowlly Properties</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Your trusted partner in finding the perfect home. Excellence in real estate since 2009.
            </p>
            <div className="flex gap-3">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="group">
                <div className="w-10 h-10 rounded-lg bg-white/80 backdrop-blur-sm border border-white/20 flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-300 hover:scale-110 shadow-sm">
                  <Facebook className="h-4 w-4" />
                </div>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="group">
                <div className="w-10 h-10 rounded-lg bg-white/80 backdrop-blur-sm border border-white/20 flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-300 hover:scale-110 shadow-sm">
                  <Instagram className="h-4 w-4" />
                </div>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="group">
                <div className="w-10 h-10 rounded-lg bg-white/80 backdrop-blur-sm border border-white/20 flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-300 hover:scale-110 shadow-sm">
                  <Linkedin className="h-4 w-4" />
                </div>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="group">
                <div className="w-10 h-10 rounded-lg bg-white/80 backdrop-blur-sm border border-white/20 flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-300 hover:scale-110 shadow-sm">
                  <Twitter className="h-4 w-4" />
                </div>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><button onClick={() => onNavigate?.("agents")} className="hover:text-primary transition-colors">About Us</button></li>
              <li><button onClick={() => onNavigate?.("search")} className="hover:text-primary transition-colors">Properties</button></li>
              <li><button onClick={() => onNavigate?.("agents")} className="hover:text-primary transition-colors">Agents</button></li>
              <li><button onClick={() => onNavigate?.("blog")} className="hover:text-primary transition-colors">Blog</button></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="mb-4">Services</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><button onClick={() => onNavigate?.("search")} className="hover:text-primary transition-colors">Buy a Home</button></li>
              <li><button onClick={() => onNavigate?.("contact")} className="hover:text-primary transition-colors">Sell Your Home</button></li>
              <li><button onClick={() => onNavigate?.("search")} className="hover:text-primary transition-colors">Rent a Property</button></li>
              <li><button onClick={() => onNavigate?.("contact")} className="hover:text-primary transition-colors">Property Management</button></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-4">Contact Us</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <Phone className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>(555) 000-0000</span>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>info@rowlly.com</span>
              </li>
              <li className="flex items-start gap-2">
                <Home className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>123 Real Estate Ave, Suite 100<br />Los Angeles, CA 90001</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Rowlly Properties. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
