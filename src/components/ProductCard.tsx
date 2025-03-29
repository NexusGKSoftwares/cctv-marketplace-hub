
import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AnimatedImage } from "@/components/ui/motion";
import { ShoppingCart, Star } from "lucide-react";
import { cn } from "@/lib/utils";

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  rating: number;
  reviewCount: number;
  featured?: boolean;
}

interface ProductCardProps {
  product: Product;
  className?: string;
}

const ProductCard = ({ product, className }: ProductCardProps) => {
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Get current cart from localStorage or initialize empty array
    const currentCart = JSON.parse(localStorage.getItem("cart") || "[]");
    
    // Check if product already exists in cart
    const existingProductIndex = currentCart.findIndex(
      (item: { id: number }) => item.id === product.id
    );
    
    if (existingProductIndex >= 0) {
      // Product exists, increase quantity
      currentCart[existingProductIndex].quantity += 1;
    } else {
      // Add new product with quantity 1
      currentCart.push({ ...product, quantity: 1 });
    }
    
    // Save updated cart to localStorage
    localStorage.setItem("cart", JSON.stringify(currentCart));
    
    // Show confirmation
    alert(`${product.name} added to cart!`);
  };

  return (
    <Card className={cn("overflow-hidden h-full hover:shadow-md transition-shadow", className)}>
      <Link to={`/product/${product.id}`}>
        <div className="h-48 overflow-hidden">
          <AnimatedImage
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>
        <CardContent className="p-4">
          <h3 className="font-semibold text-lg mb-1 line-clamp-1">{product.name}</h3>
          <p className="text-sm text-gray-500 mb-2 line-clamp-2">{product.description}</p>
          <p className="text-2xl font-bold text-gray-900">${product.price.toFixed(2)}</p>
          <div className="flex items-center mt-2">
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="h-4 w-4"
                  fill={i < product.rating ? "currentColor" : "none"}
                />
              ))}
            </div>
            <span className="ml-2 text-sm text-gray-600">({product.reviewCount} reviews)</span>
          </div>
        </CardContent>
      </Link>
      <CardFooter className="p-4 pt-0">
        <Button 
          className="w-full" 
          onClick={handleAddToCart}
        >
          <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
