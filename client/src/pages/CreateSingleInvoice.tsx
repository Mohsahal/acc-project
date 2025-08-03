import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
  Upload,
  X,
  CalendarIcon,
  Plus
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const CreateSingleInvoice = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [createProfileOpen, setCreateProfileOpen] = useState(false);
  const [clientDetailsOpen, setClientDetailsOpen] = useState(false);
  const [clientStaffOpen, setClientStaffOpen] = useState(false);
  const [supplierCustomerOpen, setSupplierCustomerOpen] = useState(false);
  const [invoiceOpen, setInvoiceOpen] = useState(false);

  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const [formData, setFormData] = useState({
    customer: "CLICK COMPUTERS",
    invoiceDate: "2019-12-09",
    invoiceNumber: "",
    amount: "",
    vat: "",
    totalAmount: "",
    purchase: ""
  });

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("username");
    navigate("/");
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = Array.from(e.dataTransfer.files);
    setSelectedFiles(prev => [...prev, ...files]);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setSelectedFiles(prev => [...prev, ...files]);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    // Handle save logic
    console.log("Saving invoice...", formData);
  };

  const handleCreate = () => {
    // Handle create logic
    console.log("Creating invoice...", formData);
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

  return (
    <div className="min-h-screen bg-gray-50">
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
            <FileText className="h-5 w-5" />
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
                    className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors text-gray-300 hover:bg-white/5 hover:text-white"
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
                            className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors text-gray-300 hover:bg-white/5 hover:text-white"
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
        <main className="flex-1 p-6">
          <div className="mb-6">
            <div className="flex items-center space-x-2 text-sm text-gray-600 mb-2">
              <Home className="h-4 w-4" />
              <span>Dashboard</span>
              <ChevronRight className="h-4 w-4" />
              <span>Invoice</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* File Upload Section */}
            <div className="lg:col-span-2">
              <Card>
                <CardContent className="p-6">
                  <div
                    className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                      isDragOver 
                        ? 'border-blue-500 bg-blue-50' 
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                  >
                    <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-lg font-medium text-gray-700 mb-2">
                      Drag & drop files here...
                    </p>
                    <p className="text-sm text-gray-500 mb-4">
                      or click to browse files
                    </p>
                    <input
                      type="file"
                      multiple
                      onChange={handleFileSelect}
                      className="hidden"
                      id="file-upload"
                    />
                    <label htmlFor="file-upload">
                      <Button variant="outline" className="cursor-pointer">
                        Browse Files
                      </Button>
                    </label>
                  </div>

                  {selectedFiles.length > 0 && (
                    <div className="mt-4">
                      <Label className="text-sm font-medium text-gray-700">
                        Selections... ({selectedFiles.length} files)
                      </Label>
                      <div className="mt-2 space-y-2">
                        {selectedFiles.map((file, index) => (
                          <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                            <span className="text-sm text-gray-600">{file.name}</span>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setSelectedFiles(prev => prev.filter((_, i) => i !== index))}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex justify-end space-x-3 mt-6">
                    <Button variant="outline">Cancel</Button>
                    <Button className="bg-blue-600 hover:bg-blue-700">
                      <Upload className="h-4 w-4 mr-2" />
                      Upload Image
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Invoice Details Form */}
            <div className="lg:col-span-1">
              <Card>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {/* Customer Selection */}
                    <div>
                      <Label className="text-sm font-medium text-gray-700">Customer</Label>
                      <Select value={formData.customer} onValueChange={(value) => handleInputChange("customer", value)}>
                        <SelectTrigger className="mt-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="CLICK COMPUTERS">CLICK COMPUTERS</SelectItem>
                          <SelectItem value="TECH SOLUTIONS">TECH SOLUTIONS</SelectItem>
                          <SelectItem value="DIGITAL SYSTEMS">DIGITAL SYSTEMS</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button variant="outline" size="sm" className="mt-2 w-full bg-blue-50 text-blue-600 hover:bg-blue-100">
                        <Plus className="h-4 w-4 mr-2" />
                        Add New Customer
                      </Button>
                    </div>

                    {/* Additional Dropdowns */}
                    <div>
                      <Label className="text-sm font-medium text-gray-700">Category</Label>
                      <Select>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Loading..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="electronics">Electronics</SelectItem>
                          <SelectItem value="software">Software</SelectItem>
                          <SelectItem value="services">Services</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label className="text-sm font-medium text-gray-700">Payment Terms</Label>
                      <Select>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Loading..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="net30">Net 30</SelectItem>
                          <SelectItem value="net60">Net 60</SelectItem>
                          <SelectItem value="due_on_receipt">Due on Receipt</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Date Input */}
                    <div>
                      <Label className="text-sm font-medium text-gray-700">Invoice Date</Label>
                      <div className="relative mt-1">
                        <Input
                          type="date"
                          value={formData.invoiceDate}
                          onChange={(e) => handleInputChange("invoiceDate", e.target.value)}
                          className="pl-10"
                        />
                        <CalendarIcon className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      </div>
                    </div>

                    {/* Invoice Number */}
                    <div>
                      <Label className="text-sm font-medium text-gray-700">Invoice Number</Label>
                      <Input
                        value={formData.invoiceNumber}
                        onChange={(e) => handleInputChange("invoiceNumber", e.target.value)}
                        placeholder="Enter invoice number"
                        className="mt-1"
                      />
                    </div>

                    {/* Amount Details */}
                    <div>
                      <Label className="text-sm font-medium text-gray-700">Amount</Label>
                      <div className="relative mt-1">
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">₹</span>
                        <Input
                          value={formData.amount}
                          onChange={(e) => handleInputChange("amount", e.target.value)}
                          placeholder="0.00"
                          className="pl-8"
                        />
                      </div>
                    </div>

                    <div>
                      <Label className="text-sm font-medium text-gray-700">VAT</Label>
                      <div className="relative mt-1">
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">₹</span>
                        <Input
                          value={formData.vat}
                          onChange={(e) => handleInputChange("vat", e.target.value)}
                          placeholder="0.00"
                          className="pl-8"
                        />
                      </div>
                    </div>

                    <div>
                      <Label className="text-sm font-medium text-gray-700">Total Amount</Label>
                      <div className="relative mt-1">
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">₹</span>
                        <Input
                          value={formData.totalAmount}
                          onChange={(e) => handleInputChange("totalAmount", e.target.value)}
                          placeholder="0.00"
                          className="pl-8"
                        />
                      </div>
                    </div>

                    {/* Purchase Dropdown */}
                    <div>
                      <Label className="text-sm font-medium text-gray-700">Purchase</Label>
                      <Select value={formData.purchase} onValueChange={(value) => handleInputChange("purchase", value)}>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Select purchase type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="goods">Goods</SelectItem>
                          <SelectItem value="services">Services</SelectItem>
                          <SelectItem value="both">Both</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex space-x-3 pt-4">
                      <Button variant="outline" onClick={handleSave} className="flex-1">
                        Save
                      </Button>
                      <Button onClick={handleCreate} className="flex-1 bg-green-600 hover:bg-green-700">
                        Create
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-blue-800 text-white px-6 py-3">
        <div className="flex justify-between items-center">
          <div className="text-sm">
            Copyright © 2024. All rights reserved. v.2020
          </div>
          <div className="text-sm">
            Version 1.2
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CreateSingleInvoice; 