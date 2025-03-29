
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { FadeIn, SlideIn } from "@/components/ui/motion";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { products } from "@/data/products";
import { showSuccessAlert, showConfirmationAlert } from "@/utils/sweetAlert";

type CartItem = {
  id: string;
  quantity: number;
};

const CartPage = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartProducts, setCartProducts] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCartItems(storedCart);

    // Map cart items to products data
    const productData = storedCart
      .map((item: CartItem) => {
        const product = products.find((p) => p.id.toString() === item.id);
        if (!product) return null; // Skip if product not found
        return {
          ...product,
          quantity: item.quantity,
        };
      })
      .filter(Boolean); // Remove any null items

    setCartProducts(productData);
  }, []);

  const updateCart = (updatedCart: CartItem[]) => {
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    
    // Create a custom event to notify other tabs
    window.dispatchEvent(new Event("storage"));

    // Update cart products
    const productData = updatedCart
      .map((item: CartItem) => {
        const product = products.find((p) => p.id.toString() === item.id);
        if (!product) return null; // Skip if product not found
        return {
          ...product,
          quantity: item.quantity,
        };
      })
      .filter(Boolean); // Remove any null items

    setCartProducts(productData);
  };

  const increaseQuantity = (id: string) => {
    const updatedCart = cartItems.map((item) =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    updateCart(updatedCart);
  };

  const decreaseQuantity = (id: string) => {
    const updatedCart = cartItems.map((item) =>
      item.id === id && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
    updateCart(updatedCart);
  };

  const removeItem = (id: string) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    updateCart(updatedCart);
  };

  const clearCart = () => {
    updateCart([]);
  };

  const calculateSubtotal = () => {
    return cartProducts.reduce(
      (total, item) => total + (item.price || 0) * item.quantity,
      0
    );
  };

  const handleCheckout = async () => {
    const result = await showConfirmationAlert(
      'Proceed to Checkout?',
      'You are about to complete your purchase.',
      'Proceed'
    );

    if (result.isConfirmed) {
      // Process checkout
      showSuccessAlert(
        'Order Placed!',
        'Your order has been successfully placed. Thank you for shopping with us!'
      ).then(() => {
        // Clear cart and redirect to home
        clearCart();
        navigate('/');
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        <FadeIn>
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Your Cart</h1>
        </FadeIn>

        {cartProducts.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <SlideIn direction="left">
                <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                  <div className="p-6">
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="text-lg font-semibold">Shopping Cart ({cartProducts.length} items)</h2>
                      <Button variant="outline" size="sm" onClick={clearCart}>
                        Clear Cart
                      </Button>
                    </div>

                    <div className="divide-y">
                      {cartProducts.map((item) => (
                        <div key={item.id} className="py-4 flex flex-col sm:flex-row items-start sm:items-center">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-24 h-24 object-cover rounded-md mr-4 mb-4 sm:mb-0"
                          />
                          <div className="flex-1 min-w-0">
                            <Link to={`/product/${item.id}`}>
                              <h3 className="text-base font-medium text-gray-900 mb-1 hover:text-blue-600">
                                {item.name}
                              </h3>
                            </Link>
                            <p className="text-sm text-gray-500 mb-2">{item.category}</p>
                            <p className="text-base font-semibold text-gray-900">
                              ${(item.price || 0).toFixed(2)}
                            </p>
                          </div>

                          <div className="flex items-center mt-4 sm:mt-0">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => decreaseQuantity(item.id)}
                              disabled={item.quantity <= 1}
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                            <span className="mx-3 w-8 text-center">{item.quantity}</span>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => increaseQuantity(item.id)}
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 ml-4 text-gray-500 hover:text-red-500"
                              onClick={() => removeItem(item.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </SlideIn>
            </div>

            <div className="lg:col-span-1">
              <SlideIn direction="right">
                <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
                  <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
                  <div className="space-y-3 mb-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subtotal</span>
                      <span>${calculateSubtotal().toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Shipping</span>
                      <span>$0.00</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Tax</span>
                      <span>${(calculateSubtotal() * 0.1).toFixed(2)}</span>
                    </div>
                    <div className="border-t pt-3 mt-3">
                      <div className="flex justify-between font-semibold">
                        <span>Total</span>
                        <span>${(calculateSubtotal() * 1.1).toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                  <Button className="w-full" size="lg" onClick={handleCheckout}>
                    Proceed to Checkout
                  </Button>
                  <p className="text-center text-sm text-gray-500 mt-4">
                    Need help? <Link to="/" className="text-blue-600 hover:underline">Contact us</Link>
                  </p>
                </div>
              </SlideIn>
            </div>
          </div>
        ) : (
          <FadeIn>
            <div className="bg-white rounded-lg shadow-sm p-8 text-center">
              <div className="mb-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-16 w-16 mx-auto text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-semibold mb-2">Your cart is empty</h2>
              <p className="text-gray-600 mb-6">
                Looks like you haven't added any products to your cart yet.
              </p>
              <Button asChild>
                <Link to="/products">Start Shopping</Link>
              </Button>
            </div>
          </FadeIn>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default CartPage;
