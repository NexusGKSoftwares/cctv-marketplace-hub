
import { Product } from "@/components/ProductCard";

export const products: Product[] = [
  {
    id: 1,
    name: "HD Security Camera",
    description: "1080p HD indoor security camera with night vision and two-way audio",
    price: 199.99,
    image: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2342&q=80",
    category: "Indoor Cameras",
    rating: 4.5,
    reviewCount: 42,
    featured: true
  },
  {
    id: 2,
    name: "Outdoor Surveillance Camera",
    description: "Weatherproof 4K outdoor camera with motion detection and smartphone alerts",
    price: 299.99,
    image: "https://images.unsplash.com/photo-1585447694868-bbe503f3011f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    category: "Outdoor Cameras",
    rating: 4.8,
    reviewCount: 36,
    featured: true
  },
  {
    id: 3,
    name: "Wireless Doorbell Camera",
    description: "Smart doorbell with HD video, two-way talk, and advanced motion detection",
    price: 179.99,
    image: "https://images.unsplash.com/photo-1558000143-a78f8299c40b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    category: "Doorbell Cameras",
    rating: 4.3,
    reviewCount: 28,
    featured: true
  },
  {
    id: 4,
    name: "4-Channel NVR System",
    description: "Complete 4-channel NVR system with 1TB storage and 4 HD cameras",
    price: 549.99,
    image: "https://images.unsplash.com/photo-1563865436914-44ee14a35e4b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    category: "NVR Systems",
    rating: 4.7,
    reviewCount: 19,
    featured: false
  },
  {
    id: 5,
    name: "Pan-Tilt-Zoom Camera",
    description: "360° coverage with remote pan, tilt, and zoom functionality",
    price: 249.99,
    image: "https://images.unsplash.com/photo-1517430816045-df4b7de11d1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2341&q=80",
    category: "PTZ Cameras",
    rating: 4.6,
    reviewCount: 23,
    featured: false
  },
  {
    id: 6,
    name: "Covert Hidden Camera",
    description: "Disguised camera for discreet monitoring with HD video quality",
    price: 159.99,
    image: "https://images.unsplash.com/photo-1494368308039-ed3393aafd82?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    category: "Hidden Cameras",
    rating: 4.2,
    reviewCount: 15,
    featured: false
  },
  {
    id: 7,
    name: "1TB Surveillance Hard Drive",
    description: "Specialized hard drive designed for 24/7 recording and playback",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1544396830-7a40e36cc76b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80",
    category: "Accessories",
    rating: 4.9,
    reviewCount: 47,
    featured: false
  },
  {
    id: 8,
    name: "Power Over Ethernet Switch",
    description: "8-port PoE network switch for powering IP cameras without separate power cables",
    price: 129.99,
    image: "https://images.unsplash.com/photo-1599143286702-e0f3d1574f6a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80",
    category: "Networking",
    rating: 4.7,
    reviewCount: 31,
    featured: false
  },
  {
    id: 9,
    name: "Wireless Camera System",
    description: "Complete wireless home security system with 4 cameras and base station",
    price: 399.99,
    image: "https://images.unsplash.com/photo-1626195800533-76a1343a10c2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80",
    category: "Wireless Systems",
    rating: 4.4,
    reviewCount: 27,
    featured: false
  }
];

export const getProductById = (id: number): Product | undefined => {
  return products.find(product => product.id === id);
};

export const getProductsByCategory = (category: string): Product[] => {
  return products.filter(product => product.category === category);
};

export const getFeaturedProducts = (): Product[] => {
  return products.filter(product => product.featured);
};

export const getAllCategories = (): string[] => {
  const categories = new Set(products.map(product => product.category));
  return Array.from(categories);
};
