import { ChevronRight, Home } from "lucide-react";
import { cn } from "../../lib/utils";

export interface BreadcrumbItem {
  label: string;
  href?: string;
  onClick?: () => void;
  isActive?: boolean;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
  separator?: React.ReactNode;
  showHome?: boolean;
  onNavigate?: (page: string, params?: any) => void;
}

export function Breadcrumbs({ 
  items, 
  className, 
  separator = <ChevronRight className="h-4 w-4 text-muted-foreground" />,
  showHome = true,
  onNavigate 
}: BreadcrumbsProps) {
  const breadcrumbItems = showHome 
    ? [{ label: "Home", onClick: () => onNavigate?.("home") }, ...items]
    : items;

  return (
    <nav 
      aria-label="Breadcrumb" 
      className={cn("flex items-center space-x-0.5 md:space-x-1 text-xs md:text-sm text-muted-foreground px-2 md:px-0", className)}
    >
      <ol className="flex items-center space-x-0.5 md:space-x-1" role="list">
        {breadcrumbItems.map((item, index) => {
          const isLast = index === breadcrumbItems.length - 1;
          const isHome = (showHome && index === 0) || (item.label === "Home" && index === 0);

          return (
            <li key={index} className="flex items-center">
              {index > 0 && (
                <span className="mx-1 md:mx-2" aria-hidden="true">
                  <ChevronRight className="h-3 w-3 md:h-4 md:w-4 text-muted-foreground" />
                </span>
              )}
              
              {item.onClick && !isLast ? (
                <button
                  onClick={item.onClick}
                  className={cn(
                    "hover:text-foreground transition-colors rounded px-0.5 md:px-1 py-0.5 hover:bg-accent/50 text-xs md:text-sm",
                    isHome && "flex items-center gap-0.5 md:gap-1"
                  )}
                  aria-label={isHome ? "Go to home page" : `Go to ${item.label}`}
                >
                  {isHome && <Home className="h-3 w-3 md:h-3 md:w-3" />}
                  {item.label}
                </button>
              ) : (
                <span 
                  className={cn(
                    isLast ? "text-foreground font-medium" : "text-muted-foreground",
                    isHome && "flex items-center gap-0.5 md:gap-1",
                    "text-xs md:text-sm"
                  )}
                  aria-current={isLast ? "page" : undefined}
                >
                  {isHome && <Home className="h-3 w-3 md:h-3 md:w-3" />}
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}