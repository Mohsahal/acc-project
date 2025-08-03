import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Users, 
  ChevronRight,
  Settings,
  LogOut,
  Home,
  UserPlus,
  UserCheck,
  Receipt,
  CheckSquare,
  Calendar,
  BarChart3,
  Activity,
  Menu,
  Key,
  FileText,
  Edit,
  Trash2,
  Phone,
  MapPin,
  User,
  Building2,
  X
} from "lucide-react";

const SupplierCustomerCreate = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [createProfileOpen, setCreateProfileOpen] = useState(false);
  const [clientDetailsOpen, setClientDetailsOpen] = useState(false);
  const [clientStaffOpen, setClientStaffOpen] = useState(false);
  const [supplierCustomerOpen, setSupplierCustomerOpen] = useState(true);
  const [invoiceOpen, setInvoiceOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("username");
    navigate("/");
  };

  const sidebarItems = [
    { icon: Home, label: "Dashboard", path: "/dashboard" },
    { 
      icon: UserPlus, 
      label: "Create Profile", 
      path: "/create-profile",
      hasDropdown: true,
      isOpen: createProfileOpen,
      subItems: [
        { label: "Client", path: "/create-profile" },
        { label: "Client Staff", path: "/client-staff-profile" },
        { label: "Zigma Staff", path: "/zigma-staff-profile" },
        { label: "View Users", path: "/view-users" },
      ]
    },
    { 
      icon: UserCheck, 
      label: "Client Details", 
      path: "/client-details", 
      hasDropdown: true,
      isOpen: clientDetailsOpen,
      subItems: [
        { label: "Rent Details", path: "/client-details/rent" },
        { label: "License Details", path: "/client-details/license" },
      ]
    },
    { 
      icon: Users, 
      label: "Client Staff", 
      path: "/client-staff",
      hasDropdown: true,
      isOpen: clientStaffOpen,
      subItems: [
        { label: "Staff Details", path: "/staff-details" },
        { label: "Staff Salary", path: "/staff-salary" },
        { label: "Staff Document", path: "/staff-document" },
      ]
    },
    {
      icon: Receipt,
      label: "Supplier Customer",
      path: "/supplier-customer",
      hasDropdown: true,
      isOpen: supplierCustomerOpen,
      subItems: [
        { label: "Create", path: "/supplier-customer/create", active: true },
        { label: "View", path: "/supplier-customer/view" },
      ]
    },
    { 
      icon: FileText, 
      label: "Invoice", 
      path: "/invoice",
      hasDropdown: true,
      isOpen: invoiceOpen,
      subItems: [
        { label: "Create Single Invoice", path: "/invoice/create-single" },
        { label: "Create Multiple Invoice", path: "/invoice/create-multiple" },
        { label: "New Multiple Invoice", path: "/invoice/new-multiple" },
        { label: "Pending Invoice", path: "/invoice/pending" },
        { label: "View", path: "/invoice/view" },
        { label: "Invoice Status", path: "/invoice/status" },
        { label: "Invoice Month Wise", path: "/invoice/month-wise" },
      ]
    },
    { icon: CheckSquare, label: "Check Invoice", path: "/check-invoice" },
    { icon: Calendar, label: "Vat Return Date", path: "/vat-return-date" },
    { icon: BarChart3, label: "Vat Return", path: "/vat-return" },
    { icon: Calendar, label: "Vat Return This Month", path: "/vat-return-month" },
    { icon: FileText, label: "Vat Return This Month All", path: "/vat-return-month-all" },
    { icon: Settings, label: "Designation", path: "/designation" },
    { icon: BarChart3, label: "Reports", path: "/reports" },
    { icon: Activity, label: "Staff Activity", path: "/staff-activity" },
  ];

  const [formData, setFormData] = useState({
    client: "",
    name: "",
    trnNumber: "",
    phoneNumber: "+971501234567",
    type: "Customer/Supplier",
    address: ""
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Handle form submission logic here
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-blue-600 text-white px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-white hover:bg-white/20"
          >
            <Menu className="h-5 w-5" />
          </Button>
          <div className="flex items-center space-x-2">
            <Edit className="h-5 w-5" />
            <h1 className="text-xl font-semibold">Customer Supplier</h1>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <span className="text-sm">admin</span>
            <Settings className="h-4 w-4" />
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-white/20"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className={`bg-dashboard-sidebar text-dashboard-sidebar-foreground transition-all duration-300 ${
          sidebarOpen ? 'w-64' : 'w-0 overflow-hidden'
        }`}>
          <div className="p-4">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <Users className="h-5 w-5" />
              </div>
              <div>
                <div className="font-semibold">Admin</div>
                <div className="text-sm text-green-400">● Online</div>
              </div>
            </div>
            
            <nav className="space-y-1">
              {sidebarItems.map((item, index) => (
                <div key={index}>
                  <button
                    onClick={() => {
                      if (item.hasDropdown) {
                        if (item.label === "Create Profile") {
                          setCreateProfileOpen(!createProfileOpen);
                        } else if (item.label === "Client Details") {
                          setClientDetailsOpen(!clientDetailsOpen);
                        } else if (item.label === "Client Staff") {
                          setClientStaffOpen(!clientStaffOpen);
                        } else if (item.label === "Supplier Customer") {
                          setSupplierCustomerOpen(!supplierCustomerOpen);
                        } else if (item.label === "Invoice") {
                          setInvoiceOpen(!invoiceOpen);
                        }
                      } else {
                        navigate(item.path);
                      }
                    }}
                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                      item.label === "Supplier Customer" 
                        ? 'bg-white/10 text-white' 
                        : 'text-gray-300 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <item.icon className="h-4 w-4" />
                    <span className="text-sm flex-1">{item.label}</span>
                    {item.hasDropdown && (
                      <ChevronRight className={`h-4 w-4 transition-transform duration-200 text-gray-300 ${
                        (item.label === "Create Profile" && createProfileOpen) || 
                        (item.label === "Client Details" && clientDetailsOpen) ||
                        (item.label === "Client Staff" && clientStaffOpen) ||
                        (item.label === "Supplier Customer" && supplierCustomerOpen) ||
                        (item.label === "Invoice" && invoiceOpen)
                          ? 'rotate-90' : ''
                      }`} />
                    )}
                  </button>
                  
                  {item.hasDropdown && item.subItems && (
                    ((item.label === "Create Profile" && createProfileOpen) || 
                      (item.label === "Client Details" && clientDetailsOpen) ||
                      (item.label === "Client Staff" && clientStaffOpen) ||
                      (item.label === "Supplier Customer" && supplierCustomerOpen) ||
                      (item.label === "Invoice" && invoiceOpen)) && (
                      <div className="ml-6 mt-1 space-y-1">
                        {item.subItems.map((subItem, subIndex) => (
                          <button
                            key={subIndex}
                            onClick={() => {
                              if (subItem.path) {
                                navigate(subItem.path);
                              }
                            }}
                            className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                              subItem.active 
                                ? 'bg-blue-500/20 text-blue-300' 
                                : 'text-gray-300 hover:bg-white/5 hover:text-white'
                            }`}
                          >
                            <FileText className="h-4 w-4" />
                            <span className="text-sm">{subItem.label}</span>
                          </button>
                        ))}
                      </div>
                    )
                  )}
                </div>
              ))}

              
              <button
                onClick={handleLogout}
                className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors text-gray-300 hover:bg-white/5 hover:text-white mt-4"
              >
                <LogOut className="h-4 w-4" />
                <span className="text-sm">Logout</span>
              </button>
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 bg-white">
          <div className="mb-6">
            <div className="flex items-center space-x-2 text-sm text-gray-600 mb-2">
              <Home className="h-4 w-4" />
              <span>Dashboard</span>
              <ChevronRight className="h-4 w-4" />
              <span>Customer Supplier</span>
            </div>
          </div>

          <Card>
            <CardContent className="p-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Select Client */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Select Client
                    </label>
                    <Select value={formData.client} onValueChange={(value) => handleInputChange("client", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Client" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="zeigets">Zeigets</SelectItem>
                        <SelectItem value="client2">Client 2</SelectItem>
                        <SelectItem value="client3">Client 3</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Name
                    </label>
                    <Input
                      placeholder="Enter name"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                    />
                  </div>

                  {/* TRN Number */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      TRN Number
                    </label>
                    <Input
                      placeholder="Enter TRN number"
                      value={formData.trnNumber}
                      onChange={(e) => handleInputChange("trnNumber", e.target.value)}
                    />
                  </div>

                  {/* Phone Number */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="text-sm text-gray-500">🇦🇪 +971</span>
                      </div>
                      <Input
                        className="pl-20"
                        placeholder="50 123 4567"
                        value={formData.phoneNumber}
                        onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
                      />
                    </div>
                  </div>

                  {/* Type */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Type
                    </label>
                    <Select value={formData.type} onValueChange={(value) => handleInputChange("type", value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Customer/Supplier">Customer/Supplier</SelectItem>
                        <SelectItem value="Customer">Customer</SelectItem>
                        <SelectItem value="Supplier">Supplier</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Address */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Address
                  </label>
                  <Textarea
                    placeholder="Enter address"
                    value={formData.address}
                    onChange={(e) => handleInputChange("address", e.target.value)}
                    className="min-h-[100px]"
                  />
                </div>

                {/* Submit Button */}
                <div className="flex justify-end">
                  <Button 
                    type="submit" 
                    className="bg-green-600 hover:bg-green-700 text-white px-8 py-2"
                  >
                    Create
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-blue-800 text-white px-6 py-3">
        <div className="flex justify-between items-center">
          <div className="text-sm">
            Copyright © 2013-2025 Zeigets. All rights reserved. v2.170322
          </div>
          <div className="text-sm">
            Version 2.2
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SupplierCustomerCreate; 