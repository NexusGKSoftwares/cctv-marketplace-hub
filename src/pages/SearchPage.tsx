
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { FadeIn, StaggeredContainer, StaggeredItem } from "@/components/ui/motion";
import { products } from "@/data/products";
import ProductCard, { Product } from "@/components/ProductCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const SearchPage = () => {
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<Product[]>([]);

  // Extract search term from URL if available
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get("q");
    if (query) {
      setSearchTerm(query);
      performSearch(query);
    }
  }, [location.search]);

  const performSearch = (term: string) => {
    if (!term.trim()) {
      setSearchResults([]);
      return;
    }

    const query = term.toLowerCase();
    const results = products.filter(
      (product) =>
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query)
    );
    
    setSearchResults(results);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    performSearch(value);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8 flex-1">
        <FadeIn>
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Search Products
            </h1>
            <div className="relative max-w-xl">
              <Input
                type="search"
                placeholder="Search for CCTV cameras, accessories, and more..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="pl-10 pr-4 py-3 rounded-lg"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            </div>
          </div>
        </FadeIn>

        {searchTerm && (
          <FadeIn delay={0.1}>
            <p className="text-gray-600 mb-6">
              {searchResults.length} {searchResults.length === 1 ? "result" : "results"} for "{searchTerm}"
            </p>
          </FadeIn>
        )}

        <StaggeredContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {searchResults.map((product) => (
            <StaggeredItem key={product.id}>
              <ProductCard product={product} />
            </StaggeredItem>
          ))}
        </StaggeredContainer>

        {searchTerm && searchResults.length === 0 && (
          <FadeIn className="bg-white p-8 rounded-lg shadow-sm text-center">
            <h3 className="text-xl font-semibold mb-2">No products found</h3>
            <p className="text-gray-600">
              Try different keywords or browse our categories
            </p>
          </FadeIn>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default SearchPage;
