import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import NotFound from "./pages/NotFound";
import AdminLayout from "./layouts/AdminLayout";
import CustomerLayout from "./layouts/CustomerLayout";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminRooms from "./pages/admin/Rooms";
import AdminMenu from "./pages/admin/Menu";
import AdminBookings from "./pages/admin/Bookings";
import AdminServices from "./pages/admin/Services";
import CustomerHome from "./pages/customer/Home";
import CustomerRooms from "./pages/customer/Rooms";
import CustomerBookings from "./pages/customer/Bookings";
import CustomerFood from "./pages/customer/Food";
import CustomerServices from "./pages/customer/Services";
import CustomerCheckout from "./pages/customer/Checkout";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          
          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="rooms" element={<AdminRooms />} />
            <Route path="menu" element={<AdminMenu />} />
            <Route path="bookings" element={<AdminBookings />} />
            <Route path="services" element={<AdminServices />} />
          </Route>

          {/* Customer Routes */}
          <Route path="/customer" element={<CustomerLayout />}>
            <Route index element={<CustomerHome />} />
            <Route path="rooms" element={<CustomerRooms />} />
            <Route path="bookings" element={<CustomerBookings />} />
            <Route path="food" element={<CustomerFood />} />
            <Route path="services" element={<CustomerServices />} />
            <Route path="checkout" element={<CustomerCheckout />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
