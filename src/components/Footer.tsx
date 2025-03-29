
import { Link } from "react-router-dom";
import { FadeIn } from "@/components/ui/motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Facebook, Instagram, Twitter, Youtube, Mail } from "lucide-react";
import { toast } from "sonner";

const Footer = () => {
  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Thank you for subscribing to our newsletter!");
  };

  return (
    <FadeIn>
      <footer className="bg-gray-900 text-gray-300">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-white font-bold text-lg mb-4">CCTV Marketplace</h3>
              <p className="mb-4">Your one-stop shop for all your security camera needs.</p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Facebook size={20} />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Instagram size={20} />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Twitter size={20} />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Youtube size={20} />
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="text-white font-bold mb-4">Shop</h4>
              <ul className="space-y-2">
                <li><Link to="/products?category=Indoor Cameras" className="hover:text-white transition-colors">Indoor Cameras</Link></li>
                <li><Link to="/products?category=Outdoor Cameras" className="hover:text-white transition-colors">Outdoor Cameras</Link></li>
                <li><Link to="/products?category=Accessories" className="hover:text-white transition-colors">Accessories</Link></li>
                <li><Link to="/products" className="hover:text-white transition-colors">All Products</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-bold mb-4">Company</h4>
              <ul className="space-y-2">
                <li><Link to="/" className="hover:text-white transition-colors">About Us</Link></li>
                <li><Link to="/" className="hover:text-white transition-colors">Contact</Link></li>
                <li><Link to="/" className="hover:text-white transition-colors">Careers</Link></li>
                <li><Link to="/" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><Link to="/" className="hover:text-white transition-colors">Terms of Service</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-bold mb-4">Stay Updated</h4>
              <p className="mb-4">Subscribe to our newsletter for the latest products and offers.</p>
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <div className="relative flex-1">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    type="email"
                    placeholder="Your email"
                    className="bg-gray-800 border-gray-700 text-white pl-10 pr-4 py-2 rounded-md w-full focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                <Button type="submit">Subscribe</Button>
              </form>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-center">
            <p>© {new Date().getFullYear()} CCTV Marketplace. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </FadeIn>
  );
};

export default Footer;
