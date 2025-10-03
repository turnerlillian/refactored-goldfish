import { KeyRound, Key, Home, Users, Phone, Menu, BookOpen, ChevronDown, HelpCircle, Heart } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { useState } from "react";

interface HeaderProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export function Header({ currentPage, onNavigate }: HeaderProps) {
  const [isSearchHomesOpen, setIsSearchHomesOpen] = useState(false);
  
  const navigation = [
    { name: "Home", href: "home", icon: Home },
    { name: "Blog", href: "blog", icon: BookOpen },
    { name: "About Rowlly", href: "agents", icon: Users },
    { name: "Help", href: "help", icon: HelpCircle },
    { name: "Contact", href: "contact", icon: Phone },
  ];

  const searchHomesOptions = [
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
            <KeyRound className="h-6 w-6 text-primary-foreground" aria-hidden="true" />
          </div>
          <div className="flex flex-col items-start">
            <span className="text-xl font-bold text-primary font-display text-left">
              Rowlly Properties
            </span>
            <span className="text-xs text-muted-foreground font-medium tracking-wide text-left">
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
              onMouseEnter={() => setIsSearchHomesOpen(true)}
              onMouseLeave={() => setIsSearchHomesOpen(false)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  setIsSearchHomesOpen(!isSearchHomesOpen);
                }
                if (e.key === 'Escape') {
                  setIsSearchHomesOpen(false);
                }
              }}
              aria-expanded={isSearchHomesOpen}
              aria-haspopup="menu"
              aria-current={currentPage === "search" ? "page" : undefined}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all duration-200 btn-press focus:outline-2 focus:outline-offset-2 focus:outline-secondary border-2 hover:scale-[1.02] ${
                currentPage === "search"
                  ? "text-primary bg-primary/15 shadow-md font-semibold border-primary/30 hover:bg-primary/20"
                  : "text-muted-foreground hover:text-primary hover:bg-accent/70 hover:shadow-md border-transparent hover:border-accent/50"
              }`}
            >
              <Key className="h-4 w-4" aria-hidden="true" />
              <span>Search Homes</span>
              <ChevronDown className="h-3 w-3" aria-hidden="true" />
            </button>
            
            {isSearchHomesOpen && (
              <div 
                className={`absolute top-full left-0 mt-1 w-full bg-background border rounded-md shadow-lg z-50 dropdown-enter dropdown-enter-active`}
                role="menu"
                aria-label="Search homes options"
                onMouseEnter={() => setIsSearchHomesOpen(true)}
                onMouseLeave={() => setIsSearchHomesOpen(false)}
              >
                {searchHomesOptions.map((option, index) => (
                  <button
                    key={option.name}
                    role="menuitem"
                    onClick={() => {
                      onNavigate(option.href);
                      setIsSearchHomesOpen(false);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Escape') {
                        setIsSearchHomesOpen(false);
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
          <SheetContent side="right" className="w-80 flex flex-col animate-in slide-in-from-right duration-300">
            <div className="flex items-center gap-3 mb-4 px-4 pt-6 flex-shrink-0 animate-in fade-in-50 slide-in-from-top-2 duration-500 delay-100">
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
            
            <nav className="flex flex-col gap-2 px-4 pb-6 flex-1 overflow-y-auto animate-in fade-in-50 slide-in-from-bottom-4 duration-700 delay-200" role="navigation" aria-label="Mobile navigation">
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
              
              {/* Search Homes Section */}
              <button
                onClick={() => onNavigate("search")}
                aria-current={currentPage === "search" ? "page" : undefined}
                className={`flex items-center gap-3 p-4 rounded-xl transition-all duration-200 text-left focus:outline-2 focus:outline-offset-2 focus:outline-secondary btn-press fade-in-stagger ${
                  currentPage === "search"
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "hover:bg-accent hover:shadow-sm"
                }`}
              >
                <Key className="h-5 w-5" aria-hidden="true" />
                <span className="font-medium">Search Homes</span>
              </button>
              
              {/* Quick Actions */}
              <div className="ml-8 space-y-1 fade-in-stagger">
                {searchHomesOptions.map((option, index) => (
                  <button
                    key={option.name}
                    onClick={() => onNavigate(option.href)}
                    className="flex items-center gap-3 p-3 rounded-xl transition-all duration-200 text-left w-full focus:outline-2 focus:outline-offset-2 focus:outline-secondary btn-press text-muted-foreground hover:text-foreground hover:bg-accent hover:shadow-sm"
                    style={{ animationDelay: `${(index + 2) * 100}ms` }}
                  >
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
