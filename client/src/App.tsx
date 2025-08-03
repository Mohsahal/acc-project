import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { SidebarProvider } from "@/contexts/SidebarContext";
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
import SupplierCustomerCreate from "./pages/SupplierCustomerCreate"; 
import SupplierCustomerView from "./pages/SupplierCustomerView";
import CreateSingleInvoice from "./pages/CreateSingleInvoice";
import CreateMultipleInvoice from "./pages/CreateMultipleInvoice";
import NewMultipleInvoice from "./pages/NewMultipleInvoice";
import PendingInvoice from "./pages/PendingInvoice";
import ViewInvoice from "./pages/ViewInvoice";
import InvoiceStatus from "./pages/InvoiceStatus";
import InvoiceMonthWise from "./pages/InvoiceMonthWise";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";
import Unauthorized from "./pages/Unauthorized";
import UserDashboard from "./pages/UserDashboard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <SidebarProvider>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/register" element={<Signup />} />
              <Route path="/unauthorized" element={<Unauthorized />} />
              <Route 
                path="/dashboard"
                element={
                  <AdminRoute>
                    <Dashboard />
                  </AdminRoute>
                } 
              />
              <Route 
                path="/user-dashboard"
                element={
                  <ProtectedRoute>
                    <UserDashboard />
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
              {/* Invoice Routes */}
              <Route 
                path="/invoice/create-single" 
                element={
                  <ProtectedRoute>
                    <CreateSingleInvoice />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/invoice/create-multiple" 
                element={
                  <ProtectedRoute>
                    <CreateMultipleInvoice />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/invoice/new-multiple" 
                element={
                  <ProtectedRoute>
                    <NewMultipleInvoice />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/invoice/pending" 
                element={
                  <ProtectedRoute>
                    <PendingInvoice />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/invoice/view" 
                element={
                  <ProtectedRoute>
                    <ViewInvoice />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/invoice/status" 
                element={
                  <ProtectedRoute>
                    <InvoiceStatus />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/invoice/month-wise" 
                element={
                  <ProtectedRoute>
                    <InvoiceMonthWise />
                  </ProtectedRoute>
                } 
              />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </SidebarProvider>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
