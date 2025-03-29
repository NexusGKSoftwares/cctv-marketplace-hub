import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { AnimatedButton, AnimatedImage, FadeIn, ScaleIn, SlideIn, StaggeredContainer, StaggeredItem } from "@/components/ui/motion";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { products } from "@/data/products";
import ProductCard from "@/components/ProductCard";

const Index = () => {
  // Get 3 featured products
  const featuredProducts = products.filter(product => product.featured).slice(0, 3);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="container mx-auto px-4 py-8">
        <ScaleIn delay={0.2}>
          <section className="mb-12">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-xl shadow-lg overflow-hidden">
              <div className="md:flex">
                <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Professional CCTV Solutions</h2>
                  <p className="text-blue-100 mb-6">Secure your home or business with our premium selection of surveillance equipment.</p>
                  <div className="flex gap-4">
                    <AnimatedButton className="bg-white text-blue-700 hover:bg-blue-50 px-6 py-3 rounded-md font-medium">
                      <Link to="/products">Shop Now</Link>
                    </AnimatedButton>
                    <AnimatedButton className="bg-transparent text-white border border-white hover:bg-white/10 px-6 py-3 rounded-md font-medium">
                      Learn More
                    </AnimatedButton>
                  </div>
                </div>
                <div className="md:w-1/2 p-8 flex items-center justify-center">
                  <AnimatedImage 
                    src="https://images.unsplash.com/photo-1557597774-9d273605dfa9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2342&q=80" 
                    alt="CCTV Camera"
                    className="rounded-lg shadow-lg max-h-64 object-cover" 
                  />
                </div>
              </div>
            </div>
          </section>
        </ScaleIn>

        <FadeIn delay={0.4}>
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Products</h2>
            <StaggeredContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredProducts.map((product) => (
                <StaggeredItem key={product.id}>
                  <ProductCard product={product} />
                </StaggeredItem>
              ))}
            </StaggeredContainer>
            <div className="text-center mt-8">
              <Button asChild>
                <Link to="/products">View All Products</Link>
              </Button>
            </div>
          </section>
        </FadeIn>

        <SlideIn direction="up" delay={0.6}>
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Why Choose Us?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { title: "Premium Quality", description: "All our products meet the highest industry standards" },
                { title: "Expert Support", description: "Our team is available 24/7 to answer your questions" },
                { title: "Easy Installation", description: "We provide detailed guides for all our products" },
              ].map((feature, index) => (
                <Card key={index} className="text-center p-6">
                  <ScaleIn delay={0.2 * index}>
                    <div className="mx-auto w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </ScaleIn>
                </Card>
              ))}
            </div>
          </section>
        </SlideIn>

        <FadeIn>
          <section className="mb-12 bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="p-8 md:p-12 text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to secure your property?</h2>
              <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                Our security experts are ready to help you find the perfect surveillance solution for your home or business.
              </p>
              <AnimatedButton className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-md font-medium">
                <Link to="/products">Get Started Today</Link>
              </AnimatedButton>
            </div>
          </section>
        </FadeIn>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
