
import { Button } from "@/components/ui/button";
import { SlideIn } from "@/components/ui/motion";
import { ShoppingCart, User, Search } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const Navbar = () => {
  const [cartCount, setCartCount] = useState(0);

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
            <Link to="/search">
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
            <Button>Sign Up</Button>
          </div>
        </SlideIn>
      </div>
    </header>
  );
};

export default Navbar;
