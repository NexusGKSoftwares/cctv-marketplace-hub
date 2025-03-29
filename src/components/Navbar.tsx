
import { Button } from "@/components/ui/button";
import { SlideIn } from "@/components/ui/motion";
import { ShoppingCart, User, Search } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const Navbar = () => {
  const [cartCount, setCartCount] = useState(0);
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Initialize cart count
    updateCartCount();

    // Add storage event listener to update cart when changed in another tab
    window.addEventListener('storage', updateCartCount);
    
    return () => {
      window.removeEventListener('storage', updateCartCount);
    };
  }, []);

  const updateCartCount = () => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const count = cart.reduce((total: number, item: { quantity: number }) => total + item.quantity, 0);
    setCartCount(count);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
    }
  };

  const handleSignUp = () => {
    toast.success("Sign up feature coming soon!");
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-10">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <SlideIn direction="left">
          <Link to="/" className="text-2xl font-bold text-gray-900">CCTV Marketplace</Link>
        </SlideIn>
        
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/products" className="text-gray-600 hover:text-gray-900">All Products</Link>
          <Link to="/products?category=Indoor Cameras" className="text-gray-600 hover:text-gray-900">Indoor Cameras</Link>
          <Link to="/products?category=Outdoor Cameras" className="text-gray-600 hover:text-gray-900">Outdoor Cameras</Link>
          <Link to="/products?category=Accessories" className="text-gray-600 hover:text-gray-900">Accessories</Link>
        </div>
        
        <SlideIn direction="right">
          <div className="flex items-center space-x-4">
            <form onSubmit={handleSearch} className="hidden md:flex">
              <input
                type="search"
                placeholder="Search products..."
                className="border border-gray-300 rounded-l-md px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button type="submit" className="bg-gray-100 border border-l-0 border-gray-300 rounded-r-md px-3 py-1.5 hover:bg-gray-200">
                <Search className="h-4 w-4" />
              </button>
            </form>
            <Link to="/search" className="md:hidden">
              <Button variant="ghost" size="icon">
                <Search className="h-5 w-5" />
              </Button>
            </Link>
            <Link to="/cart" className="relative">
              <Button variant="ghost" size="icon">
                <ShoppingCart className="h-5 w-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Button>
            </Link>
            <Link to="/account">
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
              </Button>
            </Link>
            <Button onClick={handleSignUp}>Sign Up</Button>
          </div>
        </SlideIn>
      </div>
    </header>
  );
};

export default Navbar;
