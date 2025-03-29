import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { FadeIn, ScaleIn, SlideIn, AnimatedButton } from "@/components/ui/motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getProductById, getProductsByCategory } from "@/data/products";
import { Product } from "@/components/ProductCard";
import ProductCard from "@/components/ProductCard";
import { ShoppingCart, Star, Shield, Archive } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  
  useEffect(() => {
    if (id) {
      const productId = parseInt(id);
      const foundProduct = getProductById(productId);
      
      if (foundProduct) {
        setProduct(foundProduct);
        
        // Get related products
        const related = getProductsByCategory(foundProduct.category)
          .filter(p => p.id !== foundProduct.id)
          .slice(0, 3);
        setRelatedProducts(related);
      }
    }
  }, [id]);
  
  const handleAddToCart = () => {
    if (!product) return;
    
    // Get current cart from localStorage or initialize empty array
    const currentCart = JSON.parse(localStorage.getItem("cart") || "[]");
    
    // Check if product already exists in cart
    const existingProductIndex = currentCart.findIndex(
      (item: { id: number }) => item.id === product.id
    );
    
    if (existingProductIndex >= 0) {
      // Product exists, increase quantity
      currentCart[existingProductIndex].quantity += quantity;
    } else {
      // Add new product with the selected quantity
      currentCart.push({ ...product, quantity });
    }
    
    // Save updated cart to localStorage
    localStorage.setItem("cart", JSON.stringify(currentCart));
    
    // Show confirmation and trigger cart count update
    alert(`${product.name} (Qty: ${quantity}) added to cart!`);
    window.dispatchEvent(new Event('storage'));
  };
  
  const handleQuantityChange = (amount: number) => {
    const newQuantity = quantity + amount;
    if (newQuantity > 0) {
      setQuantity(newQuantity);
    }
  };
  
  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto px-4 py-16 text-center">
          <FadeIn>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Product Not Found</h1>
            <p className="text-gray-600 mb-8">The product you're looking for doesn't exist or has been removed.</p>
            <Button asChild>
              <Link to="/products">Browse All Products</Link>
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
          <nav className="text-sm text-gray-500 mb-6">
            <ol className="flex items-center space-x-2">
              <li><Link to="/" className="hover:text-gray-900">Home</Link></li>
              <li>/</li>
              <li><Link to="/products" className="hover:text-gray-900">Products</Link></li>
              <li>/</li>
              <li><Link to={`/products?category=${encodeURIComponent(product.category)}`} className="hover:text-gray-900">{product.category}</Link></li>
              <li>/</li>
              <li className="text-gray-900 font-medium truncate">{product.name}</li>
            </ol>
          </nav>
        </FadeIn>
        
        <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-12">
          <div className="md:flex">
            <ScaleIn className="md:w-1/2 p-6">
              <div className="bg-gray-100 rounded-lg overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-96 object-cover"
                />
              </div>
            </ScaleIn>
            
            <SlideIn direction="right" className="md:w-1/2 p-6 md:p-12">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
              
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-5 w-5"
                      fill={i < product.rating ? "currentColor" : "none"}
                    />
                  ))}
                </div>
                <span className="ml-2 text-gray-600">{product.rating.toFixed(1)} ({product.reviewCount} reviews)</span>
              </div>
              
              <p className="text-3xl font-bold text-gray-900 mb-6">${product.price.toFixed(2)}</p>
              
              <p className="text-gray-600 mb-8">{product.description}</p>
              
              <div className="mb-8">
                <div className="flex items-center mb-4">
                  <label className="text-gray-700 mr-4">Quantity:</label>
                  <div className="flex items-center border border-gray-300 rounded">
                    <button 
                      className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                      onClick={() => handleQuantityChange(-1)}
                    >
                      -
                    </button>
                    <span className="px-4 py-1 border-x border-gray-300">{quantity}</span>
                    <button 
                      className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                      onClick={() => handleQuantityChange(1)}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <AnimatedButton
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-md flex items-center justify-center"
                  onClick={handleAddToCart}
                >
                  <ShoppingCart className="mr-2 h-5 w-5" /> Add to Cart
                </AnimatedButton>
                
                <Button 
                  variant="outline" 
                  className="w-full py-3"
                >
                  Buy Now
                </Button>
              </div>
              
              <div className="mt-8 space-y-3">
                <div className="flex items-start">
                  <Shield className="h-5 w-5 text-green-600 mr-2 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-gray-900">1-Year Warranty</h4>
                    <p className="text-sm text-gray-600">All our products come with a full manufacturer's warranty.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Archive className="h-5 w-5 text-green-600 mr-2 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-gray-900">Free Shipping</h4>
                    <p className="text-sm text-gray-600">On all orders over $199. Delivery in 3-5 business days.</p>
                  </div>
                </div>
              </div>
            </SlideIn>
          </div>
        </div>
        
        <FadeIn>
          <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-12 p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Product Specifications</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
              <div className="border-b border-gray-200 pb-3">
                <h3 className="text-gray-500 text-sm">Resolution</h3>
                <p className="font-medium">1080p Full HD</p>
              </div>
              <div className="border-b border-gray-200 pb-3">
                <h3 className="text-gray-500 text-sm">Connection</h3>
                <p className="font-medium">Wireless / Wi-Fi</p>
              </div>
              <div className="border-b border-gray-200 pb-3">
                <h3 className="text-gray-500 text-sm">Night Vision</h3>
                <p className="font-medium">Yes, up to 30ft</p>
              </div>
              <div className="border-b border-gray-200 pb-3">
                <h3 className="text-gray-500 text-sm">Field of View</h3>
                <p className="font-medium">110° wide-angle lens</p>
              </div>
              <div className="border-b border-gray-200 pb-3">
                <h3 className="text-gray-500 text-sm">Storage</h3>
                <p className="font-medium">Cloud & Local SD Card (up to 128GB)</p>
              </div>
              <div className="border-b border-gray-200 pb-3">
                <h3 className="text-gray-500 text-sm">Power Source</h3>
                <p className="font-medium">AC Adapter (included)</p>
              </div>
              <div className="border-b border-gray-200 pb-3">
                <h3 className="text-gray-500 text-sm">Weather Resistance</h3>
                <p className="font-medium">Indoor Use Only</p>
              </div>
              <div className="border-b border-gray-200 pb-3">
                <h3 className="text-gray-500 text-sm">App Compatibility</h3>
                <p className="font-medium">iOS & Android</p>
              </div>
            </div>
          </div>
        </FadeIn>
        
        {relatedProducts.length > 0 && (
          <FadeIn>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Products</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard key={relatedProduct.id} product={relatedProduct} />
              ))}
            </div>
          </FadeIn>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default ProductDetailPage;
