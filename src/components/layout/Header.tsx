import { Home, Users, Phone, Menu, BookOpen, ChevronDown } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { useState } from "react";

interface HeaderProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export function Header({ currentPage, onNavigate }: HeaderProps) {
  const [isHouseHuntOpen, setIsHouseHuntOpen] = useState(false);
  
  const navigation = [
    { name: "Home", href: "home", icon: Home },
    { name: "Blog", href: "blog", icon: BookOpen },
    { name: "About Rowlly", href: "agents", icon: Users },
    { name: "Contact", href: "contact", icon: Phone },
  ];

  const houseHuntOptions = [
    { name: "Buy", href: "search" },
    { name: "Rent", href: "search" },
    { name: "Sell", href: "contact" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/90 backdrop-blur-xl supports-[backdrop-filter]:bg-background/70 shadow-lg" role="banner">
      <div className="container flex h-16 items-center justify-between">
        <button 
          className="flex items-center gap-3 cursor-pointer group focus:outline-2 focus:outline-offset-2 focus:outline-secondary rounded-xl p-1 interactive-scale" 
          onClick={() => onNavigate("home")}
          aria-label="Rowlly Properties - Go to homepage"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary group-hover:scale-105 group-hover:shadow-lg transition-all duration-200 shadow-md">
            <Home className="h-6 w-6 text-primary-foreground" aria-hidden="true" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold text-primary font-display">
              Rowlly Properties
            </span>
            <span className="text-xs text-muted-foreground font-medium tracking-wide">
              LICENSED REAL ESTATE PROFESSIONALS
            </span>
          </div>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-2" role="navigation" aria-label="Main navigation">
          {/* Home Button */}
          <button
            onClick={() => onNavigate("home")}
            aria-current={currentPage === "home" ? "page" : undefined}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all duration-200 btn-press focus:outline-2 focus:outline-offset-2 focus:outline-secondary border-2 hover:scale-[1.02] ${
              currentPage === "home" 
                ? "text-primary bg-primary/15 shadow-md font-semibold border-primary/30 hover:bg-primary/20" 
                : "text-muted-foreground hover:text-primary hover:bg-accent/70 hover:shadow-md border-transparent hover:border-accent/50"
            }`}
          >
            <Home className="h-4 w-4" aria-hidden="true" />
            <span>Home</span>
          </button>
          
          {/* House Hunt Dropdown */}
          <div className="relative">
            <button
              onClick={() => onNavigate("search")}
              onMouseEnter={() => setIsHouseHuntOpen(true)}
              onMouseLeave={() => setIsHouseHuntOpen(false)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  setIsHouseHuntOpen(!isHouseHuntOpen);
                }
                if (e.key === 'Escape') {
                  setIsHouseHuntOpen(false);
                }
              }}
              aria-expanded={isHouseHuntOpen}
              aria-haspopup="menu"
              aria-current={currentPage === "search" ? "page" : undefined}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all duration-200 btn-press focus:outline-2 focus:outline-offset-2 focus:outline-secondary border-2 hover:scale-[1.02] ${
                currentPage === "search"
                  ? "text-primary bg-primary/15 shadow-md font-semibold border-primary/30 hover:bg-primary/20"
                  : "text-muted-foreground hover:text-primary hover:bg-accent/70 hover:shadow-md border-transparent hover:border-accent/50"
              }`}
            >
              <Home className="h-4 w-4" aria-hidden="true" />
              <span>House Hunt</span>
              <ChevronDown className="h-3 w-3" aria-hidden="true" />
            </button>
            
            {isHouseHuntOpen && (
              <div 
                className={`absolute top-full left-0 mt-1 w-32 bg-background border rounded-md shadow-lg z-50 dropdown-enter dropdown-enter-active`}
                role="menu"
                aria-label="House hunt options"
                onMouseEnter={() => setIsHouseHuntOpen(true)}
                onMouseLeave={() => setIsHouseHuntOpen(false)}
              >
                {houseHuntOptions.map((option, index) => (
                  <button
                    key={option.name}
                    role="menuitem"
                    onClick={() => {
                      onNavigate(option.href);
                      setIsHouseHuntOpen(false);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Escape') {
                        setIsHouseHuntOpen(false);
                      }
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-primary/10 focus:bg-primary/10 focus:outline-2 focus:outline-offset-2 focus:outline-secondary transition-all duration-150 btn-press"
                  >
                    {option.name}
                  </button>
                ))}
              </div>
            )}
          </div>
          
          {/* Remaining Navigation Items */}
          {navigation.slice(1).map((item) => (
            <button
              key={item.href}
              onClick={() => onNavigate(item.href)}
              aria-current={currentPage === item.href ? "page" : undefined}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all duration-200 btn-press focus:outline-2 focus:outline-offset-2 focus:outline-secondary border-2 hover:scale-[1.02] ${
                currentPage === item.href
                  ? "text-primary bg-primary/15 shadow-md font-semibold border-primary/30 hover:bg-primary/20"
                  : "text-muted-foreground hover:text-primary hover:bg-accent/70 hover:shadow-md border-transparent hover:border-accent/50"
              }`}
            >
              <item.icon className="h-4 w-4" aria-hidden="true" />
              <span>{item.name}</span>
            </button>
          ))}
        </nav>

        {/* Mobile Navigation */}
        <Sheet>
          <SheetTrigger className="md:hidden" asChild>
            <button 
              className="inline-flex items-center justify-center h-10 w-10 rounded-xl hover:bg-accent hover:text-accent-foreground transition-all duration-200 shadow-sm focus:outline-2 focus:outline-offset-2 focus:outline-secondary mobile-menu-trigger"
              aria-label="Open navigation menu"
            >
              <Menu className="h-5 w-5" aria-hidden="true" />
            </button>
          </SheetTrigger>
          <SheetContent side="right" className="w-80">
            <div className="flex items-center gap-3 mb-8 px-4 pt-6">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary shadow-sm">
                <Home className="h-5 w-5 text-primary-foreground" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold text-primary font-display">
                  Rowlly Properties
                </span>
                <span className="text-xs text-muted-foreground font-medium tracking-wide">
                  LICENSED PROFESSIONALS
                </span>
              </div>
            </div>
            
            <nav className="flex flex-col gap-2 px-4" role="navigation" aria-label="Mobile navigation">
              {/* Home Button */}
              <button
                onClick={() => onNavigate("home")}
                aria-current={currentPage === "home" ? "page" : undefined}
                className={`flex items-center gap-3 p-4 rounded-xl transition-all duration-200 text-left focus:outline-2 focus:outline-offset-2 focus:outline-secondary btn-press fade-in-stagger ${
                  currentPage === "home"
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "hover:bg-accent hover:shadow-sm"
                }`}
              >
                <Home className="h-5 w-5" aria-hidden="true" />
                <span className="font-medium">Home</span>
              </button>
              
              {/* House Hunt Section */}
              <div className="border-l-2 border-primary/20 pl-4 ml-4 fade-in-stagger">
                <h3 className="text-sm font-medium text-muted-foreground mb-2">House Hunt</h3>
                {houseHuntOptions.map((option, index) => (
                  <button
                    key={option.name}
                    onClick={() => onNavigate(option.href)}
                    aria-current={currentPage === option.href ? "page" : undefined}
                    className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-200 text-left w-full mb-1 focus:outline-2 focus:outline-offset-2 focus:outline-secondary btn-press ${
                      currentPage === option.href
                        ? "bg-primary text-primary-foreground shadow-md"
                        : "hover:bg-accent hover:shadow-sm"
                    }`}
                    style={{ animationDelay: `${(index + 2) * 100}ms` }}
                  >
                    <Home className="h-4 w-4" aria-hidden="true" />
                    <span className="font-medium">{option.name}</span>
                  </button>
                ))}
              </div>
              
              {/* Remaining Navigation Items */}
              {navigation.slice(1).map((item, index) => (
                <button
                  key={item.href}
                  onClick={() => onNavigate(item.href)}
                  aria-current={currentPage === item.href ? "page" : undefined}
                  className={`flex items-center gap-3 p-4 rounded-xl transition-all duration-200 text-left focus:outline-2 focus:outline-offset-2 focus:outline-secondary btn-press fade-in-stagger ${
                    currentPage === item.href
                      ? "bg-primary text-primary-foreground shadow-md"
                      : "hover:bg-accent hover:shadow-sm"
                  }`}
                  style={{ animationDelay: `${(index + 5) * 100}ms` }}
                >
                  <item.icon className="h-5 w-5" aria-hidden="true" />
                  <span className="font-medium">{item.name}</span>
                </button>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
