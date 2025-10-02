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
    <header className="sticky top-0 z-50 w-full border-b bg-background/90 backdrop-blur-xl supports-[backdrop-filter]:bg-background/70 shadow-lg">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-3 cursor-pointer group" onClick={() => onNavigate("home")}>
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary group-hover:scale-105 group-hover:shadow-lg transition-all duration-300 shadow-md">
            <Home className="h-6 w-6 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold text-primary">
            Rowlly Properties
          </span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-2">
          {/* Home Button */}
          <button
            onClick={() => onNavigate("home")}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all duration-300 hover:scale-105 ${
              currentPage === "home" 
                ? "text-primary bg-primary/10 shadow-md font-semibold border border-primary/20" 
                : "text-muted-foreground hover:text-primary hover:bg-accent/50 hover:shadow-sm"
            }`}
          >
            <Home className="h-4 w-4" />
            <span>Home</span>
          </button>
          
          {/* House Hunt Dropdown */}
          <div className="relative">
            <button
              onClick={() => onNavigate("search")}
              onMouseEnter={() => setIsHouseHuntOpen(true)}
              onMouseLeave={() => setIsHouseHuntOpen(false)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all duration-300 hover:scale-105 ${
                currentPage === "search" 
                  ? "text-primary bg-primary/10 shadow-md font-semibold border border-primary/20" 
                  : "text-muted-foreground hover:text-primary hover:bg-accent/50 hover:shadow-sm"
              }`}
            >
              <Home className="h-4 w-4" />
              <span>House Hunt</span>
              <ChevronDown className="h-3 w-3" />
            </button>
            
            {isHouseHuntOpen && (
              <div 
                className="absolute top-full left-0 mt-1 w-32 bg-background border rounded-md shadow-lg z-50"
                onMouseEnter={() => setIsHouseHuntOpen(true)}
                onMouseLeave={() => setIsHouseHuntOpen(false)}
              >
                {houseHuntOptions.map((option) => (
                  <button
                    key={option.name}
                    onClick={() => {
                      onNavigate(option.href);
                      setIsHouseHuntOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-primary/10 focus:bg-primary/10 transition-colors"
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
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all duration-300 hover:scale-105 ${
                currentPage === item.href 
                  ? "text-primary bg-primary/10 shadow-md font-semibold border border-primary/20" 
                  : "text-muted-foreground hover:text-primary hover:bg-accent/50 hover:shadow-sm"
              }`}
            >
              <item.icon className="h-4 w-4" />
              <span>{item.name}</span>
            </button>
          ))}
        </nav>

        {/* Mobile Navigation */}
        <Sheet>
          <SheetTrigger className="md:hidden" asChild>
            <button className="inline-flex items-center justify-center h-10 w-10 rounded-xl hover:bg-accent hover:text-accent-foreground transition-all duration-200 hover:scale-105 shadow-sm">
              <Menu className="h-5 w-5" />
            </button>
          </SheetTrigger>
          <SheetContent side="right" className="w-80">
            <div className="flex items-center gap-3 mb-8">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary shadow-sm">
                <Home className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-lg font-bold text-primary">
                Rowlly Properties
              </span>
            </div>
            
            <nav className="flex flex-col gap-2">
              {/* Home Button */}
              <button
                onClick={() => onNavigate("home")}
                className={`flex items-center gap-3 p-4 rounded-xl transition-all duration-200 text-left ${
                  currentPage === "home"
                    ? "bg-primary text-primary-foreground shadow-md scale-[0.98]"
                    : "hover:bg-accent hover:scale-[0.98] hover:shadow-sm"
                }`}
              >
                <Home className="h-5 w-5" />
                <span className="font-medium">Home</span>
              </button>
              
              {/* House Hunt Section */}
              <div className="border-l-2 border-primary/20 pl-4 ml-4">
                <div className="text-sm font-medium text-muted-foreground mb-2">House Hunt</div>
                {houseHuntOptions.map((option) => (
                  <button
                    key={option.name}
                    onClick={() => onNavigate(option.href)}
                    className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-200 text-left w-full mb-1 ${
                      currentPage === option.href
                        ? "bg-primary text-primary-foreground shadow-md scale-[0.98]"
                        : "hover:bg-accent hover:scale-[0.98] hover:shadow-sm"
                    }`}
                  >
                    <Home className="h-4 w-4" />
                    <span className="font-medium">{option.name}</span>
                  </button>
                ))}
              </div>
              
              {/* Remaining Navigation Items */}
              {navigation.slice(1).map((item) => (
                <button
                  key={item.href}
                  onClick={() => onNavigate(item.href)}
                  className={`flex items-center gap-3 p-4 rounded-xl transition-all duration-200 text-left ${
                    currentPage === item.href
                      ? "bg-primary text-primary-foreground shadow-md scale-[0.98]"
                      : "hover:bg-accent hover:scale-[0.98] hover:shadow-sm"
                  }`}
                >
                  <item.icon className="h-5 w-5" />
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
