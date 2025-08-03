import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
  Eye,
  Trash2,
  Plus
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const StaffSalary = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [createProfileOpen, setCreateProfileOpen] = useState(false);
  const [clientDetailsOpen, setClientDetailsOpen] = useState(false);
  const [clientStaffOpen, setClientStaffOpen] = useState(false);
  const [supplierCustomerOpen, setSupplierCustomerOpen] = useState(false);
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
      subItems: [
        { label: "Staff Details", path: "/staff-details" },
        { label: "Staff Salary", path: "/staff-salary", active: true },
        { label: "Staff Document", path: "/staff-document" },
      ]
    },
    { icon: Receipt, label: "Supplier Customer", path: "/supplier-customer" },
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

  const salaryData = [
    { 
      id: 1, 
      clientName: "Zeigets", 
      staffName: "nephy k", 
      amount: 5000.00, 
      type: "salary", 
      date: "2023-12-12"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-dashboard-header text-white px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-white hover:bg-white/20"
          >
            <Menu className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-semibold">AdminPanel</h1>
        </div>
        <div className="flex items-center space-x-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center space-x-2 text-white hover:bg-white/20">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <Users className="h-4 w-4" />
                </div>
                <span>admin</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem>
                <Key className="mr-2 h-4 w-4" />
                <span>Change Password</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Logout</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
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
                        } else if (item.label === "Invoice") {
                          setInvoiceOpen(!invoiceOpen);
                        }
                      } else {
                        navigate(item.path);
                      }
                    }}
                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                      item.active 
                        ? 'bg-white/10 text-white' 
                        : 'text-gray-300 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <item.icon className="h-4 w-4" />
                    <span className="text-sm flex-1">{item.label}</span>
                    {item.hasDropdown && (
                      <ChevronRight className={`h-4 w-4 transition-transform ${
                        (item.label === "Create Profile" && createProfileOpen) || 
                        (item.label === "Client Details" && clientDetailsOpen) ||
                        (item.label === "Client Staff" && clientStaffOpen) ||
                        (item.label === "Invoice" && invoiceOpen)
                          ? 'rotate-90' : ''
                      }`} />
                    )}
                  </button>
                  
                  {item.hasDropdown && item.subItems && (
                    (item.label === "Create Profile" && createProfileOpen) || 
                    (item.label === "Client Details" && clientDetailsOpen) ||
                    (item.label === "Client Staff" && clientStaffOpen) ||
                    (item.label === "Invoice" && invoiceOpen)
                  ) && (
                    <div className="ml-6 mt-1 space-y-1">
                      {item.subItems.map((subItem, subIndex) => (
                        <button
                          key={subIndex}
                          onClick={() => navigate(subItem.path)}
                          className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                            subItem.active 
                              ? 'bg-white/10 text-white' 
                              : 'text-gray-300 hover:bg-white/5 hover:text-white'
                          }`}
                        >
                          <FileText className="h-4 w-4" />
                          <span className="text-sm">{subItem.label}</span>
                        </button>
                      ))}
                    </div>
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
              <span>Home</span>
              <ChevronRight className="h-4 w-4" />
              <span>Client Staff</span>
              <ChevronRight className="h-4 w-4" />
              <span>Staff Salary</span>
            </div>
          </div>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-2">
                  <Edit className="h-5 w-5 text-blue-600" />
                  <h2 className="text-xl font-semibold text-gray-800">Client Staff</h2>
                </div>
                <Button className="bg-green-600 hover:bg-green-700 text-white">
                  <Plus className="h-4 w-4 mr-2" />
                  Create salary
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Client</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Client" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="zeigets">Zeigets</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Staff Name</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Client" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="nephy-k">nephy k</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="salary">Salary</SelectItem>
                      <SelectItem value="bonus">Bonus</SelectItem>
                      <SelectItem value="allowance">Allowance</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex space-x-4 mb-6">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  Search
                </Button>
                <Button variant="outline">
                  Reset
                </Button>
              </div>

              <div className="mb-4">
                <p className="text-sm text-gray-600">Showing 1-1 of 1 item.</p>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>#</TableHead>
                    <TableHead>Client Name</TableHead>
                    <TableHead>Staff Name</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {salaryData.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>{item.id}</TableCell>
                      <TableCell>{item.clientName}</TableCell>
                      <TableCell>{item.staffName}</TableCell>
                      <TableCell>{item.amount.toFixed(2)}</TableCell>
                      <TableCell>{item.type}</TableCell>
                      <TableCell>{item.date}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="ghost" className="text-blue-600 hover:text-blue-700">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="ghost" className="text-blue-600 hover:text-blue-700">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="ghost" className="text-red-600 hover:text-red-700">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Footer */}
          <div className="mt-8 text-center text-sm text-gray-500">
            Copyright © 2013-2025 <span className="text-blue-600">Zeigets.</span> All rights reserved. v2.170322
            <span className="float-right">Version 2.2</span>
          </div>
        </main>
      </div>
    </div>
  );
};

export default StaffSalary; 