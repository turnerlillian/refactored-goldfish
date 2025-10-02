export interface Property {
  id: string;
  title: string;
  price: number;
  address: string;
  city: string;
  state: string;
  zip: string;
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  lotSize: string;
  yearBuilt: number;
  propertyType: string;
  status: string;
  images: string[];
  description: string;
  features: string[];
  agentId: string;
  neighborhood: {
    rating: number;
    schools: { name: string; rating: number }[];
    walkScore: number;
    transitScore: number;
  };
  financial: {
    taxHistory: { year: number; amount: number }[];
    hoa: number;
    pricePerSqft: number;
  };
  featured?: boolean;
}

export interface Agent {
  id: string;
  name: string;
  title: string;
  image: string;
  phone: string;
  email: string;
  bio: string;
  experience: number;
  specialties: string[];
  languages: string[];
  sales: number;
  rating: number;
  reviews: number;
  social: {
    facebook?: string;
    instagram?: string;
    linkedin?: string;
    twitter?: string;
  };
}

export const agents: Agent[] = [
  {
    id: "1",
    name: "Sarah Mitchell",
    title: "Senior Real Estate Advisor",
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHdvbWFuJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzU5MzQ4MjI1fDA&ixlib=rb-4.1.0&q=80&w=1080",
    phone: "(555) 123-4567",
    email: "sarah.mitchell@rowlly.com",
    bio: "With over 15 years of experience in luxury real estate, Sarah has helped hundreds of families find their dream homes. Her dedication to client satisfaction and deep market knowledge make her a trusted advisor in the industry.",
    experience: 15,
    specialties: ["Luxury Homes", "Waterfront Properties", "Investment Properties"],
    languages: ["English", "Spanish"],
    sales: 247,
    rating: 4.9,
    reviews: 128,
    social: {
      facebook: "https://facebook.com",
      instagram: "https://instagram.com",
      linkedin: "https://linkedin.com",
    },
  },
  {
    id: "2",
    name: "Michael Chen",
    title: "Real Estate Professional",
    image: "https://images.unsplash.com/photo-1652878530627-cc6f063e3947?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjByZWFsJTIwZXN0YXRlJTIwYWdlbnR8ZW58MXx8fHwxNzU5MjY2MzU2fDA&ixlib=rb-4.1.0&q=80&w=1080",
    phone: "(555) 234-5678",
    email: "michael.chen@rowlly.com",
    bio: "Michael specializes in helping first-time homebuyers navigate the complex real estate market. His patient approach and comprehensive market analysis ensure clients make informed decisions.",
    experience: 8,
    specialties: ["First-Time Buyers", "Condos", "Downtown Living"],
    languages: ["English", "Mandarin"],
    sales: 156,
    rating: 4.8,
    reviews: 94,
    social: {
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com",
    },
  },
  {
    id: "3",
    name: "Emily Rodriguez",
    title: "Luxury Property Specialist",
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHdvbWFuJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzU5MzQ4MjI1fDA&ixlib=rb-4.1.0&q=80&w=1080",
    phone: "(555) 345-6789",
    email: "emily.rodriguez@rowlly.com",
    bio: "Emily's expertise in luxury properties and her extensive network in high-end real estate make her the go-to agent for discerning clients seeking exceptional homes.",
    experience: 12,
    specialties: ["Luxury Estates", "New Construction", "Relocation"],
    languages: ["English", "French"],
    sales: 198,
    rating: 5.0,
    reviews: 76,
    social: {
      facebook: "https://facebook.com",
      instagram: "https://instagram.com",
    },
  },
];

export const properties: Property[] = [
  {
    id: "1",
    title: "Modern Luxury Estate",
    price: 2450000,
    address: "1234 Ocean View Drive",
    city: "Malibu",
    state: "CA",
    zip: "90265",
    bedrooms: 5,
    bathrooms: 4.5,
    sqft: 4850,
    lotSize: "0.75 acres",
    yearBuilt: 2021,
    propertyType: "Single Family Home",
    status: "For Sale",
    images: [
      "https://images.unsplash.com/photo-1706808849780-7a04fbac83ef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBsdXh1cnklMjBob3VzZSUyMGV4dGVyaW9yfGVufDF8fHx8MTc1OTMxNDMyMnww&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1659720879195-d5a108231648?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb250ZW1wb3JhcnklMjBob21lJTIwaW50ZXJpb3J8ZW58MXx8fHwxNzU5MzY1MjM3fDA&ixlib=rb-4.1.0&q=80&w=1080",
    ],
    description: "Stunning contemporary masterpiece with breathtaking ocean views. This architectural gem features floor-to-ceiling windows, an open-concept layout, and high-end finishes throughout. The gourmet kitchen boasts custom cabinetry and top-of-the-line appliances. Outdoor living space includes an infinity pool, spa, and multiple entertainment areas perfect for California living.",
    features: [
      "Ocean Views",
      "Infinity Pool & Spa",
      "Smart Home Technology",
      "Gourmet Kitchen",
      "Home Theater",
      "Wine Cellar",
      "3-Car Garage",
      "Solar Panels",
    ],
    agentId: "1",
    neighborhood: {
      rating: 4.8,
      schools: [
        { name: "Malibu Elementary", rating: 9 },
        { name: "Malibu High School", rating: 8 },
      ],
      walkScore: 45,
      transitScore: 32,
    },
    financial: {
      taxHistory: [
        { year: 2024, amount: 28500 },
        { year: 2023, amount: 27800 },
      ],
      hoa: 0,
      pricePerSqft: 505,
    },
    featured: true,
  },
  {
    id: "2",
    title: "Beachfront Paradise",
    price: 3750000,
    address: "5678 Coastal Highway",
    city: "Miami Beach",
    state: "FL",
    zip: "33139",
    bedrooms: 4,
    bathrooms: 3.5,
    sqft: 3200,
    lotSize: "0.5 acres",
    yearBuilt: 2020,
    propertyType: "Single Family Home",
    status: "For Sale",
    images: [
      "https://images.unsplash.com/photo-1757361652977-218a1173e8d6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWFjaCUyMGhvdXNlJTIwcHJvcGVydHl8ZW58MXx8fHwxNzU5MzY1MjM3fDA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1706808849780-7a04fbac83ef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBsdXh1cnklMjBob3VzZSUyMGV4dGVyaW9yfGVufDF8fHx8MTc1OTMxNDMyMnww&ixlib=rb-4.1.0&q=80&w=1080",
    ],
    description: "Rare beachfront property with direct ocean access. This tropical oasis features a resort-style pool, outdoor kitchen, and expansive deck perfect for entertaining. Interior highlights include vaulted ceilings, marble floors, and a master suite with private balcony overlooking the Atlantic.",
    features: [
      "Direct Beach Access",
      "Resort-Style Pool",
      "Outdoor Kitchen",
      "Hurricane Impact Windows",
      "Marble Floors",
      "Master Balcony",
      "2-Car Garage",
      "Security System",
    ],
    agentId: "3",
    neighborhood: {
      rating: 4.6,
      schools: [
        { name: "Miami Beach Elementary", rating: 7 },
        { name: "South Beach High", rating: 6 },
      ],
      walkScore: 78,
      transitScore: 65,
    },
    financial: {
      taxHistory: [
        { year: 2024, amount: 42300 },
        { year: 2023, amount: 41000 },
      ],
      hoa: 450,
      pricePerSqft: 1172,
    },
    featured: true,
  },
  {
    id: "3",
    title: "Downtown Luxury Condo",
    price: 875000,
    address: "890 Metropolitan Avenue, Unit 2401",
    city: "Seattle",
    state: "WA",
    zip: "98101",
    bedrooms: 2,
    bathrooms: 2,
    sqft: 1450,
    lotSize: "N/A",
    yearBuilt: 2022,
    propertyType: "Condo",
    status: "For Sale",
    images: [
      "https://images.unsplash.com/photo-1673165432945-a62c1a82d3ff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkb3dudG93biUyMGFwYXJ0bWVudCUyMGJ1aWxkaW5nfGVufDF8fHx8MTc1OTM2NTIzN3ww&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1659720879195-d5a108231648?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb250ZW1wb3JhcnklMjBob21lJTIwaW50ZXJpb3J8ZW58MXx8fHwxNzU5MzY1MjM3fDA&ixlib=rb-4.1.0&q=80&w=1080",
    ],
    description: "Sophisticated high-rise living in the heart of downtown Seattle. This corner unit offers panoramic city and water views, floor-to-ceiling windows, and premium finishes. Building amenities include 24/7 concierge, fitness center, rooftop terrace, and resident lounge.",
    features: [
      "City & Water Views",
      "Floor-to-Ceiling Windows",
      "24/7 Concierge",
      "Fitness Center",
      "Rooftop Terrace",
      "In-Unit Laundry",
      "1 Parking Space",
      "Storage Unit",
    ],
    agentId: "2",
    neighborhood: {
      rating: 4.7,
      schools: [
        { name: "Downtown Elementary", rating: 8 },
        { name: "Central High School", rating: 7 },
      ],
      walkScore: 98,
      transitScore: 95,
    },
    financial: {
      taxHistory: [
        { year: 2024, amount: 8750 },
        { year: 2023, amount: 8500 },
      ],
      hoa: 650,
      pricePerSqft: 603,
    },
    featured: true,
  },
  {
    id: "4",
    title: "Charming Suburban Home",
    price: 625000,
    address: "456 Maple Street",
    city: "Portland",
    state: "OR",
    zip: "97201",
    bedrooms: 4,
    bathrooms: 2.5,
    sqft: 2400,
    lotSize: "0.25 acres",
    yearBuilt: 2015,
    propertyType: "Single Family Home",
    status: "For Sale",
    images: [
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdWJ1cmJhbiUyMGZhbWlseSUyMGhvbWV8ZW58MXx8fHwxNzU5MzUwOTU0fDA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1659720879195-d5a108231648?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb250ZW1wb3JhcnklMjBob21lJTIwaW50ZXJpb3J8ZW58MXx8fHwxNzU5MzY1MjM3fDA&ixlib=rb-4.1.0&q=80&w=1080",
    ],
    description: "Perfect family home in a quiet, tree-lined neighborhood. Features include a spacious open floor plan, updated kitchen with granite countertops, hardwood floors, and a large backyard perfect for children and pets. Close to top-rated schools and parks.",
    features: [
      "Updated Kitchen",
      "Hardwood Floors",
      "Large Backyard",
      "Master Suite",
      "Finished Basement",
      "Energy Efficient",
      "2-Car Garage",
      "Close to Schools",
    ],
    agentId: "2",
    neighborhood: {
      rating: 4.9,
      schools: [
        { name: "Maple Elementary", rating: 10 },
        { name: "Portland High School", rating: 9 },
      ],
      walkScore: 72,
      transitScore: 58,
    },
    financial: {
      taxHistory: [
        { year: 2024, amount: 6875 },
        { year: 2023, amount: 6625 },
      ],
      hoa: 0,
      pricePerSqft: 260,
    },
    featured: false,
  },
  {
    id: "5",
    title: "Contemporary Urban Loft",
    price: 1250000,
    address: "2100 Industrial Blvd, Loft 5C",
    city: "Austin",
    state: "TX",
    zip: "78701",
    bedrooms: 3,
    bathrooms: 2.5,
    sqft: 2100,
    lotSize: "N/A",
    propertyType: "Loft",
    status: "For Sale",
    images: [
      "https://images.unsplash.com/photo-1659720879195-d5a108231648?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb250ZW1wb3JhcnklMjBob21lJTIwaW50ZXJpb3J8ZW58MXx8fHwxNzU5MzY1MjM3fDA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1706808849780-7a04fbac83ef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBsdXh1cnklMjBob3VzZSUyMGV4dGVyaW9yfGVufDF8fHx8MTc1OTMxNDMyMnww&ixlib=rb-4.1.0&q=80&w=1080",
    ],
    description: "Industrial-chic loft in a converted warehouse with soaring ceilings and exposed brick. Modern amenities meet historic charm in this unique urban space. Features include polished concrete floors, a chef's kitchen, and private rooftop access.",
    features: [
      "Exposed Brick",
      "High Ceilings",
      "Chef's Kitchen",
      "Rooftop Access",
      "Concrete Floors",
      "Original Windows",
      "Secure Building",
      "Pet Friendly",
    ],
    agentId: "1",
    neighborhood: {
      rating: 4.5,
      schools: [
        { name: "Downtown Austin Elementary", rating: 7 },
        { name: "Austin High School", rating: 8 },
      ],
      walkScore: 92,
      transitScore: 78,
    },
    financial: {
      taxHistory: [
        { year: 2024, amount: 15000 },
        { year: 2023, amount: 14500 },
      ],
      hoa: 350,
      pricePerSqft: 595,
    },
    featured: false,
  },
  {
    id: "6",
    title: "Mountain View Retreat",
    price: 1850000,
    address: "7890 Summit Ridge",
    city: "Aspen",
    state: "CO",
    zip: "81611",
    bedrooms: 5,
    bathrooms: 4,
    sqft: 4200,
    lotSize: "1.2 acres",
    yearBuilt: 2018,
    propertyType: "Single Family Home",
    status: "For Sale",
    images: [
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdWJ1cmJhbiUyMGZhbWlseSUyMGhvbWV8ZW58MXx8fHwxNzU5MzUwOTU0fDA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1706808849780-7a04fbac83ef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBsdXh1cnklMjBob3VzZSUyMGV4dGVyaW9yfGVufDF8fHx8MTc1OTMxNDMyMnww&ixlib=rb-4.1.0&q=80&w=1080",
    ],
    description: "Luxurious mountain retreat with stunning views of the Rockies. Custom-built home featuring timber framing, stone fireplaces, and expansive decks. Perfect for year-round living with ski-in/ski-out access and heated floors throughout.",
    features: [
      "Mountain Views",
      "Ski-In/Ski-Out",
      "Stone Fireplaces",
      "Heated Floors",
      "Wine Room",
      "Hot Tub",
      "3-Car Garage",
      "Guest Suite",
    ],
    agentId: "3",
    neighborhood: {
      rating: 4.8,
      schools: [
        { name: "Aspen Elementary", rating: 9 },
        { name: "Aspen High School", rating: 9 },
      ],
      walkScore: 35,
      transitScore: 28,
    },
    financial: {
      taxHistory: [
        { year: 2024, amount: 22200 },
        { year: 2023, amount: 21500 },
      ],
      hoa: 250,
      pricePerSqft: 440,
    },
    featured: false,
  },
];
