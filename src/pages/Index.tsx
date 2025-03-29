
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { AnimatedButton, AnimatedImage, FadeIn, ScaleIn, SlideIn, StaggeredContainer, StaggeredItem } from "@/components/ui/motion";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <FadeIn>
        <header className="bg-white shadow-sm">
          <div className="container mx-auto px-4 py-6 flex justify-between items-center">
            <SlideIn direction="left">
              <h1 className="text-2xl font-bold text-gray-900">CCTV Marketplace</h1>
            </SlideIn>
            <SlideIn direction="right">
              <nav className="space-x-4">
                <Button variant="ghost">Login</Button>
                <Button>Sign Up</Button>
              </nav>
            </SlideIn>
          </div>
        </header>
      </FadeIn>

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
                      Shop Now
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
              {[1, 2, 3].map((item) => (
                <StaggeredItem key={item}>
                  <Card className="overflow-hidden h-full hover:shadow-md transition-shadow">
                    <div className="h-48 overflow-hidden">
                      <AnimatedImage
                        src={`https://source.unsplash.com/random/300x200?cctv,${item}`}
                        alt="CCTV Product"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardHeader>
                      <CardTitle>HD Security Camera</CardTitle>
                      <CardDescription>1080p | Night Vision | Weather-resistant</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-2xl font-bold text-gray-900">$199.99</p>
                      <div className="flex items-center mt-2">
                        <div className="flex text-yellow-400">
                          {[...Array(5)].map((_, i) => (
                            <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                        <span className="ml-2 text-sm text-gray-600">(42 reviews)</span>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <AnimatedButton className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md">
                        Add to Cart
                      </AnimatedButton>
                    </CardFooter>
                  </Card>
                </StaggeredItem>
              ))}
            </StaggeredContainer>
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
      </main>

      <FadeIn>
        <footer className="bg-gray-900 text-gray-300">
          <div className="container mx-auto px-4 py-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <h3 className="text-white font-bold text-lg mb-4">CCTV Marketplace</h3>
                <p className="mb-4">Your one-stop shop for all your security camera needs.</p>
              </div>
              <div>
                <h4 className="text-white font-bold mb-4">Shop</h4>
                <ul className="space-y-2">
                  <li><Link to="/" className="hover:text-white transition-colors">Wireless Cameras</Link></li>
                  <li><Link to="/" className="hover:text-white transition-colors">Wired Cameras</Link></li>
                  <li><Link to="/" className="hover:text-white transition-colors">Accessories</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="text-white font-bold mb-4">Company</h4>
                <ul className="space-y-2">
                  <li><Link to="/" className="hover:text-white transition-colors">About Us</Link></li>
                  <li><Link to="/" className="hover:text-white transition-colors">Contact</Link></li>
                  <li><Link to="/" className="hover:text-white transition-colors">Careers</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="text-white font-bold mb-4">Contact Us</h4>
                <p className="mb-2">Email: info@cctvmarketplace.com</p>
                <p className="mb-2">Phone: +1 (123) 456-7890</p>
              </div>
            </div>
            <div className="border-t border-gray-800 mt-12 pt-8 text-center">
              <p>© 2023 CCTV Marketplace. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </FadeIn>
    </div>
  );
};

export default Index;
