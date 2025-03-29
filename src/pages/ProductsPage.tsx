
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FadeIn, StaggeredContainer, StaggeredItem } from "@/components/ui/motion";
import { Button } from "@/components/ui/button";
import { products, getAllCategories } from "@/data/products";
import ProductCard, { Product } from "@/components/ProductCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const ProductsPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [activeCategory, setActiveCategory] = useState<string>("");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [sortOption, setSortOption] = useState<string>("featured");
  const categories = getAllCategories();

  // Parse query parameters on component mount and when location changes
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const categoryParam = searchParams.get("category");
    
    if (categoryParam) {
      setActiveCategory(categoryParam);
      filterProducts(categoryParam, priceRange, sortOption);
    } else {
      setActiveCategory("");
      filterProducts("", priceRange, sortOption);
    }
  }, [location.search]);

  const filterProducts = (category: string, price: [number, number], sort: string) => {
    let result = [...products];
    
    // Apply category filter
    if (category) {
      result = result.filter(product => product.category === category);
    }
    
    // Apply price filter
    result = result.filter(
      product => product.price >= price[0] && product.price <= price[1]
    );
    
    // Apply sorting
    switch (sort) {
      case "price-low":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        result.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "featured":
      default:
        result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        break;
    }
    
    setFilteredProducts(result);
  };

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    
    // Update URL query parameter
    if (category) {
      navigate(`/products?category=${encodeURIComponent(category)}`);
    } else {
      navigate("/products");
    }
    
    filterProducts(category, priceRange, sortOption);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newSortOption = e.target.value;
    setSortOption(newSortOption);
    filterProducts(activeCategory, priceRange, newSortOption);
  };

  const handlePriceChange = (min: number, max: number) => {
    const newRange: [number, number] = [min, max];
    setPriceRange(newRange);
    filterProducts(activeCategory, newRange, sortOption);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        <FadeIn>
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {activeCategory ? activeCategory : "All Products"}
            </h1>
            <p className="text-gray-600">
              {filteredProducts.length} products available
            </p>
          </div>
        </FadeIn>

        <div className="flex flex-col md:flex-row gap-8">
          <FadeIn className="w-full md:w-1/4">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-lg font-semibold mb-4">Categories</h2>
              <div className="space-y-2">
                <Button
                  variant={activeCategory === "" ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => handleCategoryChange("")}
                >
                  All Products
                </Button>
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={activeCategory === category ? "default" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => handleCategoryChange(category)}
                  >
                    {category}
                  </Button>
                ))}
              </div>

              <h2 className="text-lg font-semibold mt-6 mb-4">Price Range</h2>
              <div className="space-y-3">
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => handlePriceChange(0, 100)}
                >
                  Under $100
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => handlePriceChange(100, 200)}
                >
                  $100 - $200
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => handlePriceChange(200, 500)}
                >
                  $200 - $500
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => handlePriceChange(500, 1000)}
                >
                  $500+
                </Button>
              </div>
            </div>
          </FadeIn>

          <div className="w-full md:w-3/4">
            <FadeIn className="bg-white p-4 rounded-lg shadow-sm mb-6">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">
                  Showing {filteredProducts.length} results
                </span>
                <div className="flex items-center space-x-2">
                  <label className="text-gray-600">Sort by:</label>
                  <select
                    className="border border-gray-300 rounded px-3 py-2"
                    value={sortOption}
                    onChange={handleSortChange}
                  >
                    <option value="featured">Featured</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Customer Rating</option>
                  </select>
                </div>
              </div>
            </FadeIn>

            <StaggeredContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <StaggeredItem key={product.id}>
                  <ProductCard product={product} />
                </StaggeredItem>
              ))}
            </StaggeredContainer>

            {filteredProducts.length === 0 && (
              <FadeIn className="bg-white p-8 rounded-lg shadow-sm text-center">
                <h3 className="text-xl font-semibold mb-2">No products found</h3>
                <p className="text-gray-600">
                  Try adjusting your filters to find what you're looking for.
                </p>
              </FadeIn>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProductsPage;
