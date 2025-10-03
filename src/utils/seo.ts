// SEO utility functions and structured data schemas

export interface SEOConfig {
  title: string;
  description: string;
  keywords?: string;
  canonical?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogType?: string;
  structuredData?: any;
}

export const updatePageSEO = (config: SEOConfig) => {
  // Update document title
  document.title = config.title;

  // Update or create meta tags
  updateMetaTag('description', config.description);
  
  if (config.keywords) {
    updateMetaTag('keywords', config.keywords);
  }

  // Update Open Graph tags
  updateMetaProperty('og:title', config.ogTitle || config.title);
  updateMetaProperty('og:description', config.ogDescription || config.description);
  updateMetaProperty('og:type', config.ogType || 'website');
  
  if (config.ogImage) {
    updateMetaProperty('og:image', config.ogImage);
  }

  // Update canonical URL
  if (config.canonical) {
    updateCanonicalLink(config.canonical);
  }

  // Add structured data
  if (config.structuredData) {
    updateStructuredData(config.structuredData);
  }
};

const updateMetaTag = (name: string, content: string) => {
  let meta = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement;
  if (!meta) {
    meta = document.createElement('meta');
    meta.name = name;
    document.head.appendChild(meta);
  }
  meta.content = content;
};

const updateMetaProperty = (property: string, content: string) => {
  let meta = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement;
  if (!meta) {
    meta = document.createElement('meta');
    meta.setAttribute('property', property);
    document.head.appendChild(meta);
  }
  meta.content = content;
};

const updateCanonicalLink = (href: string) => {
  let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
  if (!link) {
    link = document.createElement('link');
    link.rel = 'canonical';
    document.head.appendChild(link);
  }
  link.href = href;
};

const updateStructuredData = (data: any) => {
  // Remove existing structured data
  const existing = document.querySelector('script[type="application/ld+json"]');
  if (existing) {
    existing.remove();
  }

  // Add new structured data
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.textContent = JSON.stringify(data);
  document.head.appendChild(script);
};

// Structured Data Schemas
export const createOrganizationSchema = () => ({
  "@context": "https://schema.org",
  "@type": "RealEstateAgent",
  "name": "Rowlly Properties",
  "description": "Award-winning real estate professionals serving clients with integrity and expertise since 2009.",
  "url": "https://rowllyproperties.com",
  "telephone": "(555) 000-0000",
  "email": "info@rowlly.com",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "123 Main Street",
    "addressLocality": "Downtown",
    "addressRegion": "State",
    "postalCode": "12345",
    "addressCountry": "US"
  },
  "areaServed": "Metropolitan Area",
  "knowsAbout": ["Residential Real Estate", "Commercial Real Estate", "Property Investment"],
  "memberOf": {
    "@type": "Organization",
    "name": "National Association of Realtors"
  }
});

export const createPropertySchema = (property: any) => ({
  "@context": "https://schema.org",
  "@type": "RealEstateListing",
  "name": property.title,
  "description": property.description,
  "url": `https://rowllyproperties.com/property/${property.id}`,
  "image": property.images,
  "price": property.price,
  "priceCurrency": "USD",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": property.address,
    "addressLocality": property.location,
    "addressRegion": property.state || "State",
    "addressCountry": "US"
  },
  "floorSize": {
    "@type": "QuantitativeValue",
    "value": property.sqft,
    "unitText": "square feet"
  },
  "numberOfRooms": property.bedrooms,
  "numberOfBathroomsTotal": property.bathrooms,
  "yearBuilt": property.yearBuilt,
  "propertyType": property.type,
  "listingAgent": {
    "@type": "RealEstateAgent",
    "name": "Rowlly Properties"
  }
});

export const createPersonSchema = (agent: any) => ({
  "@context": "https://schema.org",
  "@type": "RealEstateAgent",
  "name": agent.name,
  "jobTitle": agent.title,
  "description": agent.bio,
  "telephone": agent.phone,
  "email": agent.email,
  "image": agent.image,
  "url": `https://rowllyproperties.com/agent/${agent.id}`,
  "worksFor": {
    "@type": "Organization",
    "name": "Rowlly Properties"
  },
  "areaServed": agent.specializations || ["Residential Real Estate"],
  "knowsAbout": agent.specializations || ["Real Estate Sales", "Property Investment"]
});

export const createBreadcrumbSchema = (breadcrumbs: Array<{name: string, url: string}>) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": breadcrumbs.map((item, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "name": item.name,
    "item": item.url
  }))
});

// SEO Page Configurations
export const seoConfigs = {
  home: {
    title: "Rowlly Properties - Premier Real Estate | Luxury Homes & Expert Agents",
    description: "Find your dream home with Rowlly Properties. Award-winning real estate professionals with $50M+ in sales volume. Licensed agents, luxury listings, and personalized service.",
    keywords: "real estate, luxury homes, property search, real estate agents, home buying, home selling, property management, residential real estate",
    canonical: "https://rowllyproperties.com",
    ogType: "website",
    ogImage: "https://rowllyproperties.com/og-home.jpg"
  },
  search: {
    title: "Search Properties - Find Your Perfect Home | Rowlly Properties",
    description: "Search thousands of luxury homes and properties. Advanced filters for location, price, size, and amenities. Expert guidance from top 1% real estate agents.",
    keywords: "property search, homes for sale, real estate listings, luxury properties, home finder",
    canonical: "https://rowllyproperties.com/search"
  },
  agents: {
    title: "Expert Real Estate Agents - Top 1% Performers | Rowlly Properties",
    description: "Meet our award-winning real estate agents with proven track records. 98% client satisfaction, $50M+ in sales volume, and personalized service.",
    keywords: "real estate agents, property experts, licensed realtors, top agents, real estate professionals",
    canonical: "https://rowllyproperties.com/agents"
  },
  contact: {
    title: "Contact Us - Schedule Free Consultation | Rowlly Properties",
    description: "Get in touch with our expert real estate team. Free consultation, same-day response, and personalized guidance for all your property needs.",
    keywords: "contact real estate agent, free consultation, property inquiry, real estate contact",
    canonical: "https://rowllyproperties.com/contact"
  },
  blog: {
    title: "Real Estate Blog - Market Insights & Home Buying Tips | Rowlly Properties",
    description: "Expert real estate advice, market insights, and home buying tips from our experienced agents. Stay informed about the latest property trends.",
    keywords: "real estate blog, home buying tips, market insights, property advice, real estate news",
    canonical: "https://rowllyproperties.com/blog"
  },
  help: {
    title: "Help & FAQ - Real Estate Guide | Rowlly Properties",
    description: "Get expert guidance on buying, renting, and real estate processes. Find answers to common questions about mortgages, inspections, and more.",
    keywords: "real estate help, FAQ, home buying guide, renting guide, mortgage help, real estate questions, first time buyer",
    canonical: "https://rowllyproperties.com/help"
  }
};