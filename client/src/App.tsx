import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Dashboard from "./components/Dashboard";
import CreateProfile from "./pages/CreateProfile";
import ClientDetails from "./components/ClientDetails";
import ClientStaff from "./components/ClientStaff";
import ClientStaffProfile from "./pages/ClientStaffProfile";
import ZigmaStaffProfile from "./pages/ZigmaStaffProfile";
import ViewUsers from "./pages/ViewUsers";
import StaffDetails from "./pages/StaffDetails";
import StaffSalary from "./pages/StaffSalary";
import StaffDocument from "./pages/StaffDocument";
import SupplierCustomerCreate from "./components/SupplierCustomerCreate"; 
import SupplierCustomerView from "./components/SupplierCustomerView";
import ProtectedRoute from "./components/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route 
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/create-profile" 
            element={
              <ProtectedRoute>
                <CreateProfile />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/client-details" 
            element={
              <ProtectedRoute>
                <ClientDetails />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/client-staff" 
            element={
              <ProtectedRoute>
                <ClientStaff />
              </ProtectedRoute>
            } 
          />
          <Route
            path="/client-staff-profile" 
            element={
              <ProtectedRoute>
                <ClientStaffProfile />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/zigma-staff-profile" 
            element={
              <ProtectedRoute>
                <ZigmaStaffProfile />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/view-users" 
            element={
              <ProtectedRoute>
                <ViewUsers />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/staff-details" 
            element={
              <ProtectedRoute>
                <StaffDetails />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/staff-salary" 
            element={
              <ProtectedRoute>
                <StaffSalary />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/staff-document" 
            element={
              <ProtectedRoute>
                <StaffDocument />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/supplier-customer/create" 
            element={
              <ProtectedRoute>
                <SupplierCustomerCreate />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/supplier-customer/view" 
            element={
              <ProtectedRoute>
                <SupplierCustomerView />
              </ProtectedRoute>
            } 
          />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
