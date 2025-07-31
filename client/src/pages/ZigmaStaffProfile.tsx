import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Users, 
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
  ChevronRight,
  FileText
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ZigmaStaffProfile = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [createProfileOpen, setCreateProfileOpen] = useState(true);
  
  const [formData, setFormData] = useState({
    username: "",
    name: "",
    email: "",
    address: "",
    password: "",
    phone: "+971 50 123 4567",
    role: "",
    status: "",
  });

  const [errors, setErrors] = useState<{[key: string]: string}>({});

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
        { label: "Zigma Staff", path: "/zigma-staff-profile", active: true },
        { label: "View Users", path: "/view-users" },
      ]
    },
    { icon: UserCheck, label: "Client Details", path: "/client-details" },
    { icon: Users, label: "Client Staff", path: "/client-staff" },
    { icon: Receipt, label: "Supplier Customer", path: "/supplier-customer" },
    { icon: FileText, label: "Invoice", path: "/invoice" },
    { icon: CheckSquare, label: "Check Invoice", path: "/check-invoice" },
    { icon: Calendar, label: "Vat Return Date", path: "/vat-return-date" },
    { icon: BarChart3, label: "Vat Return", path: "/vat-return" },
    { icon: Calendar, label: "Vat Return This Month", path: "/vat-return-month" },
    { icon: FileText, label: "Vat Return This Month All", path: "/vat-return-month-all" },
    { icon: Settings, label: "Designation", path: "/designation" },
    { icon: BarChart3, label: "Reports", path: "/reports" },
    { icon: Activity, label: "Staff Activity", path: "/staff-activity" },
  ];

  const handleInputChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors: {[key: string]: string} = {};
    if (!formData.username.trim()) {
      newErrors.username = "Username cannot be blank.";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email cannot be blank.";
    }
    if (!formData.password.trim()) {
      newErrors.password = "Password cannot be blank.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    toast({
      title: "Staff Profile Created",
      description: "Staff profile has been created successfully!",
    });
    
    // Reset form
    setFormData({
      username: "",
      name: "",
      email: "",
      address: "",
      password: "",
      phone: "+971 50 123 4567",
      role: "",
      status: "",
    });
  };

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
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
              <Users className="h-4 w-4" />
            </div>
            <span>admin</span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-white/20"
          >
            <Settings className="h-4 w-4" />
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
                        setCreateProfileOpen(!createProfileOpen);
                      } else {
                        navigate(item.path);
                      }
                    }}
                    className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors text-gray-300 hover:bg-white/5 hover:text-white"
                  >
                    <item.icon className="h-4 w-4" />
                    <span className="text-sm flex-1">{item.label}</span>
                    {item.hasDropdown && (
                      <ChevronRight className={`h-4 w-4 transition-transform ${createProfileOpen ? 'rotate-90' : ''}`} />
                    )}
                  </button>
                  
                  {item.hasDropdown && item.subItems && createProfileOpen && (
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
              <span>Staff Profile</span>
            </div>
          </div>

          <Card>
            <CardHeader className="bg-gray-50 border-b">
              <CardTitle className="flex items-center space-x-2">
                <FileText className="h-5 w-5" />
                <span>Staff Profile</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Row 1 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="username" className="text-gray-700 font-medium">
                      Username
                    </Label>
                    <Input
                      id="username"
                      value={formData.username}
                      onChange={(e) => handleInputChange("username", e.target.value)}
                      className={errors.username ? 'border-red-500' : ''}
                    />
                    {errors.username && (
                      <p className="text-red-500 text-sm mt-1">{errors.username}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="name" className="text-gray-700 font-medium">
                      Name
                    </Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                    />
                  </div>
                </div>

                {/* Row 2 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="email" className="text-gray-700 font-medium">
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      className={errors.email ? 'border-red-500' : ''}
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="address" className="text-gray-700 font-medium">
                      Address
                    </Label>
                    <Textarea
                      id="address"
                      value={formData.address}
                      onChange={(e) => handleInputChange("address", e.target.value)}
                      rows={3}
                    />
                  </div>
                </div>

                {/* Row 3 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="password" className="text-gray-700 font-medium">
                      Password
                    </Label>
                    <Input
                      id="password"
                      type="password"
                      value={formData.password}
                      onChange={(e) => handleInputChange("password", e.target.value)}
                      className={errors.password ? 'border-red-500' : ''}
                    />
                    {errors.password && (
                      <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="phone" className="text-gray-700 font-medium">
                      phone 🇦🇪
                    </Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                    />
                  </div>
                </div>

                {/* Row 4 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="role" className="text-gray-700 font-medium">
                      Role
                    </Label>
                    <Select value={formData.role} onValueChange={(value) => handleInputChange("role", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="--Select One--" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="admin">Admin</SelectItem>
                        <SelectItem value="staff">Staff</SelectItem>
                        <SelectItem value="manager">Manager</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="status" className="text-gray-700 font-medium">
                      Status
                    </Label>
                    <Select value={formData.status} onValueChange={(value) => handleInputChange("status", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="--Select One--" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="flex justify-start">
                  <Button 
                    type="submit" 
                    className="bg-success hover:bg-success/90 text-white px-8"
                  >
                    Create
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Footer */}
          <div className="mt-8 text-center text-sm text-gray-500">
            Copyright © 2013-2025 Zeigets. All rights reserved. v2.170322
            <span className="float-right">Version 2.2</span>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ZigmaStaffProfile;