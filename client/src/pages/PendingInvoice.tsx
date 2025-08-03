import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
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
  FileText,
  X,
  Edit3
} from "lucide-react";

const PendingInvoice = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [createProfileOpen, setCreateProfileOpen] = useState(false);
  const [clientDetailsOpen, setClientDetailsOpen] = useState(false);
  const [clientStaffOpen, setClientStaffOpen] = useState(false);
  const [supplierCustomerOpen, setSupplierCustomerOpen] = useState(false);
  const [invoiceOpen, setInvoiceOpen] = useState(true);

  const [formData, setFormData] = useState({
    client: ""
  });

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("username");
    navigate("/");
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    console.log("Submitting pending invoice request...", formData);
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
        { label: "Rent Details", path: "/client-details" },
        { label: "License Details", path: "/client-details" },
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
        { label: "Create", path: "/supplier-customer/create" },
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
        { label: "Pending Invoice", path: "/invoice/pending", active: true },
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
            <Edit3 className="h-5 w-5" />
            <h1 className="text-xl font-semibold">Invoice</h1>
          </div>
        </div>
        <div className="flex items-center space-x-4">
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
                      item.label === "Invoice" 
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
                            onClick={() => navigate(subItem.path)}
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
              <span>Pending Invoice</span>
            </div>
          </div>

          <div className="max-w-6xl mx-auto space-y-6">
            {/* Select Client Section */}
            <Card className="bg-white shadow-lg border border-gray-200">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-700 mb-2 block">Select Client</Label>
                    <Select value={formData.client} onValueChange={(value) => handleInputChange("client", value)}>
                      <SelectTrigger className="w-full h-10 border-gray-300 focus:border-blue-500 focus:ring-blue-500">
                        <SelectValue placeholder="Select Client" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="CLICK COMPUTERS">CLICK COMPUTERS</SelectItem>
                        <SelectItem value="TECH SOLUTIONS">TECH SOLUTIONS</SelectItem>
                        <SelectItem value="DIGITAL SYSTEMS">DIGITAL SYSTEMS</SelectItem>
                        <SelectItem value="SOFTWARE CORP">SOFTWARE CORP</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="flex justify-start">
                    <Button 
                      onClick={handleSubmit}
                      className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 h-10 text-sm font-medium"
                    >
                      Submit
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Pending Invoice List Section */}
            <Card className="bg-white shadow-lg border border-gray-200">
              <CardHeader className="border-b border-gray-200">
                <CardTitle className="text-lg font-semibold text-gray-800">
                  Pending Invoice List
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="font-medium text-gray-700">#</TableHead>
                      <TableHead className="font-medium text-gray-700">Client Name</TableHead>
                      <TableHead className="font-medium text-gray-700">Pending Invoice</TableHead>
                      <TableHead className="font-medium text-gray-700">Completed Invoice</TableHead>
                      <TableHead className="font-medium text-gray-700">Total Invoice</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {/* Empty table body - no pending invoices */}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
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

export default PendingInvoice; 