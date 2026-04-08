import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/contexts/AuthContext";
import AdminLayout from "@/components/AdminLayout";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Dashboard from "@/pages/Dashboard";
import RentalRequests from "@/pages/RentalRequests";
import NewRentalRequest from "@/pages/NewRentalRequest";
import Properties from "@/pages/Properties";
import NewProperty from "@/pages/NewProperty";
import Payments from "@/pages/Payments";
import Agencies from "@/pages/Agencies";
import NewAgency from "@/pages/NewAgency";
import UsersPage from "@/pages/UsersPage";
import NewUser from "@/pages/NewUser";
import SettingsPage from "@/pages/SettingsPage";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route element={<AdminLayout />}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/rental-requests" element={<RentalRequests />} />
              <Route path="/rental-requests/new" element={<NewRentalRequest />} />
              <Route path="/properties" element={<Properties />} />
              <Route path="/properties/new" element={<NewProperty />} />
              <Route path="/properties/:id" element={<PropertyDetail />} />
              <Route path="/payments" element={<Payments />} />
              <Route path="/agencies" element={<Agencies />} />
              <Route path="/agencies/new" element={<NewAgency />} />
              <Route path="/users" element={<UsersPage />} />
              <Route path="/users/new" element={<NewUser />} />
              <Route path="/settings" element={<SettingsPage />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
