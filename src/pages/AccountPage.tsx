
import { useState } from "react";
import { FadeIn, SlideIn } from "@/components/ui/motion";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

const AccountPage = () => {
  const [activeTab, setActiveTab] = useState("profile");
  
  // Simulated user data
  const [userData, setUserData] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    address: "123 Main St, Anytown, CA 94321"
  });

  // Mock orders data
  const orders = [
    { id: "ORD-1234", date: "2023-06-15", status: "Delivered", total: 359.97 },
    { id: "ORD-2345", date: "2023-07-22", status: "Shipped", total: 129.99 },
    { id: "ORD-3456", date: "2023-08-10", status: "Processing", total: 249.98 }
  ];

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Profile updated successfully");
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Password changed successfully");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8 flex-1">
        <FadeIn>
          <h1 className="text-3xl font-bold text-gray-900 mb-8">My Account</h1>
        </FadeIn>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile" className="space-y-6">
            <SlideIn direction="right">
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>Update your personal details</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleProfileUpdate} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input 
                          id="name" 
                          value={userData.name}
                          onChange={(e) => setUserData({...userData, name: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input 
                          id="email" 
                          type="email"
                          value={userData.email}
                          onChange={(e) => setUserData({...userData, email: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone</Label>
                        <Input 
                          id="phone" 
                          value={userData.phone}
                          onChange={(e) => setUserData({...userData, phone: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="address">Address</Label>
                        <Input 
                          id="address" 
                          value={userData.address}
                          onChange={(e) => setUserData({...userData, address: e.target.value})}
                        />
                      </div>
                    </div>
                    <Button type="submit" className="mt-4">Save Changes</Button>
                  </form>
                </CardContent>
              </Card>
            </SlideIn>
          </TabsContent>
          
          <TabsContent value="orders" className="space-y-6">
            <SlideIn direction="right">
              <Card>
                <CardHeader>
                  <CardTitle>Order History</CardTitle>
                  <CardDescription>View your recent orders</CardDescription>
                </CardHeader>
                <CardContent>
                  {orders.length > 0 ? (
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left py-3 px-4">Order ID</th>
                            <th className="text-left py-3 px-4">Date</th>
                            <th className="text-left py-3 px-4">Status</th>
                            <th className="text-left py-3 px-4">Total</th>
                            <th className="text-left py-3 px-4">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {orders.map((order) => (
                            <tr key={order.id} className="border-b hover:bg-gray-50">
                              <td className="py-3 px-4">{order.id}</td>
                              <td className="py-3 px-4">{order.date}</td>
                              <td className="py-3 px-4">
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                  order.status === "Delivered" ? "bg-green-100 text-green-800" :
                                  order.status === "Shipped" ? "bg-blue-100 text-blue-800" :
                                  "bg-yellow-100 text-yellow-800"
                                }`}>
                                  {order.status}
                                </span>
                              </td>
                              <td className="py-3 px-4">${order.total.toFixed(2)}</td>
                              <td className="py-3 px-4">
                                <Button variant="outline" size="sm">View</Button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-gray-500">You haven't placed any orders yet.</p>
                      <Button className="mt-4">Start Shopping</Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </SlideIn>
          </TabsContent>
          
          <TabsContent value="security" className="space-y-6">
            <SlideIn direction="right">
              <Card>
                <CardHeader>
                  <CardTitle>Change Password</CardTitle>
                  <CardDescription>Update your password to keep your account secure</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleChangePassword} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="current-password">Current Password</Label>
                      <Input id="current-password" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="new-password">New Password</Label>
                      <Input id="new-password" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">Confirm New Password</Label>
                      <Input id="confirm-password" type="password" />
                    </div>
                    <Button type="submit" className="mt-4">Change Password</Button>
                  </form>
                </CardContent>
              </Card>
            </SlideIn>
          </TabsContent>
        </Tabs>
      </main>
      
      <Footer />
    </div>
  );
};

export default AccountPage;
