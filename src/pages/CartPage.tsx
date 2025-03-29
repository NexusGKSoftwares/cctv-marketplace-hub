
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FadeIn, StaggeredContainer, StaggeredItem, AnimatedButton } from "@/components/ui/motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ShoppingCart, Trash, ArrowRight } from "lucide-react";
import { Product } from "@/components/ProductCard";
import Navbar from "@/components/Navbar";

interface CartItem extends Product {
  quantity: number;
}

const CartPage = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Load cart items from localStorage
    const loadCart = () => {
      const savedCart = JSON.parse(localStorage.getItem("cart") || "[]");
      setCartItems(savedCart);
      setLoading(false);
    };

    loadCart();

    // Listen for storage changes from other tabs
    window.addEventListener("storage", loadCart);
    
    return () => {
      window.removeEventListener("storage", loadCart);
    };
  }, []);

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    const updatedCart = cartItems.map(item => 
      item.id === id ? { ...item, quantity: newQuantity } : item
    );
    
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    window.dispatchEvent(new Event("storage"));
  };

  const removeItem = (id: number) => {
    const updatedCart = cartItems.filter(item => item.id !== id);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    window.dispatchEvent(new Event("storage"));
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem("cart");
    window.dispatchEvent(new Event("storage"));
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const calculateTax = () => {
    return calculateSubtotal() * 0.08; // 8% tax
  };

  const calculateShipping = () => {
    const subtotal = calculateSubtotal();
    return subtotal > 200 ? 0 : 12.99; // Free shipping over $200
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateTax() + calculateShipping();
  };

  const handleCheckout = () => {
    alert("Checkout functionality would be implemented here!");
    navigate("/checkout");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto px-4 py-16 text-center">
          <p>Loading your cart...</p>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto px-4 py-16 text-center">
          <FadeIn>
            <ShoppingCart className="h-16 w-16 mx-auto text-gray-400 mb-4" />
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Your Cart is Empty</h1>
            <p className="text-gray-600 mb-8">Looks like you haven't added any products to your cart yet.</p>
            <Button asChild>
              <Link to="/products">Browse Products</Link>
            </Button>
          </FadeIn>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        <FadeIn>
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>
        </FadeIn>
        
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-2/3">
            <StaggeredContainer className="space-y-4">
              {cartItems.map((item) => (
                <StaggeredItem key={item.id}>
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-4">
                        <Link to={`/product/${item.id}`} className="shrink-0">
                          <img 
                            src={item.image} 
                            alt={item.name} 
                            className="w-24 h-24 object-cover rounded-md"
                          />
                        </Link>
                        <div className="flex-grow">
                          <Link 
                            to={`/product/${item.id}`} 
                            className="text-lg font-semibold text-gray-900 hover:text-blue-600"
                          >
                            {item.name}
                          </Link>
                          <p className="text-sm text-gray-500">{item.category}</p>
                        </div>
                        <div className="flex items-center border border-gray-300 rounded">
                          <button 
                            className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          >
                            -
                          </button>
                          <span className="px-4 py-1 border-x border-gray-300">{item.quantity}</span>
                          <button 
                            className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            +
                          </button>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-semibold text-gray-900">
                            ${(item.price * item.quantity).toFixed(2)}
                          </p>
                          <p className="text-sm text-gray-500">
                            ${item.price.toFixed(2)} each
                          </p>
                        </div>
                        <button 
                          className="p-2 text-gray-400 hover:text-red-500"
                          onClick={() => removeItem(item.id)}
                          aria-label="Remove item"
                        >
                          <Trash className="h-5 w-5" />
                        </button>
                      </div>
                    </CardContent>
                  </Card>
                </StaggeredItem>
              ))}
            </StaggeredContainer>
            
            <FadeIn className="mt-6">
              <div className="flex justify-between">
                <Button 
                  variant="outline" 
                  onClick={() => navigate("/products")}
                >
                  Continue Shopping
                </Button>
                <Button 
                  variant="outline" 
                  className="text-red-500 hover:text-red-700 hover:border-red-200"
                  onClick={clearCart}
                >
                  Clear Cart
                </Button>
              </div>
            </FadeIn>
          </div>
          
          <FadeIn className="lg:w-1/3">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Order Summary</h2>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">${calculateSubtotal().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax (8%)</span>
                    <span className="font-medium">${calculateTax().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-medium">
                      {calculateShipping() === 0 
                        ? "Free" 
                        : `$${calculateShipping().toFixed(2)}`
                      }
                    </span>
                  </div>
                  <div className="border-t border-gray-200 pt-3 mt-3">
                    <div className="flex justify-between font-semibold text-lg">
                      <span>Total</span>
                      <span>${calculateTotal().toFixed(2)}</span>
                    </div>
                  </div>
                </div>
                
                <AnimatedButton
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-md flex items-center justify-center"
                  onClick={handleCheckout}
                >
                  Proceed to Checkout <ArrowRight className="ml-2 h-5 w-5" />
                </AnimatedButton>
                
                <p className="text-xs text-gray-500 mt-4 text-center">
                  By checking out, you agree to our Terms of Service and Privacy Policy.
                </p>
              </CardContent>
            </Card>
          </FadeIn>
        </div>
      </main>
    </div>
  );
};

export default CartPage;
